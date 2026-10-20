import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { RemedialAssignments } from './remedial-assignments.entity';
import { RemedialAssignmentsService } from './remedial-assignments.service';
import { CreateRemedialAssignmentsDto } from './dtos/create-remedial-assignments.dto';
import { UpdateRemedialAssignmentsDto } from './dtos/update-remedial-assignments.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * RemedialAssignments controller — generated. Extends BaseController to expose
 * standard /remedial_assignments CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('remedial_assignments')):
 *   GET    /remedial_assignments         findAll
 *   GET    /remedial_assignments/:id     findOne
 *   POST   /remedial_assignments         create     (body: CreateRemedialAssignmentsDto)
 *   PATCH  /remedial_assignments/:id     update     (body: UpdateRemedialAssignmentsDto)
 *   DELETE /remedial_assignments/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('remedial_assignments')
@UseGuards(JwtAuthGuard)
@Controller('remedial_assignments')
export class RemedialAssignmentsController extends BaseController<
  RemedialAssignments,
  CreateRemedialAssignmentsDto,
  UpdateRemedialAssignmentsDto
> {
  constructor(protected readonly service: RemedialAssignmentsService) {
    super(service, CreateRemedialAssignmentsDto, UpdateRemedialAssignmentsDto);
  }
}
