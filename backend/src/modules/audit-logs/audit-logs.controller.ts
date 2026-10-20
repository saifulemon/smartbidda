import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { AuditLogs } from './audit-logs.entity';
import { AuditLogsService } from './audit-logs.service';
import { CreateAuditLogsDto } from './dtos/create-audit-logs.dto';
import { UpdateAuditLogsDto } from './dtos/update-audit-logs.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * AuditLogs controller — generated. Extends BaseController to expose
 * standard /audit_logs CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('audit_logs')):
 *   GET    /audit_logs         findAll
 *   GET    /audit_logs/:id     findOne
 *   POST   /audit_logs         create     (body: CreateAuditLogsDto)
 *   PATCH  /audit_logs/:id     update     (body: UpdateAuditLogsDto)
 *   DELETE /audit_logs/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('audit_logs')
@UseGuards(JwtAuthGuard)
@Controller('audit_logs')
export class AuditLogsController extends BaseController<
  AuditLogs,
  CreateAuditLogsDto,
  UpdateAuditLogsDto
> {
  constructor(protected readonly service: AuditLogsService) {
    super(service, CreateAuditLogsDto, UpdateAuditLogsDto);
  }
}
