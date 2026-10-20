import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageHeartbeat } from './usage-heartbeat.entity';
import { UsageHeartbeatRepository } from './usage-heartbeat.repository';
import { UsageHeartbeatService } from './usage-heartbeat.service';
import { UsageHeartbeatController } from './usage-heartbeat.controller';

/**
 * UsageHeartbeat module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([UsageHeartbeat])],
  controllers: [UsageHeartbeatController],
  providers: [UsageHeartbeatService, UsageHeartbeatRepository],
  exports: [UsageHeartbeatService, UsageHeartbeatRepository, TypeOrmModule],
})
export class UsageHeartbeatModule {}
