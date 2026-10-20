import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemedialAssignments } from './remedial-assignments.entity';
import { RemedialAssignmentsRepository } from './remedial-assignments.repository';
import { RemedialAssignmentsService } from './remedial-assignments.service';
import { RemedialAssignmentsController } from './remedial-assignments.controller';
import { AdminRemedialController } from './admin-remedial.controller';

/**
 * RemedialAssignments module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([RemedialAssignments])],
  controllers: [RemedialAssignmentsController, AdminRemedialController],
  providers: [RemedialAssignmentsService, RemedialAssignmentsRepository],
  exports: [RemedialAssignmentsService, RemedialAssignmentsRepository, TypeOrmModule],
})
export class RemedialAssignmentsModule {}
