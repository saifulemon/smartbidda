import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { AuditLogs } from './audit-logs.entity';
import { AuditLogsRepository } from './audit-logs.repository';

/**
 * AuditLogs service — generated. Extends BaseService<AuditLogs> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<AuditLogs>` directly — go through this.repository
 * (the AuditLogsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class AuditLogsService extends BaseService<AuditLogs> {
  constructor(protected readonly repository: AuditLogsRepository) {
    super(repository, 'AuditLogs');
  }
}
