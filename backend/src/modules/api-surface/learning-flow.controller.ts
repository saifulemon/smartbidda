import {
  Body,
  Controller,
  Get,
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

@ApiTags('quizzes')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('student')
export class QuizFlowController {
  constructor(private readonly svc: ApiSurfaceService) {}

  @Post('quizzes/sessions')
  @ApiOperation({ summary: 'Start a quiz session and return its questions' })
  async start(
    @CurrentUser() user: AuthUser,
    @Body() body: { studentId?: string; chapterId?: string; count?: number },
  ) {
    return this.svc.startQuiz(user, body);
  }

  @Post('quizzes/sessions/:id/answers')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit one answer and get immediate correctness feedback' })
  async answer(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() body: { questionId: string; selectedOption: number },
  ) {
    return this.svc.answerQuiz(user, id, body);
  }

  @Post('quizzes/sessions/:id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete the quiz, score it, award points and route to a retake if failed' })
  async complete(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.completeQuiz(user, id);
  }

  @Get('quizzes/sessions/:id')
  @ApiOperation({ summary: 'Quiz result / session state' })
  async get(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.getQuiz(user, id);
  }
}

@ApiTags('exams')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('student')
export class ExamFlowController {
  constructor(private readonly svc: ApiSurfaceService) {}

  @Get('exams')
  @ApiOperation({ summary: 'Term exams for the student class with their attempts' })
  async list(@CurrentUser() user: AuthUser) {
    return this.svc.listExams(user);
  }

  @Get('exams/:id')
  @ApiOperation({ summary: 'Exam detail with its question paper' })
  async detail(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.getExam(user, id);
  }

  @Post('exams/:id/attempts')
  @ApiOperation({ summary: 'Start an exam attempt' })
  async start(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.startAttempt(user, id);
  }

  @Post('exams/:id/attempts/:aid/submit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit the exam paper and receive the verdict' })
  async submit(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Param('aid') aid: string,
    @Body() body: { answers?: Array<{ questionId: string; selectedOption: number }> },
  ) {
    return this.svc.submitAttempt(user, id, aid, body);
  }

  @Get('exams/:id/attempts/:aid')
  @ApiOperation({ summary: 'Attempt result' })
  async attempt(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Param('aid') aid: string,
  ) {
    return this.svc.getAttempt(user, id, aid);
  }

  @Post('remedial')
  @ApiOperation({ summary: 'Start a retake class for the current student' })
  async startRemedial(@CurrentUser() user: AuthUser, @Body() body: { chapterId?: string }) {
    return this.svc.startRemedial(user, body);
  }

  @Get('remedial/:id')
  @ApiOperation({ summary: 'Retake-class detail' })
  async remedial(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.getRemedial(user, id);
  }

  @Post('remedial/:id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete a retake class and unlock the re-exam' })
  async completeRemedial(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.completeRemedial(user, id);
  }
}
