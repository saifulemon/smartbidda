import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { ExamAttempts } from './exam-attempts.entity';
import { ExamAttemptsService } from './exam-attempts.service';
import { CreateExamAttemptsDto } from './dtos/create-exam-attempts.dto';
import { UpdateExamAttemptsDto } from './dtos/update-exam-attempts.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * ExamAttempts controller — generated. Extends BaseController to expose
 * standard /exam_attempts CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('exam_attempts')):
 *   GET    /exam_attempts         findAll
 *   GET    /exam_attempts/:id     findOne
 *   POST   /exam_attempts         create     (body: CreateExamAttemptsDto)
 *   PATCH  /exam_attempts/:id     update     (body: UpdateExamAttemptsDto)
 *   DELETE /exam_attempts/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('exam_attempts')
@UseGuards(JwtAuthGuard)
@Controller('exam_attempts')
export class ExamAttemptsController extends BaseController<
  ExamAttempts,
  CreateExamAttemptsDto,
  UpdateExamAttemptsDto
> {
  constructor(protected readonly service: ExamAttemptsService) {
    super(service, CreateExamAttemptsDto, UpdateExamAttemptsDto);
  }
}
