import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { UsageHeartbeat } from './usage-heartbeat.entity';

/**
 * UsageHeartbeat repository — generated. Extends BaseRepository<UsageHeartbeat> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class UsageHeartbeatRepository extends BaseRepository<UsageHeartbeat> {
  constructor(
    @InjectRepository(UsageHeartbeat)
    repository: Repository<UsageHeartbeat>,
  ) {
    super(repository);
  }
}
