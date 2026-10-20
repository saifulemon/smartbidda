import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { Notifications } from './notifications.entity';
import { NotificationsRepository } from './notifications.repository';

/**
 * Notifications service — generated. Extends BaseService<Notifications> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Notifications>` directly — go through this.repository
 * (the NotificationsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class NotificationsService extends BaseService<Notifications> {
  constructor(protected readonly repository: NotificationsRepository) {
    super(repository, 'Notifications');
  }
}
