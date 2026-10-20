import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Subscriptions } from './subscriptions.entity';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionsDto } from './dtos/create-subscriptions.dto';
import { UpdateSubscriptionsDto } from './dtos/update-subscriptions.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * Subscriptions controller — generated. Extends BaseController to expose
 * standard /subscriptions CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('subscriptions')):
 *   GET    /subscriptions         findAll
 *   GET    /subscriptions/:id     findOne
 *   POST   /subscriptions         create     (body: CreateSubscriptionsDto)
 *   PATCH  /subscriptions/:id     update     (body: UpdateSubscriptionsDto)
 *   DELETE /subscriptions/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('subscriptions')
@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class SubscriptionsController extends BaseController<
  Subscriptions,
  CreateSubscriptionsDto,
  UpdateSubscriptionsDto
> {
  constructor(protected readonly service: SubscriptionsService) {
    super(service, CreateSubscriptionsDto, UpdateSubscriptionsDto);
  }
}
