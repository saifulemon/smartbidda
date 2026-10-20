import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAnswers } from './quiz-answers.entity';
import { QuizAnswersRepository } from './quiz-answers.repository';
import { QuizAnswersService } from './quiz-answers.service';
import { QuizAnswersController } from './quiz-answers.controller';

/**
 * QuizAnswers module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([QuizAnswers])],
  controllers: [QuizAnswersController],
  providers: [QuizAnswersService, QuizAnswersRepository],
  exports: [QuizAnswersService, QuizAnswersRepository, TypeOrmModule],
})
export class QuizAnswersModule {}
