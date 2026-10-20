import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { ExamAttempts } from './exam-attempts.entity';
import { ExamAttemptsRepository } from './exam-attempts.repository';

/**
 * ExamAttempts service — generated. Extends BaseService<ExamAttempts> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<ExamAttempts>` directly — go through this.repository
 * (the ExamAttemptsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class ExamAttemptsService extends BaseService<ExamAttempts> {
  constructor(protected readonly repository: ExamAttemptsRepository) {
    super(repository, 'ExamAttempts');
  }
}
