import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { NotificationTemplates } from './notification-templates.entity';

/**
 * NotificationTemplates repository — generated. Extends BaseRepository<NotificationTemplates> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class NotificationTemplatesRepository extends BaseRepository<NotificationTemplates> {
  constructor(
    @InjectRepository(NotificationTemplates)
    repository: Repository<NotificationTemplates>,
  ) {
    super(repository);
  }
}
