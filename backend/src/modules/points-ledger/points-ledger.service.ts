import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { PointsLedger } from './points-ledger.entity';
import { PointsLedgerRepository } from './points-ledger.repository';

/**
 * PointsLedger service — generated. Extends BaseService<PointsLedger> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<PointsLedger>` directly — go through this.repository
 * (the PointsLedgerRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class PointsLedgerService extends BaseService<PointsLedger> {
  constructor(protected readonly repository: PointsLedgerRepository) {
    super(repository, 'PointsLedger');
  }
}
