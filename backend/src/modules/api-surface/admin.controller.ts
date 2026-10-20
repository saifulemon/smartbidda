import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';

import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { Roles } from '../../core/decorators/roles.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Questions } from '../questions/questions.entity';
import { TermExams } from '../term-exams/term-exams.entity';
import { ApiSurfaceService, AuthUser } from './api-surface.service';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly svc: ApiSurfaceService) {}

  @Get('dashboard')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Admin/teacher dashboard counts' })
  async dashboard() {
    return this.svc.adminDashboard();
  }

  // ── students ──
  @Get('students')
  @Roles('admin')
  @ApiOperation({ summary: 'List every student (admin)' })
  async students() {
    return this.svc.adminStudents();
  }

  @Post('students')
  @Roles('admin')
  @ApiOperation({ summary: 'Create a student for a family (admin)' })
  async createStudent(
    @Body()
    body: {
      familyId?: string;
      name?: string;
      nameBn?: string;
      classNo?: number;
      avatar?: string;
      kidPin?: string;
      status?: string;
    },
  ) {
    return this.svc.adminCreateStudent(body);
  }

  @Delete('students/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Soft-delete a student' })
  async deleteStudent(@Param('id') id: string) {
    return this.svc.adminDeleteStudent(id);
  }

  @Patch('students/:id/status')
  @Roles('admin')
  @ApiOperation({ summary: 'Change a student account status' })
  async setStudentStatus(@Param('id') id: string, @Body() body: { status?: string }) {
    return this.svc.adminSetStudentStatus(id, String(body.status || ''));
  }

  @Get('parents')
  @Roles('admin')
  @ApiOperation({ summary: 'List parent accounts and their family' })
  async parents() {
    return this.svc.adminParents();
  }

  @Get('teachers')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'List teacher accounts' })
  async teachers() {
    return this.svc.adminTeachers();
  }

  @Post('teachers')
  @Roles('admin')
  @ApiOperation({ summary: 'Create a teacher account' })
  async createTeacher(@Body() body: { email?: string; password?: string }) {
    return this.svc.adminCreateTeacher(body);
  }

  // ── subscriptions / payments ──
  @Get('subscriptions')
  @Roles('admin')
  @ApiOperation({ summary: 'List family subscriptions' })
  async subscriptions() {
    return this.svc.adminSubscriptions();
  }

  @Post('subscriptions/:id/refund')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @ApiOperation({ summary: 'Refund a subscription (compensating action)' })
  async refund(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.svc.refundSubscription(user.id, id);
  }

  @Get('payments')
  @Roles('admin')
  @ApiOperation({ summary: 'List payments' })
  async payments() {
    return this.svc.adminPayments();
  }

  @Get('audit-logs')
  @Roles('admin')
  @ApiOperation({ summary: 'Admin audit log' })
  async auditLogs() {
    return this.svc.adminAuditLogs();
  }

  @Get('notifications')
  @Roles('admin')
  @ApiOperation({ summary: 'Notification delivery log' })
  async notifications() {
    return this.svc.adminNotifications();
  }

  // ── question bank ──
  @Get('questions')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'List the question bank' })
  async questions() {
    return this.svc.adminQuestions();
  }

  @Get('questions/:id')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Read a question' })
  async question(@Param('id') id: string) {
    return this.svc.adminQuestion(id);
  }

  @Post('questions')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Create a question' })
  async createQuestion(@Body() body: DeepPartial<Questions>) {
    return this.svc.adminCreateQuestion(body);
  }

  @Patch('questions/:id')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Edit a question' })
  async updateQuestion(@Param('id') id: string, @Body() body: DeepPartial<Questions>) {
    return this.svc.adminUpdateQuestion(id, body);
  }

  @Post('questions/:id/duplicate')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Duplicate a question' })
  async duplicateQuestion(@Param('id') id: string) {
    return this.svc.adminDuplicateQuestion(id);
  }

  @Delete('questions/:id')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Retire a question (soft delete)' })
  async deleteQuestion(@Param('id') id: string) {
    return this.svc.adminDeleteQuestion(id);
  }

  // ── exams ──
  @Get('exams')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'List term exams' })
  async exams() {
    return this.svc.adminExams();
  }

  @Post('exams')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Create a term exam' })
  async createExam(@Body() body: DeepPartial<TermExams>) {
    return this.svc.adminCreateExam(body);
  }

  @Patch('exams/:id')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Edit / extend a term exam' })
  async updateExam(@Param('id') id: string, @Body() body: DeepPartial<TermExams>) {
    return this.svc.adminUpdateExam(id, body);
  }

  @Post('exams/:id/close')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Close an exam window' })
  async closeExam(@Param('id') id: string) {
    return this.svc.adminCloseExam(id);
  }

  // ── remedial ──
  @Get('remedial')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'List retake assignments' })
  async remedial() {
    return this.svc.adminRemedial();
  }

  @Patch('remedial/:id')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Update a retake assignment status' })
  async updateRemedial(@Param('id') id: string, @Body() body: { status?: string }) {
    return this.svc.adminUpdateRemedial(id, String(body.status || ''));
  }

  // ── curriculum ──
  @Get('curriculum')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Authoring tree of subjects and chapters' })
  async curriculum() {
    return this.svc.adminCurriculum();
  }

  @Post('curriculum')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Create a subject or chapter' })
  async createCurriculum(@Body() body: { type?: string } & Record<string, unknown>) {
    return this.svc.adminCreateCurriculum(body);
  }

  @Patch('curriculum/:id')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Edit a subject or chapter' })
  async updateCurriculum(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.svc.adminUpdateCurriculum(id, body);
  }
}
