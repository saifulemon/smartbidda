import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { ExamAnswers } from './exam-answers.entity';
import { ExamAnswersService } from './exam-answers.service';
import { CreateExamAnswersDto } from './dtos/create-exam-answers.dto';
import { UpdateExamAnswersDto } from './dtos/update-exam-answers.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * ExamAnswers controller — generated. Extends BaseController to expose
 * standard /exam_answers CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('exam_answers')):
 *   GET    /exam_answers         findAll
 *   GET    /exam_answers/:id     findOne
 *   POST   /exam_answers         create     (body: CreateExamAnswersDto)
 *   PATCH  /exam_answers/:id     update     (body: UpdateExamAnswersDto)
 *   DELETE /exam_answers/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('exam_answers')
@UseGuards(JwtAuthGuard)
@Controller('exam_answers')
export class ExamAnswersController extends BaseController<
  ExamAnswers,
  CreateExamAnswersDto,
  UpdateExamAnswersDto
> {
  constructor(protected readonly service: ExamAnswersService) {
    super(service, CreateExamAnswersDto, UpdateExamAnswersDto);
  }
}
