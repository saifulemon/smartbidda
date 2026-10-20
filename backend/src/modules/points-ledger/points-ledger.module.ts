import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsLedger } from './points-ledger.entity';
import { PointsLedgerRepository } from './points-ledger.repository';
import { PointsLedgerService } from './points-ledger.service';
import { PointsLedgerController } from './points-ledger.controller';

/**
 * PointsLedger module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([PointsLedger])],
  controllers: [PointsLedgerController],
  providers: [PointsLedgerService, PointsLedgerRepository],
  exports: [PointsLedgerService, PointsLedgerRepository, TypeOrmModule],
})
export class PointsLedgerModule {}
