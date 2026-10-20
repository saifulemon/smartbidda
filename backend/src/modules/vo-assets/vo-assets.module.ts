import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoAssets } from './vo-assets.entity';
import { VoAssetsRepository } from './vo-assets.repository';
import { VoAssetsService } from './vo-assets.service';
import { VoAssetsController } from './vo-assets.controller';

/**
 * VoAssets module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([VoAssets])],
  controllers: [VoAssetsController],
  providers: [VoAssetsService, VoAssetsRepository],
  exports: [VoAssetsService, VoAssetsRepository, TypeOrmModule],
})
export class VoAssetsModule {}
