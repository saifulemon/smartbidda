import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { LearningContent } from './learning-content.entity';

/**
 * LearningContent repository — generated. Extends BaseRepository<LearningContent> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class LearningContentRepository extends BaseRepository<LearningContent> {
  constructor(
    @InjectRepository(LearningContent)
    repository: Repository<LearningContent>,
  ) {
    super(repository);
  }
}
