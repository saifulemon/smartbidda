import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nudges } from './nudges.entity';
import { NudgesRepository } from './nudges.repository';
import { NudgesService } from './nudges.service';
import { NudgesController } from './nudges.controller';

/**
 * Nudges module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Nudges])],
  controllers: [NudgesController],
  providers: [NudgesService, NudgesRepository],
  exports: [NudgesService, NudgesRepository, TypeOrmModule],
})
export class NudgesModule {}
