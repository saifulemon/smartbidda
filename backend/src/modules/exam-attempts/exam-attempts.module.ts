import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamAttempts } from './exam-attempts.entity';
import { ExamAttemptsRepository } from './exam-attempts.repository';
import { ExamAttemptsService } from './exam-attempts.service';
import { ExamAttemptsController } from './exam-attempts.controller';

/**
 * ExamAttempts module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ExamAttempts])],
  controllers: [ExamAttemptsController],
  providers: [ExamAttemptsService, ExamAttemptsRepository],
  exports: [ExamAttemptsService, ExamAttemptsRepository, TypeOrmModule],
})
export class ExamAttemptsModule {}
