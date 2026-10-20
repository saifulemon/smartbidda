import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { TermExams } from './term-exams.entity';
import { TermExamsService } from './term-exams.service';
import { CreateTermExamsDto } from './dtos/create-term-exams.dto';
import { UpdateTermExamsDto } from './dtos/update-term-exams.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * TermExams controller — generated. Extends BaseController to expose
 * standard /term_exams CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('term_exams')):
 *   GET    /term_exams         findAll
 *   GET    /term_exams/:id     findOne
 *   POST   /term_exams         create     (body: CreateTermExamsDto)
 *   PATCH  /term_exams/:id     update     (body: UpdateTermExamsDto)
 *   DELETE /term_exams/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('term_exams')
@UseGuards(JwtAuthGuard)
@Controller('term_exams')
export class TermExamsController extends BaseController<
  TermExams,
  CreateTermExamsDto,
  UpdateTermExamsDto
> {
  constructor(protected readonly service: TermExamsService) {
    super(service, CreateTermExamsDto, UpdateTermExamsDto);
  }
}
