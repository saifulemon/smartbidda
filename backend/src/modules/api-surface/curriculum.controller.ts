import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { Roles } from '../../core/decorators/roles.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { ApiSurfaceService, AuthUser } from './api-surface.service';

@ApiTags('curriculum')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('student')
export class CurriculumController {
  constructor(private readonly svc: ApiSurfaceService) {}

  @Get('curriculum/subjects')
  @ApiOperation({ summary: 'Published subjects for a class' })
  async subjects(@CurrentUser() user: AuthUser, @Query('classNo') classNo?: string) {
    const student = await this.svc.currentStudent(user);
    return this.svc.subjectsFor(Number(classNo) || student.classNo);
  }

  @Get('curriculum/chapters')
  @ApiOperation({ summary: 'Published chapters for a class / subject' })
  async chapters(
    @CurrentUser() user: AuthUser,
    @Query('classNo') classNo?: string,
    @Query('subjectSlug') subjectSlug?: string,
  ) {
    const student = await this.svc.currentStudent(user);
    return this.svc.chaptersFor(Number(classNo) || student.classNo, subjectSlug);
  }

  @Get('curriculum/chapters/:slug')
  @ApiOperation({ summary: 'Chapter detail with its lesson content' })
  async chapter(@CurrentUser() user: AuthUser, @Param('slug') slug: string) {
    const student = await this.svc.currentStudent(user);
    return this.svc.chapterBySlug(slug, student.id);
  }

  @Post('lessons/:slug/start')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Start a lesson and return its first content item' })
  async start(@CurrentUser() user: AuthUser, @Param('slug') slug: string) {
    const student = await this.svc.currentStudent(user);
    return this.svc.startLesson(student.id, slug);
  }

  @Post('lessons/:slug/progress')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Record watched percentage / completion for a lesson' })
  async progress(
    @CurrentUser() user: AuthUser,
    @Param('slug') slug: string,
    @Body() body: { contentId?: string; watchedPct?: number; completed?: boolean },
  ) {
    const student = await this.svc.currentStudent(user);
    return this.svc.saveLessonProgress(student.id, slug, body);
  }
}
