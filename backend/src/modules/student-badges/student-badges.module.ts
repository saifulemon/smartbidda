import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentBadges } from './student-badges.entity';
import { StudentBadgesRepository } from './student-badges.repository';
import { StudentBadgesService } from './student-badges.service';
import { StudentBadgesController } from './student-badges.controller';

/**
 * StudentBadges module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([StudentBadges])],
  controllers: [StudentBadgesController],
  providers: [StudentBadgesService, StudentBadgesRepository],
  exports: [StudentBadgesService, StudentBadgesRepository, TypeOrmModule],
})
export class StudentBadgesModule {}
