import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { ScreenTimeLedger } from './screen-time-ledger.entity';
import { ScreenTimeLedgerService } from './screen-time-ledger.service';
import { CreateScreenTimeLedgerDto } from './dtos/create-screen-time-ledger.dto';
import { UpdateScreenTimeLedgerDto } from './dtos/update-screen-time-ledger.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * ScreenTimeLedger controller — generated. Extends BaseController to expose
 * standard /screen_time_ledger CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('screen_time_ledger')):
 *   GET    /screen_time_ledger         findAll
 *   GET    /screen_time_ledger/:id     findOne
 *   POST   /screen_time_ledger         create     (body: CreateScreenTimeLedgerDto)
 *   PATCH  /screen_time_ledger/:id     update     (body: UpdateScreenTimeLedgerDto)
 *   DELETE /screen_time_ledger/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('screen_time_ledger')
@UseGuards(JwtAuthGuard)
@Controller('screen_time_ledger')
export class ScreenTimeLedgerController extends BaseController<
  ScreenTimeLedger,
  CreateScreenTimeLedgerDto,
  UpdateScreenTimeLedgerDto
> {
  constructor(protected readonly service: ScreenTimeLedgerService) {
    super(service, CreateScreenTimeLedgerDto, UpdateScreenTimeLedgerDto);
  }
}
