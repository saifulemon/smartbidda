import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/base/base.controller';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

/**
 * Users controller — generated. Extends BaseController to expose
 * standard /users CRUD endpoints with Swagger decorators and
 * ParseUUIDPipe on :id params. Override individual methods only when
 * you need custom auth scoping, response shaping, or pagination
 * defaults; otherwise leave the inherited behavior alone.
 *
 * Generated routes (under @Controller('users')):
 *   GET    /users         findAll
 *   GET    /users/:id     findOne
 *   POST   /users         create     (body: CreateUsersDto)
 *   PATCH  /users/:id     update     (body: UpdateUsersDto)
 *   DELETE /users/:id     remove     (soft delete via BaseEntity.deletedAt)
 */
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController extends BaseController<
  Users,
  CreateUsersDto,
  UpdateUsersDto
> {
  constructor(protected readonly service: UsersService) {
    super(service, CreateUsersDto, UpdateUsersDto);
  }
}
