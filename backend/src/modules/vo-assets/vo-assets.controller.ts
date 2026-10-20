import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { VoAssets } from './vo-assets.entity';
import { VoAssetsService } from './vo-assets.service';
import { CreateVoAssetsDto } from './dtos/create-vo-assets.dto';
import { UpdateVoAssetsDto } from './dtos/update-vo-assets.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * VoAssets controller — generated. Extends BaseController to expose
 * standard /vo_assets CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('vo_assets')):
 *   GET    /vo_assets         findAll
 *   GET    /vo_assets/:id     findOne
 *   POST   /vo_assets         create     (body: CreateVoAssetsDto)
 *   PATCH  /vo_assets/:id     update     (body: UpdateVoAssetsDto)
 *   DELETE /vo_assets/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('vo_assets')
@UseGuards(JwtAuthGuard)
@Controller('vo_assets')
export class VoAssetsController extends BaseController<
  VoAssets,
  CreateVoAssetsDto,
  UpdateVoAssetsDto
> {
  constructor(protected readonly service: VoAssetsService) {
    super(service, CreateVoAssetsDto, UpdateVoAssetsDto);
  }
}
