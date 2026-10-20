import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningContent } from './learning-content.entity';
import { LearningContentRepository } from './learning-content.repository';
import { LearningContentService } from './learning-content.service';
import { LearningContentController } from './learning-content.controller';

/**
 * LearningContent module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([LearningContent])],
  controllers: [LearningContentController],
  providers: [LearningContentService, LearningContentRepository],
  exports: [LearningContentService, LearningContentRepository, TypeOrmModule],
})
export class LearningContentModule {}
