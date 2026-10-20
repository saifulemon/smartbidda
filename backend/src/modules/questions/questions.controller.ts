import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Questions } from './questions.entity';
import { QuestionsService } from './questions.service';
import { CreateQuestionsDto } from './dtos/create-questions.dto';
import { UpdateQuestionsDto } from './dtos/update-questions.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * Questions controller — generated. Extends BaseController to expose
 * standard /questions CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('questions')):
 *   GET    /questions         findAll
 *   GET    /questions/:id     findOne
 *   POST   /questions         create     (body: CreateQuestionsDto)
 *   PATCH  /questions/:id     update     (body: UpdateQuestionsDto)
 *   DELETE /questions/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('questions')
@UseGuards(JwtAuthGuard)
@Controller('questions')
export class QuestionsController extends BaseController<
  Questions,
  CreateQuestionsDto,
  UpdateQuestionsDto
> {
  constructor(protected readonly service: QuestionsService) {
    super(service, CreateQuestionsDto, UpdateQuestionsDto);
  }
}
