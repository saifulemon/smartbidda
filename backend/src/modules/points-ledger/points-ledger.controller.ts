import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { PointsLedger } from './points-ledger.entity';
import { PointsLedgerService } from './points-ledger.service';
import { CreatePointsLedgerDto } from './dtos/create-points-ledger.dto';
import { UpdatePointsLedgerDto } from './dtos/update-points-ledger.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * PointsLedger controller — generated. Extends BaseController to expose
 * standard /points_ledger CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('points_ledger')):
 *   GET    /points_ledger         findAll
 *   GET    /points_ledger/:id     findOne
 *   POST   /points_ledger         create     (body: CreatePointsLedgerDto)
 *   PATCH  /points_ledger/:id     update     (body: UpdatePointsLedgerDto)
 *   DELETE /points_ledger/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('points_ledger')
@UseGuards(JwtAuthGuard)
@Controller('points_ledger')
export class PointsLedgerController extends BaseController<
  PointsLedger,
  CreatePointsLedgerDto,
  UpdatePointsLedgerDto
> {
  constructor(protected readonly service: PointsLedgerService) {
    super(service, CreatePointsLedgerDto, UpdatePointsLedgerDto);
  }
}
