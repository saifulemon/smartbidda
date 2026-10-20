import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { PointsLedger } from './points-ledger.entity';

/**
 * PointsLedger repository — generated. Extends BaseRepository<PointsLedger> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class PointsLedgerRepository extends BaseRepository<PointsLedger> {
  constructor(
    @InjectRepository(PointsLedger)
    repository: Repository<PointsLedger>,
  ) {
    super(repository);
  }
}
