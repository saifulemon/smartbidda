import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { LearningContent } from './learning-content.entity';
import { LearningContentRepository } from './learning-content.repository';

/**
 * LearningContent service — generated. Extends BaseService<LearningContent> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<LearningContent>` directly — go through this.repository
 * (the LearningContentRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class LearningContentService extends BaseService<LearningContent> {
  constructor(protected readonly repository: LearningContentRepository) {
    super(repository, 'LearningContent');
  }
}
