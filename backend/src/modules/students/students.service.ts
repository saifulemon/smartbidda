import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, DeepPartial } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseService } from '../../core/base/base.service';
import { Students } from './students.entity';
import { StudentsRepository } from './students.repository';
import { Families } from '../families/families.entity';
import { Users } from '../users/users.entity';
import { account_status } from '../../common/enums/account-status.enum';

/**
 * Students service — generated. Extends BaseService<Students> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Students>` directly — go through this.repository
 * (the StudentsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class StudentsService extends BaseService<Students> {
  constructor(
    protected readonly repository: StudentsRepository,
    private readonly ds: DataSource,
  ) {
    super(repository, 'Students');
  }

  /**
   * Create a child profile for either a parent (family derived from the session,
   * created on first child) or an admin/teacher (familyId supplied explicitly).
   * Enforces the PRD's three-children-per-family limit.
   */
  async createFor(
    user: { id: string; role?: string },
    data: DeepPartial<Students> & { kidPin?: string; familyId?: string },
  ): Promise<Students> {
    let familyId = data.familyId;
    if (!familyId) {
      if (user.role !== 'parent') {
        throw new BadRequestException('familyId is required for this role');
      }
      const families = this.ds.getRepository(Families);
      let family = await families.findOne({ where: { parentUserId: user.id } });
      if (!family) {
        family = await families.save(families.create({ parentUserId: user.id }));
        const code = `SB-FAM-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(
          (await families.count()) + 1,
        ).padStart(4, '0')}`;
        await this.ds.getRepository(Users).update({ id: user.id }, { familyCode: code });
      }
      familyId = family.id;
    }
    const families = this.ds.getRepository(Families);
    const family = await families.findOne({ where: { id: familyId } });
    if (!family) throw new NotFoundException('Family not found');
    if (user.role === 'parent') {
      const own = await families.findOne({ where: { parentUserId: user.id } });
      if (!own || own.id !== family.id) throw new ForbiddenException('Family is not yours');
    }
    const count = await this.repository.count({ where: { familyId: family.id } });
    if (count >= 3) throw new BadRequestException('A family can have at most 3 children');

    const { kidPin, ...rest } = data;
    const pinHash = await bcrypt.hash(String(kidPin ?? '0000'), 10);
    return this.repository.create({
      ...rest,
      familyId: family.id,
      pinHash,
      status: (rest.status as account_status) || account_status.ACTIVE,
    } as DeepPartial<Students>);
  }

  /**
   * `pin_hash` is NOT NULL but is never sent by the client; the parent sends the plaintext
   * `kidPin` (4 digits, PRD /onboarding step 6). Hash here so the column is satisfied and the
   * plaintext never reaches the repository.
   */
  async create(data: DeepPartial<Students> & { kidPin?: string }): Promise<Students> {
    const { kidPin, ...rest } = data as DeepPartial<Students> & { kidPin?: string };
    const pinHash = await bcrypt.hash(String(kidPin ?? '0000'), 10);
    return super.create({ ...rest, pinHash });
  }
}
