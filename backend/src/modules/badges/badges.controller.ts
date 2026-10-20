import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Badges } from './badges.entity';
import { BadgesService } from './badges.service';
import { CreateBadgesDto } from './dtos/create-badges.dto';
import { UpdateBadgesDto } from './dtos/update-badges.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * Badges controller — generated. Extends BaseController to expose
 * standard /badges CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('badges')):
 *   GET    /badges         findAll
 *   GET    /badges/:id     findOne
 *   POST   /badges         create     (body: CreateBadgesDto)
 *   PATCH  /badges/:id     update     (body: UpdateBadgesDto)
 *   DELETE /badges/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('badges')
@UseGuards(JwtAuthGuard)
@Controller('badges')
export class BadgesController extends BaseController<
  Badges,
  CreateBadgesDto,
  UpdateBadgesDto
> {
  constructor(protected readonly service: BadgesService) {
    super(service, CreateBadgesDto, UpdateBadgesDto);
  }
}
