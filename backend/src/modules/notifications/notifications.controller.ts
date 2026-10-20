import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Notifications } from './notifications.entity';
import { NotificationsService } from './notifications.service';
import { CreateNotificationsDto } from './dtos/create-notifications.dto';
import { UpdateNotificationsDto } from './dtos/update-notifications.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * Notifications controller — generated. Extends BaseController to expose
 * standard /notifications CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('notifications')):
 *   GET    /notifications         findAll
 *   GET    /notifications/:id     findOne
 *   POST   /notifications         create     (body: CreateNotificationsDto)
 *   PATCH  /notifications/:id     update     (body: UpdateNotificationsDto)
 *   DELETE /notifications/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('notifications')
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController extends BaseController<
  Notifications,
  CreateNotificationsDto,
  UpdateNotificationsDto
> {
  constructor(protected readonly service: NotificationsService) {
    super(service, CreateNotificationsDto, UpdateNotificationsDto);
  }
}
