import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { QuizAnswers } from './quiz-answers.entity';
import { QuizAnswersRepository } from './quiz-answers.repository';

/**
 * QuizAnswers service — generated. Extends BaseService<QuizAnswers> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<QuizAnswers>` directly — go through this.repository
 * (the QuizAnswersRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class QuizAnswersService extends BaseService<QuizAnswers> {
  constructor(protected readonly repository: QuizAnswersRepository) {
    super(repository, 'QuizAnswers');
  }
}
