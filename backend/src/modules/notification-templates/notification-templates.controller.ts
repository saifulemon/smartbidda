import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { NotificationTemplates } from './notification-templates.entity';
import { NotificationTemplatesService } from './notification-templates.service';
import { CreateNotificationTemplatesDto } from './dtos/create-notification-templates.dto';
import { UpdateNotificationTemplatesDto } from './dtos/update-notification-templates.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * NotificationTemplates controller — generated. Extends BaseController to expose
 * standard /notification_templates CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('notification_templates')):
 *   GET    /notification_templates         findAll
 *   GET    /notification_templates/:id     findOne
 *   POST   /notification_templates         create     (body: CreateNotificationTemplatesDto)
 *   PATCH  /notification_templates/:id     update     (body: UpdateNotificationTemplatesDto)
 *   DELETE /notification_templates/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('notification_templates')
@UseGuards(JwtAuthGuard)
@Controller('notification_templates')
export class NotificationTemplatesController extends BaseController<
  NotificationTemplates,
  CreateNotificationTemplatesDto,
  UpdateNotificationTemplatesDto
> {
  constructor(protected readonly service: NotificationTemplatesService) {
    super(service, CreateNotificationTemplatesDto, UpdateNotificationTemplatesDto);
  }
}
