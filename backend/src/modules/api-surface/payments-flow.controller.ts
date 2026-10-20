import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { Roles } from '../../core/decorators/roles.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { ApiSurfaceService, AuthUser } from './api-surface.service';

@ApiTags('payments')
@Controller()
export class PaymentsFlowController {
  constructor(private readonly svc: ApiSurfaceService) {}

  @Post('payments/intents')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('parent')
  @ApiOperation({ summary: 'Create a payment intent and gateway session' })
  async intent(@CurrentUser() user: AuthUser, @Body() body: { plan?: string }) {
    return this.svc.createIntent(user, String(body.plan || 'MONTHLY'));
  }

  /**
   * SSLCommerz IPN / page-return webhook. Public by design: the gateway calls
   * it, and the `val_id` is validated server-to-server before entitlement is
   * granted — a redirect query on its own never activates a subscription.
   */
  @Post('payments/webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'SSLCommerz webhook — validate and activate the subscription' })
  async webhook(@Body() body: Record<string, unknown>) {
    return this.svc.paymentWebhook(body);
  }

  @Post('payments/:id/refund')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Admin compensating refund for a payment' })
  async refund(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.refundSubscription(user.id, id);
  }
}
