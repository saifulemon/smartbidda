import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { ExamAnswers } from './exam-answers.entity';

/**
 * ExamAnswers repository — generated. Extends BaseRepository<ExamAnswers> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class ExamAnswersRepository extends BaseRepository<ExamAnswers> {
  constructor(
    @InjectRepository(ExamAnswers)
    repository: Repository<ExamAnswers>,
  ) {
    super(repository);
  }
}
