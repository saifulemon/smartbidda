import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { Chapters } from './chapters.entity';
import { ChaptersRepository } from './chapters.repository';

/**
 * Chapters service — generated. Extends BaseService<Chapters> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Chapters>` directly — go through this.repository
 * (the ChaptersRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class ChaptersService extends BaseService<Chapters> {
  constructor(protected readonly repository: ChaptersRepository) {
    super(repository, 'Chapters');
  }
}
