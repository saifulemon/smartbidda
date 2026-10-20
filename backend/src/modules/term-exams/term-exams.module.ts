import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermExams } from './term-exams.entity';
import { TermExamsRepository } from './term-exams.repository';
import { TermExamsService } from './term-exams.service';
import { TermExamsController } from './term-exams.controller';

/**
 * TermExams module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([TermExams])],
  controllers: [TermExamsController],
  providers: [TermExamsService, TermExamsRepository],
  exports: [TermExamsService, TermExamsRepository, TypeOrmModule],
})
export class TermExamsModule {}
