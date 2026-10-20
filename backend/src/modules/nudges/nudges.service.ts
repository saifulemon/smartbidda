import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { Nudges } from './nudges.entity';
import { NudgesRepository } from './nudges.repository';

/**
 * Nudges service — generated. Extends BaseService<Nudges> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Nudges>` directly — go through this.repository
 * (the NudgesRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class NudgesService extends BaseService<Nudges> {
  constructor(protected readonly repository: NudgesRepository) {
    super(repository, 'Nudges');
  }
}
