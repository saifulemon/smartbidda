import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Families } from './families.entity';
import { FamiliesRepository } from './families.repository';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';

/**
 * Families module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Families])],
  controllers: [FamiliesController],
  providers: [FamiliesService, FamiliesRepository],
  exports: [FamiliesService, FamiliesRepository, TypeOrmModule],
})
export class FamiliesModule {}
