import {
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { Notifications } from '../notifications/notifications.entity';
import { AuthUser } from './api-surface.service';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsFlowController {
  constructor(
    @InjectRepository(Notifications)
    private readonly notifications: Repository<Notifications>,
  ) {}

  @Post(':id/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark one notification as read' })
  async read(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const row = await this.notifications.findOne({ where: { id } });
    if (!row) throw new NotFoundException('Notification not found');
    if (row.recipientUserId !== user.id) {
      throw new NotFoundException('Notification not found');
    }
    row.read = true;
    row.readAt = new Date();
    return this.notifications.save(row);
  }

  @Post('read-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark every notification for the current user as read' })
  async readAll(@CurrentUser() user: AuthUser) {
    await this.notifications.update({ recipientUserId: user.id, read: false }, { read: true, readAt: new Date() });
    return { readAll: true };
  }
}
