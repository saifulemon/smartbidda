import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { Payments } from './payments.entity';
import { PaymentsRepository } from './payments.repository';

/**
 * Payments service — generated. Extends BaseService<Payments> for the
 * standard create/findById/findAll/update/remove operations.
 *
 * Add domain-specific methods here:
 *   - Cross-entity orchestration (e.g. assignTo, transition state)
 *   - Business rules / invariants
 *   - Bulk operations
 *
 * NEVER inject `Repository<Payments>` directly — go through this.repository
 * (the PaymentsRepository instance) so caching, soft-delete, and tenant
 * scoping stay consistent.
 */
@Injectable()
export class PaymentsService extends BaseService<Payments> {
  constructor(protected readonly repository: PaymentsRepository) {
    super(repository, 'Payments');
  }

  /** Money invariants: integer poisha, positive amount, BDT only. */
  async create(data: DeepPartial<Payments>): Promise<Payments> {
    const amount = Number(data.amountPoisha);
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new BadRequestException('amountPoisha must be a positive integer');
    }
    if (data.currency && data.currency !== 'BDT') {
      throw new BadRequestException('Only BDT payments are supported');
    }
    return super.create({ ...data, amountPoisha: amount } as DeepPartial<Payments>);
  }
}
