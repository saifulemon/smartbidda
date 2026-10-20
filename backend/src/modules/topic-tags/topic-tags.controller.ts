import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { TopicTags } from './topic-tags.entity';
import { TopicTagsService } from './topic-tags.service';
import { CreateTopicTagsDto } from './dtos/create-topic-tags.dto';
import { UpdateTopicTagsDto } from './dtos/update-topic-tags.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * TopicTags controller — generated. Extends BaseController to expose
 * standard /topic_tags CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('topic_tags')):
 *   GET    /topic_tags         findAll
 *   GET    /topic_tags/:id     findOne
 *   POST   /topic_tags         create     (body: CreateTopicTagsDto)
 *   PATCH  /topic_tags/:id     update     (body: UpdateTopicTagsDto)
 *   DELETE /topic_tags/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('topic_tags')
@UseGuards(JwtAuthGuard)
@Controller('topic_tags')
export class TopicTagsController extends BaseController<
  TopicTags,
  CreateTopicTagsDto,
  UpdateTopicTagsDto
> {
  constructor(protected readonly service: TopicTagsService) {
    super(service, CreateTopicTagsDto, UpdateTopicTagsDto);
  }
}
