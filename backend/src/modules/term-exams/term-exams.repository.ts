import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { TermExams } from './term-exams.entity';

/**
 * TermExams repository — generated. Extends BaseRepository<TermExams> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class TermExamsRepository extends BaseRepository<TermExams> {
  constructor(
    @InjectRepository(TermExams)
    repository: Repository<TermExams>,
  ) {
    super(repository);
  }
}
