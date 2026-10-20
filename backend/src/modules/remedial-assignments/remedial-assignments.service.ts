import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { RemedialAssignments } from './remedial-assignments.entity';
import { RemedialAssignmentsRepository } from './remedial-assignments.repository';

/**
 * RemedialAssignments service — generated. Extends BaseService<RemedialAssignments> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<RemedialAssignments>` directly — go through this.repository
 * (the RemedialAssignmentsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class RemedialAssignmentsService extends BaseService<RemedialAssignments> {
  constructor(protected readonly repository: RemedialAssignmentsRepository) {
    super(repository, 'RemedialAssignments');
  }
}
