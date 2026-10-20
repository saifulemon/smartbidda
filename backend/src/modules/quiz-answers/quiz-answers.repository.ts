import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { QuizAnswers } from './quiz-answers.entity';

/**
 * QuizAnswers repository — generated. Extends BaseRepository<QuizAnswers> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class QuizAnswersRepository extends BaseRepository<QuizAnswers> {
  constructor(
    @InjectRepository(QuizAnswers)
    repository: Repository<QuizAnswers>,
  ) {
    super(repository);
  }
}
