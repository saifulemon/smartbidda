import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { NotificationTemplates } from './notification-templates.entity';
import { NotificationTemplatesRepository } from './notification-templates.repository';

/**
 * NotificationTemplates service — generated. Extends BaseService<NotificationTemplates> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<NotificationTemplates>` directly — go through this.repository
 * (the NotificationTemplatesRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class NotificationTemplatesService extends BaseService<NotificationTemplates> {
  constructor(protected readonly repository: NotificationTemplatesRepository) {
    super(repository, 'NotificationTemplates');
  }
}
