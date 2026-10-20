import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { StudentBadges } from './student-badges.entity';
import { StudentBadgesService } from './student-badges.service';
import { CreateStudentBadgesDto } from './dtos/create-student-badges.dto';
import { UpdateStudentBadgesDto } from './dtos/update-student-badges.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * StudentBadges controller — generated. Extends BaseController to expose
 * standard /student_badges CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('student_badges')):
 *   GET    /student_badges         findAll
 *   GET    /student_badges/:id     findOne
 *   POST   /student_badges         create     (body: CreateStudentBadgesDto)
 *   PATCH  /student_badges/:id     update     (body: UpdateStudentBadgesDto)
 *   DELETE /student_badges/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('student_badges')
@UseGuards(JwtAuthGuard)
@Controller('student_badges')
export class StudentBadgesController extends BaseController<
  StudentBadges,
  CreateStudentBadgesDto,
  UpdateStudentBadgesDto
> {
  constructor(protected readonly service: StudentBadgesService) {
    super(service, CreateStudentBadgesDto, UpdateStudentBadgesDto);
  }
}
