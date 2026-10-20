import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { LearningContent } from './learning-content.entity';
import { LearningContentService } from './learning-content.service';
import { CreateLearningContentDto } from './dtos/create-learning-content.dto';
import { UpdateLearningContentDto } from './dtos/update-learning-content.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * LearningContent controller — generated. Extends BaseController to expose
 * standard /learning_content CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('learning_content')):
 *   GET    /learning_content         findAll
 *   GET    /learning_content/:id     findOne
 *   POST   /learning_content         create     (body: CreateLearningContentDto)
 *   PATCH  /learning_content/:id     update     (body: UpdateLearningContentDto)
 *   DELETE /learning_content/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('learning_content')
@UseGuards(JwtAuthGuard)
@Controller('learning_content')
export class LearningContentController extends BaseController<
  LearningContent,
  CreateLearningContentDto,
  UpdateLearningContentDto
> {
  constructor(protected readonly service: LearningContentService) {
    super(service, CreateLearningContentDto, UpdateLearningContentDto);
  }
}
