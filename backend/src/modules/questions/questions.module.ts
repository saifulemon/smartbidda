import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './questions.entity';
import { QuestionsRepository } from './questions.repository';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

/**
 * Questions module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Questions])],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsRepository],
  exports: [QuestionsService, QuestionsRepository, TypeOrmModule],
})
export class QuestionsModule {}
