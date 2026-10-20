import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { QuizSessions } from './quiz-sessions.entity';

/**
 * QuizSessions repository — generated. Extends BaseRepository<QuizSessions> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class QuizSessionsRepository extends BaseRepository<QuizSessions> {
  constructor(
    @InjectRepository(QuizSessions)
    repository: Repository<QuizSessions>,
  ) {
    super(repository);
  }
}
