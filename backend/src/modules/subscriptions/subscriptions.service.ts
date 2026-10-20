import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { Subscriptions } from './subscriptions.entity';
import { SubscriptionsRepository } from './subscriptions.repository';
import { subscription_status } from '../../common/enums/subscription-status.enum';

/**
 * Subscriptions service — generated. Extends BaseService<Subscriptions> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Subscriptions>` directly — go through this.repository
 * (the SubscriptionsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class SubscriptionsService extends BaseService<Subscriptions> {
  constructor(protected readonly repository: SubscriptionsRepository) {
    super(repository, 'Subscriptions');
  }

  /**
   * Revoke entitlement immediately. Used by the admin refund flow as the
   * compensating action that must accompany the money movement — cancelling
   * only the gateway side leaves the family with access after a refund.
   */
  async cancelNow(id: string): Promise<Subscriptions> {
    const subscription = await this.repository.findById(id);
    if (!subscription) throw new NotFoundException('Subscription not found');
    if (subscription.status === subscription_status.CANCELLED) {
      return subscription;
    }
    subscription.status = subscription_status.CANCELLED;
    subscription.entitlementUntil = new Date();
    const updated = await this.repository.update(id, {
      status: subscription_status.CANCELLED,
      entitlementUntil: subscription.entitlementUntil,
    });
    return updated ?? subscription;
  }
}
