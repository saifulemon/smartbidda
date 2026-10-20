import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { TopicTags } from './topic-tags.entity';
import { TopicTagsRepository } from './topic-tags.repository';

/**
 * TopicTags service — generated. Extends BaseService<TopicTags> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<TopicTags>` directly — go through this.repository
 * (the TopicTagsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class TopicTagsService extends BaseService<TopicTags> {
  constructor(protected readonly repository: TopicTagsRepository) {
    super(repository, 'TopicTags');
  }
}
