import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { StudentBadges } from './student-badges.entity';
import { StudentBadgesRepository } from './student-badges.repository';

/**
 * StudentBadges service — generated. Extends BaseService<StudentBadges> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<StudentBadges>` directly — go through this.repository
 * (the StudentBadgesRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class StudentBadgesService extends BaseService<StudentBadges> {
  constructor(protected readonly repository: StudentBadgesRepository) {
    super(repository, 'StudentBadges');
  }
}
