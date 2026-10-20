import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { VoAssets } from './vo-assets.entity';

/**
 * VoAssets repository — generated. Extends BaseRepository<VoAssets> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class VoAssetsRepository extends BaseRepository<VoAssets> {
  constructor(
    @InjectRepository(VoAssets)
    repository: Repository<VoAssets>,
  ) {
    super(repository);
  }
}
