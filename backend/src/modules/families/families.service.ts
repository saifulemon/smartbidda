import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { Families } from './families.entity';
import { FamiliesRepository } from './families.repository';

/**
 * Families service — generated. Extends BaseService<Families> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Families>` directly — go through this.repository
 * (the FamiliesRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class FamiliesService extends BaseService<Families> {
  constructor(protected readonly repository: FamiliesRepository) {
    super(repository, 'Families');
  }

  /** One family per parent account; duplicates would split a subscription from its children. */
  async create(data: DeepPartial<Families>): Promise<Families> {
    if (!data.parentUserId) throw new BadRequestException('parentUserId is required');
    const existing = await this.repository.findOne({ where: { parentUserId: data.parentUserId } });
    if (existing) throw new ConflictException('This parent already has a family');
    return super.create(data);
  }
}
