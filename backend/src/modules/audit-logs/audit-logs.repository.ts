import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { AuditLogs } from './audit-logs.entity';

/**
 * AuditLogs repository — generated. Extends BaseRepository<AuditLogs> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class AuditLogsRepository extends BaseRepository<AuditLogs> {
  constructor(
    @InjectRepository(AuditLogs)
    repository: Repository<AuditLogs>,
  ) {
    super(repository);
  }
}
