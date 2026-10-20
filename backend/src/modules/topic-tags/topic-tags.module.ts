import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicTags } from './topic-tags.entity';
import { TopicTagsRepository } from './topic-tags.repository';
import { TopicTagsService } from './topic-tags.service';
import { TopicTagsController } from './topic-tags.controller';

/**
 * TopicTags module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([TopicTags])],
  controllers: [TopicTagsController],
  providers: [TopicTagsService, TopicTagsRepository],
  exports: [TopicTagsService, TopicTagsRepository, TypeOrmModule],
})
export class TopicTagsModule {}
