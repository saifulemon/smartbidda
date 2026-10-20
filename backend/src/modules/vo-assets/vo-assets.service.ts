import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { VoAssets } from './vo-assets.entity';
import { VoAssetsRepository } from './vo-assets.repository';

/**
 * VoAssets service — generated. Extends BaseService<VoAssets> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<VoAssets>` directly — go through this.repository
 * (the VoAssetsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class VoAssetsService extends BaseService<VoAssets> {
  constructor(protected readonly repository: VoAssetsRepository) {
    super(repository, 'VoAssets');
  }
}
