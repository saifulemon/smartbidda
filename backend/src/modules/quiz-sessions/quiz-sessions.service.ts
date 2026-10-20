import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { QuizSessions } from './quiz-sessions.entity';
import { QuizSessionsRepository } from './quiz-sessions.repository';

/**
 * QuizSessions service — generated. Extends BaseService<QuizSessions> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<QuizSessions>` directly — go through this.repository
 * (the QuizSessionsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class QuizSessionsService extends BaseService<QuizSessions> {
  constructor(protected readonly repository: QuizSessionsRepository) {
    super(repository, 'QuizSessions');
  }
}
