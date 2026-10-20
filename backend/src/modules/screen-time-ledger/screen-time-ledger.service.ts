import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { ScreenTimeLedger } from './screen-time-ledger.entity';
import { ScreenTimeLedgerRepository } from './screen-time-ledger.repository';

/**
 * ScreenTimeLedger service — generated. Extends BaseService<ScreenTimeLedger> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<ScreenTimeLedger>` directly — go through this.repository
 * (the ScreenTimeLedgerRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class ScreenTimeLedgerService extends BaseService<ScreenTimeLedger> {
  constructor(protected readonly repository: ScreenTimeLedgerRepository) {
    super(repository, 'ScreenTimeLedger');
  }

  /** A negative budget or usage count is meaningless and breaks the remaining-time UI. */
  async create(data: DeepPartial<ScreenTimeLedger>): Promise<ScreenTimeLedger> {
    if (Number(data.minutes ?? 0) < 0) throw new BadRequestException('minutes cannot be negative');
    if (Number(data.limitMinutes ?? 0) < 0) throw new BadRequestException('limitMinutes cannot be negative');
    return super.create(data);
  }
}
