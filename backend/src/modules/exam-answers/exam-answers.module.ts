import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamAnswers } from './exam-answers.entity';
import { ExamAnswersRepository } from './exam-answers.repository';
import { ExamAnswersService } from './exam-answers.service';
import { ExamAnswersController } from './exam-answers.controller';
import { AdminExamsController } from './admin-exams.controller';

/**
 * ExamAnswers module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ExamAnswers])],
  controllers: [ExamAnswersController, AdminExamsController],
  providers: [ExamAnswersService, ExamAnswersRepository],
  exports: [ExamAnswersService, ExamAnswersRepository, TypeOrmModule],
})
export class ExamAnswersModule {}
