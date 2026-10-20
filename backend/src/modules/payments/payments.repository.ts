import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Payments } from './payments.entity';

/**
 * Payments repository — generated. Extends BaseRepository<Payments> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class PaymentsRepository extends BaseRepository<Payments> {
  constructor(
    @InjectRepository(Payments)
    repository: Repository<Payments>,
  ) {
    super(repository);
  }
}
