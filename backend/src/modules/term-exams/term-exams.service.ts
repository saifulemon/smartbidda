import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { TermExams } from './term-exams.entity';
import { TermExamsRepository } from './term-exams.repository';

/**
 * TermExams service — generated. Extends BaseService<TermExams> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<TermExams>` directly — go through this.repository
 * (the TermExamsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class TermExamsService extends BaseService<TermExams> {
  constructor(protected readonly repository: TermExamsRepository) {
    super(repository, 'TermExams');
  }
}
