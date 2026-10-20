import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { StudentBadges } from './student-badges.entity';

/**
 * StudentBadges repository — generated. Extends BaseRepository<StudentBadges> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class StudentBadgesRepository extends BaseRepository<StudentBadges> {
  constructor(
    @InjectRepository(StudentBadges)
    repository: Repository<StudentBadges>,
  ) {
    super(repository);
  }
}
