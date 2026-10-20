import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTemplates } from './notification-templates.entity';
import { NotificationTemplatesRepository } from './notification-templates.repository';
import { NotificationTemplatesService } from './notification-templates.service';
import { NotificationTemplatesController } from './notification-templates.controller';

/**
 * NotificationTemplates module — generated. Wires the standard
 * controller + service + repository triple and exports BOTH the service
 * and the repository so other modules can compose against either
 * abstraction. v92 evidence: workflow / scheduler / satellite modules
 * that wanted Repository (e.g. for cross-cutting queries) couldn't get
 * it when only Service was exported, causing Nest DI to fail at boot.
 */
@Module({
  imports: [TypeOrmModule.forFeature([NotificationTemplates])],
  controllers: [NotificationTemplatesController],
  providers: [NotificationTemplatesService, NotificationTemplatesRepository],
  exports: [NotificationTemplatesService, NotificationTemplatesRepository, TypeOrmModule],
})
export class NotificationTemplatesModule {}
