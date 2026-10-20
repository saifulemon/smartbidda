import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';

import { Public } from '../../core/decorators/public.decorator';
import { SetTokenInterceptor } from '../../core/interceptors/set-token.interceptor';
import { TokenService } from '../../infrastructure/token/token.service';
import { ApiSurfaceService } from './api-surface.service';

/**
 * Auth flows that the canonical scaffold-auth-module does not cover.
 * The base controller keeps signup/login/refresh/logout/me; these are the
 * smartbidda-specific paths from PROJECT_API (§2.1).
 */
@ApiTags('auth-flows')
@Controller()
export class AuthFlowController {
  constructor(
    private readonly svc: ApiSurfaceService,
    private readonly tokens: TokenService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @Post('auth/student-login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(SetTokenInterceptor)
  @ApiOperation({ summary: 'Student login with a 4-digit PIN' })
  async studentLogin(@Body() body: { childId?: string; studentId?: string; pin?: string }) {
    return this.svc.studentLogin(String(body.childId || body.studentId || ''), String(body.pin || ''));
  }

  @Public()
  @Get('auth/children')
  @ApiOperation({ summary: 'Children available on the student login picker' })
  async children(@Query('familyCode') familyCode?: string) {
    return this.svc.childrenForLogin(familyCode);
  }

  @Public()
  @Get('auth/prefill')
  @ApiOperation({ summary: 'Prefill the login/signup child selector' })
  async prefill(@Query('familyCode') familyCode?: string) {
    return this.svc.childrenForLogin(familyCode);
  }

  @Public()
  @Post('auth/forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request a password-reset email' })
  async forgotPassword(@Body() body: { email?: string }) {
    return this.svc.forgotPassword(String(body.email || ''));
  }

  @Public()
  @Post('auth/reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete the password-reset flow' })
  async resetPassword(@Body() body: { token?: string; password?: string }) {
    return this.svc.resetPassword(String(body.token || ''), String(body.password || ''));
  }

  /**
   * Parent Mode gate. The page is reachable without a session in the route map,
   * but the action re-verifies the PIN on the live parent session (PRD C2) — so
   * the identity comes from the auth cookie, never from the body.
   */
  @Post('parent/verify-pin')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(SetTokenInterceptor)
  @ApiOperation({ summary: 'Re-verify the 6-digit parent PIN and rotate the session' })
  async verifyPin(@Body() body: { pin?: string }, @Req() req: Request) {
    const cookieName = this.config.getOrThrow<string>('AUTH_TOKEN_COOKIE_NAME');
    const token = (req.cookies?.[cookieName] as string | undefined) || undefined;
    let userId: string | undefined;
    if (token) {
      try {
        const payload = this.tokens.decodeToken(token) as { id?: string; sub?: string };
        userId = payload.id || payload.sub;
      } catch {
        userId = undefined;
      }
    }
    return this.svc.parentVerifyPin(String(body.pin || ''), userId);
  }
}
