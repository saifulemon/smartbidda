import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Subscriptions } from './subscriptions.entity';

/**
 * Subscriptions repository — generated. Extends BaseRepository<Subscriptions> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class SubscriptionsRepository extends BaseRepository<Subscriptions> {
  constructor(
    @InjectRepository(Subscriptions)
    repository: Repository<Subscriptions>,
  ) {
    super(repository);
  }
}
