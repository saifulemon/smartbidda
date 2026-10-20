import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { Roles } from '../../core/decorators/roles.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { ApiSurfaceService, AuthUser } from './api-surface.service';

@ApiTags('parent')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('parent')
export class ParentController {
  constructor(private readonly svc: ApiSurfaceService) {}

  @Get('parent/dashboard')
  @ApiOperation({ summary: 'Parent home: children cards, subscription and alerts' })
  async dashboard(@CurrentUser() user: AuthUser) {
    return this.svc.parentDashboard(user);
  }

  @Get('parent/students/:id/screen-time')
  @ApiOperation({ summary: 'Today screen-time budget for a child' })
  async screenTime(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.screenTimeFor(user, id);
  }

  @Put('parent/students/:id/screen-time')
  @ApiOperation({ summary: 'Set a child daily screen-time limit' })
  async setScreenTime(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() body: { limitMinutes?: number },
  ) {
    return this.svc.setScreenTime(user, id, Number(body.limitMinutes));
  }

  @Post('parent/students/:id/screen-time/extend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Extend a child screen-time limit for today' })
  async extendScreenTime(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() body: { minutes?: number },
  ) {
    return this.svc.extendScreenTime(user, id, Number(body.minutes));
  }

  @Post('parent/nudge')
  @ApiOperation({ summary: 'Send a Bangla encouragement nudge to a child' })
  async nudge(
    @CurrentUser() user: AuthUser,
    @Body() body: { studentId?: string; message?: string; messageBn?: string },
  ) {
    if (!body.studentId) {
      throw new BadRequestException('studentId is required');
    }
    return this.svc.sendNudge(user, body.studentId, body.message, body.messageBn);
  }

  @Get('parent/students/:id/forecast')
  @ApiOperation({ summary: 'Exam outcome forecast for a child' })
  async forecast(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.forecast(user, id);
  }

  @Get('parent/students/:id/progress')
  @ApiOperation({ summary: 'Subject-level progress for a child' })
  async progress(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.parentProgress(user, id);
  }

  @Get('parent/subscription')
  @ApiOperation({ summary: 'Family subscription and payment history' })
  async subscription(@CurrentUser() user: AuthUser) {
    return this.svc.parentSubscription(user);
  }

  @Get('parent/settings')
  @ApiOperation({ summary: 'Parent account settings' })
  async settings(@CurrentUser() user: AuthUser) {
    return this.svc.parentSettings(user);
  }

  @Patch('parent/settings')
  @ApiOperation({ summary: 'Update parent PIN / email' })
  async updateSettings(
    @CurrentUser() user: AuthUser,
    @Body() body: { parentPin?: string; email?: string },
  ) {
    return this.svc.updateParentSettings(user, body);
  }
}
