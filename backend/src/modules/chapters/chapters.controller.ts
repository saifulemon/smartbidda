import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Chapters } from './chapters.entity';
import { ChaptersService } from './chapters.service';
import { CreateChaptersDto } from './dtos/create-chapters.dto';
import { UpdateChaptersDto } from './dtos/update-chapters.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * Chapters controller — generated. Extends BaseController to expose
 * standard /chapters CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('chapters')):
 *   GET    /chapters         findAll
 *   GET    /chapters/:id     findOne
 *   POST   /chapters         create     (body: CreateChaptersDto)
 *   PATCH  /chapters/:id     update     (body: UpdateChaptersDto)
 *   DELETE /chapters/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('chapters')
@UseGuards(JwtAuthGuard)
@Controller('chapters')
export class ChaptersController extends BaseController<
  Chapters,
  CreateChaptersDto,
  UpdateChaptersDto
> {
  constructor(protected readonly service: ChaptersService) {
    super(service, CreateChaptersDto, UpdateChaptersDto);
  }
}
