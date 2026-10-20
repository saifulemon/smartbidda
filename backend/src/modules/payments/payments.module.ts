import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from './payments.entity';
import { PaymentsRepository } from './payments.repository';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { AdminPaymentsController } from './admin-payments.controller';

/**
 * Payments module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Payments])],
  controllers: [PaymentsController, AdminPaymentsController],
  providers: [PaymentsService, PaymentsRepository],
  exports: [PaymentsService, PaymentsRepository, TypeOrmModule],
})
export class PaymentsModule {}
