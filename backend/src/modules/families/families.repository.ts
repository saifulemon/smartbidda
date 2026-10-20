import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Families } from './families.entity';

/**
 * Families repository — generated. Extends BaseRepository<Families> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class FamiliesRepository extends BaseRepository<Families> {
  constructor(
    @InjectRepository(Families)
    repository: Repository<Families>,
  ) {
    super(repository);
  }
}
