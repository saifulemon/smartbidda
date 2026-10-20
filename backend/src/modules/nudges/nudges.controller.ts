import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Nudges } from './nudges.entity';
import { NudgesService } from './nudges.service';
import { CreateNudgesDto } from './dtos/create-nudges.dto';
import { UpdateNudgesDto } from './dtos/update-nudges.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * Nudges controller — generated. Extends BaseController to expose
 * standard /nudges CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('nudges')):
 *   GET    /nudges         findAll
 *   GET    /nudges/:id     findOne
 *   POST   /nudges         create     (body: CreateNudgesDto)
 *   PATCH  /nudges/:id     update     (body: UpdateNudgesDto)
 *   DELETE /nudges/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('nudges')
@UseGuards(JwtAuthGuard)
@Controller('nudges')
export class NudgesController extends BaseController<
  Nudges,
  CreateNudgesDto,
  UpdateNudgesDto
> {
  constructor(protected readonly service: NudgesService) {
    super(service, CreateNudgesDto, UpdateNudgesDto);
  }
}
