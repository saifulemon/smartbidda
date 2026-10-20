import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { QuizAnswers } from './quiz-answers.entity';
import { QuizAnswersService } from './quiz-answers.service';
import { CreateQuizAnswersDto } from './dtos/create-quiz-answers.dto';
import { UpdateQuizAnswersDto } from './dtos/update-quiz-answers.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * QuizAnswers controller — generated. Extends BaseController to expose
 * standard /quiz_answers CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('quiz_answers')):
 *   GET    /quiz_answers         findAll
 *   GET    /quiz_answers/:id     findOne
 *   POST   /quiz_answers         create     (body: CreateQuizAnswersDto)
 *   PATCH  /quiz_answers/:id     update     (body: UpdateQuizAnswersDto)
 *   DELETE /quiz_answers/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('quiz_answers')
@UseGuards(JwtAuthGuard)
@Controller('quiz_answers')
export class QuizAnswersController extends BaseController<
  QuizAnswers,
  CreateQuizAnswersDto,
  UpdateQuizAnswersDto
> {
  constructor(protected readonly service: QuizAnswersService) {
    super(service, CreateQuizAnswersDto, UpdateQuizAnswersDto);
  }
}
