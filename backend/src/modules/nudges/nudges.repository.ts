import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Nudges } from './nudges.entity';

/**
 * Nudges repository — generated. Extends BaseRepository<Nudges> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class NudgesRepository extends BaseRepository<Nudges> {
  constructor(
    @InjectRepository(Nudges)
    repository: Repository<Nudges>,
  ) {
    super(repository);
  }
}
