import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Subjects } from './subjects.entity';
import { SubjectsService } from './subjects.service';
import { CreateSubjectsDto } from './dtos/create-subjects.dto';
import { UpdateSubjectsDto } from './dtos/update-subjects.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * Subjects controller — generated. Extends BaseController to expose
 * standard /subjects CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('subjects')):
 *   GET    /subjects         findAll
 *   GET    /subjects/:id     findOne
 *   POST   /subjects         create     (body: CreateSubjectsDto)
 *   PATCH  /subjects/:id     update     (body: UpdateSubjectsDto)
 *   DELETE /subjects/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('subjects')
@UseGuards(JwtAuthGuard)
@Controller('subjects')
export class SubjectsController extends BaseController<
  Subjects,
  CreateSubjectsDto,
  UpdateSubjectsDto
> {
  constructor(protected readonly service: SubjectsService) {
    super(service, CreateSubjectsDto, UpdateSubjectsDto);
  }
}
