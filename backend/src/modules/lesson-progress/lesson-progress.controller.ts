import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { LessonProgress } from './lesson-progress.entity';
import { LessonProgressService } from './lesson-progress.service';
import { CreateLessonProgressDto } from './dtos/create-lesson-progress.dto';
import { UpdateLessonProgressDto } from './dtos/update-lesson-progress.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * LessonProgress controller — generated. Extends BaseController to expose
 * standard /lesson_progress CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('lesson_progress')):
 *   GET    /lesson_progress         findAll
 *   GET    /lesson_progress/:id     findOne
 *   POST   /lesson_progress         create     (body: CreateLessonProgressDto)
 *   PATCH  /lesson_progress/:id     update     (body: UpdateLessonProgressDto)
 *   DELETE /lesson_progress/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('lesson_progress')
@UseGuards(JwtAuthGuard)
@Controller('lesson_progress')
export class LessonProgressController extends BaseController<
  LessonProgress,
  CreateLessonProgressDto,
  UpdateLessonProgressDto
> {
  constructor(protected readonly service: LessonProgressService) {
    super(service, CreateLessonProgressDto, UpdateLessonProgressDto);
  }
}
