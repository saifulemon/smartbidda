import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { ExamAttempts } from './exam-attempts.entity';

/**
 * ExamAttempts repository — generated. Extends BaseRepository<ExamAttempts> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class ExamAttemptsRepository extends BaseRepository<ExamAttempts> {
  constructor(
    @InjectRepository(ExamAttempts)
    repository: Repository<ExamAttempts>,
  ) {
    super(repository);
  }
}
