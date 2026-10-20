import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Students } from './students.entity';

/**
 * Students repository — generated. Extends BaseRepository<Students> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class StudentsRepository extends BaseRepository<Students> {
  constructor(
    @InjectRepository(Students)
    repository: Repository<Students>,
  ) {
    super(repository);
  }
}
