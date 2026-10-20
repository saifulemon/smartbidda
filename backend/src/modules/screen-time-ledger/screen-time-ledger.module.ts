import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenTimeLedger } from './screen-time-ledger.entity';
import { ScreenTimeLedgerRepository } from './screen-time-ledger.repository';
import { ScreenTimeLedgerService } from './screen-time-ledger.service';
import { ScreenTimeLedgerController } from './screen-time-ledger.controller';

/**
 * ScreenTimeLedger module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ScreenTimeLedger])],
  controllers: [ScreenTimeLedgerController],
  providers: [ScreenTimeLedgerService, ScreenTimeLedgerRepository],
  exports: [ScreenTimeLedgerService, ScreenTimeLedgerRepository, TypeOrmModule],
})
export class ScreenTimeLedgerModule {}
