import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { UsageHeartbeat } from './usage-heartbeat.entity';
import { UsageHeartbeatService } from './usage-heartbeat.service';
import { CreateUsageHeartbeatDto } from './dtos/create-usage-heartbeat.dto';
import { UpdateUsageHeartbeatDto } from './dtos/update-usage-heartbeat.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * UsageHeartbeat controller — generated. Extends BaseController to expose
 * standard /usage_heartbeat CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('usage_heartbeat')):
 *   GET    /usage_heartbeat         findAll
 *   GET    /usage_heartbeat/:id     findOne
 *   POST   /usage_heartbeat         create     (body: CreateUsageHeartbeatDto)
 *   PATCH  /usage_heartbeat/:id     update     (body: UpdateUsageHeartbeatDto)
 *   DELETE /usage_heartbeat/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('usage_heartbeat')
@UseGuards(JwtAuthGuard)
@Controller('usage_heartbeat')
export class UsageHeartbeatController extends BaseController<
  UsageHeartbeat,
  CreateUsageHeartbeatDto,
  UpdateUsageHeartbeatDto
> {
  constructor(protected readonly service: UsageHeartbeatService) {
    super(service, CreateUsageHeartbeatDto, UpdateUsageHeartbeatDto);
  }
}
