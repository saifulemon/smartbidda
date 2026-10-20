import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { QuizSessions } from './quiz-sessions.entity';
import { QuizSessionsService } from './quiz-sessions.service';
import { CreateQuizSessionsDto } from './dtos/create-quiz-sessions.dto';
import { UpdateQuizSessionsDto } from './dtos/update-quiz-sessions.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * QuizSessions controller — generated. Extends BaseController to expose
 * standard /quiz_sessions CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('quiz_sessions')):
 *   GET    /quiz_sessions         findAll
 *   GET    /quiz_sessions/:id     findOne
 *   POST   /quiz_sessions         create     (body: CreateQuizSessionsDto)
 *   PATCH  /quiz_sessions/:id     update     (body: UpdateQuizSessionsDto)
 *   DELETE /quiz_sessions/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('quiz_sessions')
@UseGuards(JwtAuthGuard)
@Controller('quiz_sessions')
export class QuizSessionsController extends BaseController<
  QuizSessions,
  CreateQuizSessionsDto,
  UpdateQuizSessionsDto
> {
  constructor(protected readonly service: QuizSessionsService) {
    super(service, CreateQuizSessionsDto, UpdateQuizSessionsDto);
  }
}
