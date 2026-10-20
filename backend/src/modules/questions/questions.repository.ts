import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Questions } from './questions.entity';

/**
 * Questions repository — generated. Extends BaseRepository<Questions> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class QuestionsRepository extends BaseRepository<Questions> {
  constructor(
    @InjectRepository(Questions)
    repository: Repository<Questions>,
  ) {
    super(repository);
  }
}
