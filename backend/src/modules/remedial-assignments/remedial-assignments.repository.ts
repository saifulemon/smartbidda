import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { RemedialAssignments } from './remedial-assignments.entity';

/**
 * RemedialAssignments repository — generated. Extends BaseRepository<RemedialAssignments> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class RemedialAssignmentsRepository extends BaseRepository<RemedialAssignments> {
  constructor(
    @InjectRepository(RemedialAssignments)
    repository: Repository<RemedialAssignments>,
  ) {
    super(repository);
  }
}
