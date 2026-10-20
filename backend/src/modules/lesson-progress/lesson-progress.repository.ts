import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { LessonProgress } from './lesson-progress.entity';

/**
 * LessonProgress repository — generated. Extends BaseRepository<LessonProgress> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class LessonProgressRepository extends BaseRepository<LessonProgress> {
  constructor(
    @InjectRepository(LessonProgress)
    repository: Repository<LessonProgress>,
  ) {
    super(repository);
  }
}
