import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Families } from './families.entity';
import { FamiliesService } from './families.service';
import { CreateFamiliesDto } from './dtos/create-families.dto';
import { UpdateFamiliesDto } from './dtos/update-families.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * Families controller — generated. Extends BaseController to expose
 * standard /families CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('families')):
 *   GET    /families         findAll
 *   GET    /families/:id     findOne
 *   POST   /families         create     (body: CreateFamiliesDto)
 *   PATCH  /families/:id     update     (body: UpdateFamiliesDto)
 *   DELETE /families/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('families')
@UseGuards(JwtAuthGuard)
@Controller('families')
export class FamiliesController extends BaseController<
  Families,
  CreateFamiliesDto,
  UpdateFamiliesDto
> {
  constructor(protected readonly service: FamiliesService) {
    super(service, CreateFamiliesDto, UpdateFamiliesDto);
  }
}
