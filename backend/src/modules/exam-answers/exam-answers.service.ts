import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { ExamAnswers } from './exam-answers.entity';
import { ExamAnswersRepository } from './exam-answers.repository';

/**
 * ExamAnswers service — generated. Extends BaseService<ExamAnswers> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<ExamAnswers>` directly — go through this.repository
 * (the ExamAnswersRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class ExamAnswersService extends BaseService<ExamAnswers> {
  constructor(protected readonly repository: ExamAnswersRepository) {
    super(repository, 'ExamAnswers');
  }
}
