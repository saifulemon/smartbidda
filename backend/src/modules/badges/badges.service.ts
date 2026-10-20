import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { Badges } from './badges.entity';
import { BadgesRepository } from './badges.repository';

/**
 * Badges service — generated. Extends BaseService<Badges> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Badges>` directly — go through this.repository
 * (the BadgesRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class BadgesService extends BaseService<Badges> {
  constructor(protected readonly repository: BadgesRepository) {
    super(repository, 'Badges');
  }
}
