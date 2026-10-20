import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { Questions } from './questions.entity';
import { QuestionsRepository } from './questions.repository';

/**
 * Questions service — generated. Extends BaseService<Questions> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Questions>` directly — go through this.repository
 * (the QuestionsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class QuestionsService extends BaseService<Questions> {
  constructor(protected readonly repository: QuestionsRepository) {
    super(repository, 'Questions');
  }

  /**
   * Duplicate a question for the authoring flow (`POST /api/admin/questions/:id/duplicate`).
   * The copy is a draft-like clone: same options/difficulty, text suffixed so it is
   * distinguishable in the bank; the original is untouched.
   */
  async duplicate(id: string): Promise<Questions> {
    const original = await this.repository.findById(id);
    if (!original) throw new NotFoundException('Question not found');
    return this.repository.create({
      chapterId: original.chapterId,
      topicTagId: original.topicTagId,
      text: `${original.text} (copy)`,
      textBn: `${original.textBn} (কপি)`,
      options: original.options,
      correctOption: original.correctOption,
      difficulty: original.difficulty,
    });
  }
}
