import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Users } from './users.entity';

/**
 * Users repository — generated. Extends BaseRepository<Users> for
 * standard CRUD (findById, findAll, create, update, softDelete). Add custom
 * query methods here as the project needs them (e.g. findByEmail,
 * findActiveByOrgId). Do not modify the inherited methods.
 */
@Injectable()
export class UsersRepository extends BaseRepository<Users> {
  constructor(
    @InjectRepository(Users)
    repository: Repository<Users>,
  ) {
    super(repository);
  }
}
