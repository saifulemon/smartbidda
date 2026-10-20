import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { UsageHeartbeat } from './usage-heartbeat.entity';
import { UsageHeartbeatRepository } from './usage-heartbeat.repository';

/**
 * UsageHeartbeat service — generated. Extends BaseService<UsageHeartbeat> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<UsageHeartbeat>` directly — go through this.repository
 * (the UsageHeartbeatRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class UsageHeartbeatService extends BaseService<UsageHeartbeat> {
  constructor(protected readonly repository: UsageHeartbeatRepository) {
    super(repository, 'UsageHeartbeat');
  }
}
