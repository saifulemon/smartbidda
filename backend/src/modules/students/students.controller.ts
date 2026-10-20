import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Students } from './students.entity';
import { StudentsService } from './students.service';
import { CreateStudentsDto } from './dtos/create-students.dto';
import { UpdateStudentsDto } from './dtos/update-students.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';

/**
 * Students controller — generated. Extends BaseController to expose
 * standard /students CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('students')):
 *   GET    /students         findAll
 *   GET    /students/:id     findOne
 *   POST   /students         create     (body: CreateStudentsDto)
 *   PATCH  /students/:id     update     (body: UpdateStudentsDto)
 *   DELETE /students/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('students')
@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentsController extends BaseController<
  Students,
  CreateStudentsDto,
  UpdateStudentsDto
> {
  constructor(protected readonly service: StudentsService) {
    super(service, CreateStudentsDto, UpdateStudentsDto);
  }

  /**
   * Override the inherited create: a parent does not know their family UUID
   * (and may not have one yet), so the service derives it from the session.
   */
  @Post()
  async create(
    @Body() dto: CreateStudentsDto,
    @CurrentUser() user?: { id: string; role?: string },
  ) {
    if (!user) throw new UnauthorizedException('Authentication is required');
    return this.service.createFor(user, dto as CreateStudentsDto & { kidPin?: string });
  }
}
