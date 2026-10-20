import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Payments } from './payments.entity';
import { PaymentsService } from './payments.service';
import { CreatePaymentsDto } from './dtos/create-payments.dto';
import { UpdatePaymentsDto } from './dtos/update-payments.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * Payments controller — generated. Extends BaseController to expose
 * standard /payments CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('payments')):
 *   GET    /payments         findAll
 *   GET    /payments/:id     findOne
 *   POST   /payments         create     (body: CreatePaymentsDto)
 *   PATCH  /payments/:id     update     (body: UpdatePaymentsDto)
 *   DELETE /payments/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('payments')
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController extends BaseController<
  Payments,
  CreatePaymentsDto,
  UpdatePaymentsDto
> {
  constructor(protected readonly service: PaymentsService) {
    super(service, CreatePaymentsDto, UpdatePaymentsDto);
  }
}
