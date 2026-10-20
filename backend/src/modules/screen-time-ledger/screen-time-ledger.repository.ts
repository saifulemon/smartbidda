import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { ScreenTimeLedger } from './screen-time-ledger.entity';

/**
 * ScreenTimeLedger repository — generated. Extends BaseRepository<ScreenTimeLedger> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class ScreenTimeLedgerRepository extends BaseRepository<ScreenTimeLedger> {
  constructor(
    @InjectRepository(ScreenTimeLedger)
    repository: Repository<ScreenTimeLedger>,
  ) {
    super(repository);
  }
}
