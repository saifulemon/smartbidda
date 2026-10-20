import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapters } from './chapters.entity';
import { ChaptersRepository } from './chapters.repository';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';

/**
 * Chapters module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Chapters])],
  controllers: [ChaptersController],
  providers: [ChaptersService, ChaptersRepository],
  exports: [ChaptersService, ChaptersRepository, TypeOrmModule],
})
export class ChaptersModule {}
