import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { Roles } from '../../core/decorators/roles.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { ApiSurfaceService, AuthUser } from './api-surface.service';

@ApiTags('student')
@Controller()
export class StudentController {
  constructor(private readonly svc: ApiSurfaceService) {}

  @Get('student/home')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @ApiOperation({ summary: 'Student home dashboard' })
  async home(@CurrentUser() user: AuthUser) {
    return this.svc.studentHome(user);
  }

  @Get('student/settings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @ApiOperation({ summary: 'Read the student settings' })
  async settings(@CurrentUser() user: AuthUser) {
    return this.svc.studentSettings(user);
  }

  @Patch('student/settings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @ApiOperation({ summary: 'Update locale / voice preference' })
  async updateSettings(
    @CurrentUser() user: AuthUser,
    @Body() body: { locale?: string; voiceMuted?: boolean },
  ) {
    return this.svc.updateStudentSettings(user, body);
  }

  @Get('onboarding')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('parent')
  @ApiOperation({ summary: 'Resume state for the child-onboarding flow' })
  async onboarding(@CurrentUser() user: AuthUser) {
    return this.svc.onboarding(user);
  }

  @Post('usage/heartbeat')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @ApiOperation({ summary: 'Record study minutes and screen-time usage' })
  async heartbeat(@CurrentUser() user: AuthUser, @Body() body: { minutes?: number }) {
    return this.svc.heartbeat(user, Number(body.minutes ?? 1));
  }

  @Get('i18n/catalog')
  @ApiOperation({ summary: 'Bangla UI string catalog' })
  async catalog() {
    return this.svc.i18nCatalog();
  }

  @Get('i18n/voice')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @ApiOperation({ summary: 'Bangla voice-over asset catalog' })
  async voice(@CurrentUser() user: AuthUser) {
    return this.svc.voiceCatalog();
  }

  @Get('leaderboard')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Class leaderboard by points' })
  async leaderboard(@CurrentUser() user: AuthUser) {
    return this.svc.leaderboard(user);
  }

  @Get('rewards')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Badge catalog and earned badges' })
  async rewards(@CurrentUser() user: AuthUser) {
    return this.svc.rewards(user);
  }
}
