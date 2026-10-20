import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Notifications } from './notifications.entity';

/**
 * Notifications repository — generated. Extends BaseRepository<Notifications> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class NotificationsRepository extends BaseRepository<Notifications> {
  constructor(
    @InjectRepository(Notifications)
    repository: Repository<Notifications>,
  ) {
    super(repository);
  }
}
