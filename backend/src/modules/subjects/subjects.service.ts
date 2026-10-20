import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { Subjects } from './subjects.entity';
import { SubjectsRepository } from './subjects.repository';

/**
 * Subjects service — generated. Extends BaseService<Subjects> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Subjects>` directly — go through this.repository
 * (the SubjectsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class SubjectsService extends BaseService<Subjects> {
  constructor(protected readonly repository: SubjectsRepository) {
    super(repository, 'Subjects');
  }
}
