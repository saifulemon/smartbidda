import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizSessions } from './quiz-sessions.entity';
import { QuizSessionsRepository } from './quiz-sessions.repository';
import { QuizSessionsService } from './quiz-sessions.service';
import { QuizSessionsController } from './quiz-sessions.controller';

/**
 * QuizSessions module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([QuizSessions])],
  controllers: [QuizSessionsController],
  providers: [QuizSessionsService, QuizSessionsRepository],
  exports: [QuizSessionsService, QuizSessionsRepository, TypeOrmModule],
})
export class QuizSessionsModule {}
