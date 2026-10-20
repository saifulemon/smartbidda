import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';

/**
 * Users service — generated. Extends BaseService<Users> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Users>` directly — go through this.repository
 * (the UsersRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class UsersService extends BaseService<Users> {
  constructor(protected readonly repository: UsersRepository) {
    super(repository, 'Users');
  }
}
