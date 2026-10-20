import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './students.entity';
import { StudentsRepository } from './students.repository';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { AdminStudentsController } from './admin-students.controller';

/**
 * Students module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Students])],
  controllers: [StudentsController, AdminStudentsController],
  providers: [StudentsService, StudentsRepository],
  exports: [StudentsService, StudentsRepository, TypeOrmModule],
})
export class StudentsModule {}
