import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { TopicTags } from './topic-tags.entity';

/**
 * TopicTags repository — generated. Extends BaseRepository<TopicTags> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class TopicTagsRepository extends BaseRepository<TopicTags> {
  constructor(
    @InjectRepository(TopicTags)
    repository: Repository<TopicTags>,
  ) {
    super(repository);
  }
}
