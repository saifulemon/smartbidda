import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource, DeepPartial, EntityTarget, In, ObjectLiteral, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { TokenService } from '../../infrastructure/token/token.service';
import { MailService } from '../../infrastructure/mail/mail.service';
import { SslcommerzClient } from '../../infrastructure/payment/sslcommerz.client';

import { Users } from '../users/users.entity';
import { Families } from '../families/families.entity';
import { Students } from '../students/students.entity';
import { Subjects } from '../subjects/subjects.entity';
import { Chapters } from '../chapters/chapters.entity';
import { LearningContent } from '../learning-content/learning-content.entity';
import { LessonProgress } from '../lesson-progress/lesson-progress.entity';
import { QuizSessions } from '../quiz-sessions/quiz-sessions.entity';
import { QuizAnswers } from '../quiz-answers/quiz-answers.entity';
import { Questions } from '../questions/questions.entity';
import { TermExams } from '../term-exams/term-exams.entity';
import { ExamAttempts } from '../exam-attempts/exam-attempts.entity';
import { ExamAnswers } from '../exam-answers/exam-answers.entity';
import { RemedialAssignments } from '../remedial-assignments/remedial-assignments.entity';
import { PointsLedger } from '../points-ledger/points-ledger.entity';
import { Badges } from '../badges/badges.entity';
import { StudentBadges } from '../student-badges/student-badges.entity';
import { ScreenTimeLedger } from '../screen-time-ledger/screen-time-ledger.entity';
import { Nudges } from '../nudges/nudges.entity';
import { UsageHeartbeat } from '../usage-heartbeat/usage-heartbeat.entity';
import { Notifications } from '../notifications/notifications.entity';
import { Subscriptions } from '../subscriptions/subscriptions.entity';
import { Payments } from '../payments/payments.entity';
import { AuditLogs } from '../audit-logs/audit-logs.entity';
import { VoAssets } from '../vo-assets/vo-assets.entity';
import { QuestionsService } from '../questions/questions.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

import { account_status } from '../../common/enums/account-status.enum';
import { attempt_status } from '../../common/enums/attempt-status.enum';
import { content_status } from '../../common/enums/content-status.enum';
import { payment_status } from '../../common/enums/payment-status.enum';
import { quiz_status } from '../../common/enums/quiz-status.enum';
import { remedial_status } from '../../common/enums/remedial-status.enum';
import { subscription_plan } from '../../common/enums/subscription-plan.enum';
import { subscription_status } from '../../common/enums/subscription-status.enum';
import { notification_category } from '../../common/enums/notification-category.enum';

export interface AuthUser {
  id: string;
  role?: string;
  email?: string;
}

interface PlanPrice {
  poisha: number;
  days: number;
}

/** Launch pricing confirmed by the client (PROJECT_POLICY.yaml). Amounts are in poisha. */
export const PLAN_PRICES: Record<string, PlanPrice> = {
  MONTHLY: { poisha: 39900, days: 30 },
  ANNUAL: { poisha: 349900, days: 365 },
  CRASH_TERM: { poisha: 14900, days: 15 },
  CRASH_ANNUAL: { poisha: 29900, days: 30 },
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(String(value || ''));
}

function dayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function displayNo(prefix: string, seq: number): string {
  return `${prefix}-${dayKey().replace(/-/g, '')}-${String(seq).padStart(4, '0')}`;
}

@Injectable()
export class ApiSurfaceService {
  constructor(
    private readonly ds: DataSource,
    private readonly tokenService: TokenService,
    private readonly jwt: JwtService,
    private readonly mail: MailService,
    private readonly ssl: SslcommerzClient,
    private readonly questionsService: QuestionsService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  private repo<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
    return this.ds.getRepository(entity);
  }

  /** Resolve a path parameter that may be a uuid or a human display number. */
  private async findByAny<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    value: string,
    displayField?: keyof T,
  ): Promise<T | null> {
    const repo = this.repo(entity);
    if (isUuid(value)) {
      const byId = await repo.findOne({ where: { id: value } as never });
      if (byId) return byId;
    }
    if (displayField) {
      return repo.findOne({ where: { [displayField]: value } as never });
    }
    return null;
  }

  private async nextSeq(entity: EntityTarget<ObjectLiteral>): Promise<number> {
    const count = await this.repo(entity).count();
    return count + 1;
  }

  // ───────────────────────── identity helpers ─────────────────────────

  async familyForUser(userId: string): Promise<Families | null> {
    const families = await this.repo(Families).find({
      where: { parentUserId: userId },
      order: { createdAt: 'ASC' },
    });
    return families[0] ?? null;
  }

  async requireFamily(userId: string): Promise<Families> {
    const family = await this.familyForUser(userId);
    if (!family) {
      throw new ForbiddenException('No family is linked to this account');
    }
    return family;
  }

  /** Ensure a parent has a family row; create one (with the SB-FAM display code) on first use. */
  async ensureFamily(userId: string): Promise<Families> {
    const existing = await this.familyForUser(userId);
    if (existing) return existing;
    const seq = await this.nextSeq(Families);
    const family = this.repo(Families).create({
      parentUserId: userId,
    } as DeepPartial<Families>);
    const saved = await this.repo(Families).save(family);
    const code = displayNo('SB-FAM', seq);
    await this.repo(Users).update({ id: userId }, { familyCode: code });
    return saved;
  }

  async currentStudent(user: AuthUser): Promise<Students> {
    if (user.role === 'student') {
      const student = await this.repo(Students).findOne({ where: { id: user.id } });
      if (!student) throw new NotFoundException('Student not found');
      return student;
    }
    throw new ForbiddenException('This endpoint is only available to students');
  }

  /** Parent/teacher/admin access to a student; a student may only touch their own row. */
  async requireStudentAccess(user: AuthUser, studentRef: string): Promise<Students> {
    const student = await this.resolveStudent(studentRef);
    if (!student) throw new NotFoundException('Student not found');
    if (user.role === 'student') {
      if (student.id !== user.id) throw new ForbiddenException('You can only access your own profile');
      return student;
    }
    if (user.role === 'admin' || user.role === 'teacher') return student;
    if (user.role === 'parent') {
      const family = await this.requireFamily(user.id);
      if (student.familyId !== family.id) throw new ForbiddenException('Student is not in your family');
      return student;
    }
    throw new ForbiddenException('Insufficient permissions');
  }

  async resolveStudent(ref: string): Promise<Students | null> {
    if (!ref) return null;
    if (isUuid(ref)) {
      const byId = await this.repo(Students).findOne({ where: { id: ref } });
      if (byId) return byId;
    }
    return this.repo(Students).findOne({ where: { name: ref } });
  }

  async resolveSubscription(ref: string): Promise<Subscriptions | null> {
    return this.findByAny(Subscriptions, ref, 'subscriptionNo');
  }

  async resolvePayment(ref: string): Promise<Payments | null> {
    return this.findByAny(Payments, ref, 'paymentNo');
  }

  async resolveAttempt(ref: string): Promise<ExamAttempts | null> {
    return this.findByAny(ExamAttempts, ref, 'attemptNo');
  }

  async resolveRemedial(ref: string): Promise<RemedialAssignments | null> {
    return this.findByAny(RemedialAssignments, ref, 'caseNo');
  }

  async resolveExam(ref: string): Promise<TermExams | null> {
    return this.findByAny(TermExams, ref);
  }

  async audit(userId: string | undefined, action: string, entityType: string, entityId?: string): Promise<void> {
    const row = this.repo(AuditLogs).create({ userId, action, entityType, entityId } as DeepPartial<AuditLogs>);
    await this.repo(AuditLogs).save(row);
  }

  // ───────────────────────── auth flows ─────────────────────────

  async studentLogin(childRef: string, pin: string) {
    if (!childRef || !pin) throw new BadRequestException('childId and pin are required');
    const student = await this.resolveStudent(childRef);
    if (!student) throw new UnauthorizedException('PIN_INVALID');
    const ok = await bcrypt.compare(String(pin), student.pinHash);
    if (!ok) throw new UnauthorizedException('PIN_INVALID');
    if (student.status === account_status.SUSPENDED || student.status === account_status.WITHDRAWN) {
      throw new ForbiddenException('ACCOUNT_SUSPENDED');
    }

    const today = await this.screenLedger(student.id);
    if (today.minutes >= today.limitMinutes) {
      throw new ForbiddenException('SCREEN_TIME_EXHAUSTED');
    }

    const payload = { id: student.id, email: '', role: 'student' };
    const accessToken = this.tokenService.signAccess(payload);
    const refreshToken = this.tokenService.signRefresh(payload);
    return {
      user: {
        id: student.id,
        displayName: student.name,
        nameBn: student.nameBn,
        classNo: student.classNo,
        avatar: student.avatar,
        role: 'student',
        familyId: student.familyId,
      },
      accessToken,
      refreshToken,
      remainingMinutes: Math.max(0, today.limitMinutes - today.minutes),
    };
  }

  async parentVerifyPin(pin: string, userId?: string) {
    if (!pin) throw new BadRequestException('pin is required');
    let user: Users | null = null;
    if (userId && isUuid(userId)) {
      user = await this.repo(Users).findOne({ where: { id: userId } });
    }
    if (!user) {
      throw new UnauthorizedException('PIN_INVALID');
    }
    if (!user.parentPinHash) {
      throw new UnauthorizedException('PARENT_PIN_NOT_SET');
    }
    const ok = await bcrypt.compare(String(pin), user.parentPinHash);
    if (!ok) throw new UnauthorizedException('PIN_INVALID');
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken: this.tokenService.signAccess(payload),
      refreshToken: this.tokenService.signRefresh(payload),
      parentModeUntil: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };
  }

  async setParentPin(userId: string, pin: string): Promise<void> {
    if (!/^\d{6}$/.test(String(pin || ''))) {
      throw new BadRequestException('Parent PIN must be exactly 6 digits');
    }
    const hash = await bcrypt.hash(String(pin), 10);
    await this.repo(Users).update({ id: userId }, { parentPinHash: hash });
  }

  async forgotPassword(email: string) {
    if (!email) throw new BadRequestException('email is required');
    const user = await this.repo(Users).findOne({ where: { email: String(email).toLowerCase() } });
    // Never reveal whether the address exists.
    if (!user) return { sent: true };
    const token = this.jwt.sign({ sub: user.id, purpose: 'password_reset' }, { expiresIn: '15m' });
    await this.mail.sendPasswordResetEmail(
      user.email,
      `${process.env.APP_URL || 'http://localhost:5210'}/auth/reset?token=${token}`,
    );
    return { sent: true };
  }

  async resetPassword(token: string, password: string) {
    if (!token || !password) throw new BadRequestException('token and password are required');
    if (String(password).length < 8) throw new BadRequestException('Password must be at least 8 characters');
    let payload: { sub?: string; purpose?: string };
    try {
      payload = this.jwt.verify<{ sub?: string; purpose?: string }>(token);
    } catch {
      throw new BadRequestException('Reset token is invalid or expired');
    }
    if (payload.purpose !== 'password_reset' || !payload.sub) {
      throw new BadRequestException('Reset token is invalid');
    }
    const user = await this.repo(Users).findOne({ where: { id: payload.sub } });
    if (!user) throw new NotFoundException('User not found');
    const hash = await bcrypt.hash(String(password), 10);
    await this.repo(Users).update({ id: user.id }, { passwordHash: hash });
    return { reset: true };
  }

  async childrenForLogin(familyCode?: string) {
    const where: Record<string, unknown> = { status: account_status.ACTIVE };
    if (familyCode) {
      const parent = await this.repo(Users).findOne({ where: { familyCode } });
      if (!parent) return { children: [] };
      const family = await this.familyForUser(parent.id);
      if (!family) return { children: [] };
      where.familyId = family.id;
    }
    const students = await this.repo(Students).find({ where, order: { name: 'ASC' } });
    return {
      children: students.map((s) => ({
        id: s.id,
        displayName: s.name,
        nameBn: s.nameBn,
        classNo: s.classNo,
        avatar: s.avatar,
        status: s.status,
      })),
    };
  }

  // ───────────────────────── curriculum ─────────────────────────

  async subjectsFor(classNo?: number) {
    const where: Record<string, unknown> = {};
    if (classNo) where.classNo = classNo;
    const subjects = await this.repo(Subjects).find({ where, order: { classNo: 'ASC', name: 'ASC' } });
    return { items: subjects, total: subjects.length };
  }

  async chaptersFor(classNo?: number, subjectSlug?: string) {
    const where: Record<string, unknown> = { status: content_status.PUBLISHED };
    if (classNo) where.classNo = classNo;
    if (subjectSlug) {
      // Slugs repeat across classes (class 1–5 all have `bangla`), so the class
      // must be part of the lookup or class 4 asks for class 1's chapters.
      const subject = await this.repo(Subjects).findOne({
        where: classNo ? { slug: subjectSlug, classNo } : { slug: subjectSlug },
      });
      if (!subject) throw new NotFoundException('Subject not found');
      where.subjectId = subject.id;
    }
    const chapters = await this.repo(Chapters).find({ where, order: { sortOrder: 'ASC', name: 'ASC' } });
    return { items: chapters, total: chapters.length };
  }

  async chapterBySlug(slug: string, studentId?: string) {
    const chapter = await this.repo(Chapters).findOne({ where: { slug } });
    if (!chapter) throw new NotFoundException('Chapter not found');
    const contents = await this.repo(LearningContent).find({ where: { chapterId: chapter.id } });
    let progress: LessonProgress[] = [];
    if (studentId) {
      progress = await this.repo(LessonProgress).find({ where: { studentId } });
    }
    return {
      chapter,
      contents: contents.map((c) => ({
        ...c,
        progress: progress.find((p) => p.contentId === c.id) ?? null,
      })),
    };
  }

  async startLesson(studentId: string, slug: string) {
    const chapter = await this.repo(Chapters).findOne({ where: { slug } });
    if (!chapter) throw new NotFoundException('Chapter not found');
    const content = await this.repo(LearningContent).findOne({
      where: { chapterId: chapter.id },
      order: { createdAt: 'ASC' },
    });
    if (!content) throw new NotFoundException('No lesson content for this chapter');
    let progress = await this.repo(LessonProgress).findOne({
      where: { studentId, contentId: content.id },
    });
    if (!progress) {
      progress = await this.repo(LessonProgress).save(
        this.repo(LessonProgress).create({
          studentId,
          contentId: content.id,
          watchedPct: 0,
          completed: false,
        } as DeepPartial<LessonProgress>),
      );
    }
    return { chapter, content, progress };
  }

  async saveLessonProgress(
    studentId: string,
    slug: string,
    body: { contentId?: string; watchedPct?: number; completed?: boolean },
  ) {
    const chapter = await this.repo(Chapters).findOne({ where: { slug } });
    if (!chapter) throw new NotFoundException('Chapter not found');
    let contentId = body.contentId;
    if (!contentId) {
      const first = await this.repo(LearningContent).findOne({
        where: { chapterId: chapter.id },
        order: { createdAt: 'ASC' },
      });
      if (!first) throw new NotFoundException('No lesson content for this chapter');
      contentId = first.id;
    }
    if (body.watchedPct !== undefined && (body.watchedPct < 0 || body.watchedPct > 100)) {
      throw new BadRequestException('watchedPct must be between 0 and 100');
    }
    let progress = await this.repo(LessonProgress).findOne({ where: { studentId, contentId } });
    if (!progress) {
      progress = this.repo(LessonProgress).create({
        studentId,
        contentId,
        watchedPct: 0,
        completed: false,
      } as DeepPartial<LessonProgress>);
    }
    if (body.watchedPct !== undefined) progress.watchedPct = body.watchedPct;
    if (body.completed !== undefined) progress.completed = body.completed;
    if (progress.watchedPct >= 100) progress.completed = true;
    const saved = await this.repo(LessonProgress).save(progress);
    if (saved.completed) {
      await this.awardPoints(studentId, 10, 'lesson_completed');
    }
    return saved;
  }

  async studentHome(user: AuthUser) {
    const student = await this.currentStudent(user);
    const family = await this.repo(Families).findOne({ where: { id: student.familyId } });
    const subscription = await this.latestSubscription(student.familyId);
    const points = await this.sumPoints(student.id);
    const rank = await this.rankOf(student.id);
    const ledger = await this.screenLedger(student.id);
    const subjects = await this.repo(Subjects).find({
      where: { classNo: student.classNo },
      order: { name: 'ASC' },
    });
    const progressRows = await this.repo(LessonProgress).find({ where: { studentId: student.id } });
    const subjectCards = await Promise.all(
      subjects.map(async (s) => {
        const chapters = await this.repo(Chapters).find({ where: { subjectId: s.id } });
        const chapterIds = chapters.map((c) => c.id);
        const contents =
          chapterIds.length === 0
            ? []
            : await this.repo(LearningContent).find({ where: { chapterId: In(chapterIds) } });
        const done = contents.filter((c) => progressRows.some((p) => p.contentId === c.id && p.completed)).length;
        return {
          id: s.id,
          name: s.name,
          nameBn: s.nameBn,
          slug: s.slug,
          chapters: chapters.length,
          completed: done,
          progress: contents.length === 0 ? 0 : Math.round((done / contents.length) * 100),
        };
      }),
    );
    const remedial = await this.repo(RemedialAssignments).find({
      where: { studentId: student.id, status: remedial_status.ASSIGNED },
      order: { assignedAt: 'DESC' },
      take: 5,
    });
    const exams = await this.repo(TermExams).find({
      where: { classNo: student.classNo },
      order: { startDate: 'ASC' },
      take: 5,
    });
    const streak = await this.streakDays(student.id);
    return {
      student: {
        id: student.id,
        displayName: student.name,
        nameBn: student.nameBn,
        classNo: student.classNo,
        avatar: student.avatar,
        familyId: student.familyId,
        familyCode: family ? (await this.repo(Users).findOne({ where: { id: family.parentUserId } }))?.familyCode : undefined,
      },
      points,
      rank,
      streakDays: streak,
      screenTime: {
        usedMin: ledger.minutes,
        limitMin: ledger.limitMinutes,
        remainingMin: Math.max(0, ledger.limitMinutes - ledger.minutes),
      },
      subscription: subscription
        ? {
            id: subscription.id,
            subscriptionNo: subscription.subscriptionNo,
            plan: subscription.plan,
            status: subscription.status,
            entitlementUntil: subscription.entitlementUntil,
          }
        : null,
      subjects: subjectCards,
      pendingTasks: [
        ...remedial.map((r) => ({ type: 'retake', id: r.id, title: r.caseNo ?? 'রিটেক ক্লাস' })),
        ...exams.map((e) => ({ type: 'exam', id: e.id, title: e.nameBn })),
      ],
    };
  }

  async studentSettings(user: AuthUser) {
    const student = await this.currentStudent(user);
    return {
      studentId: student.id,
      displayName: student.name,
      nameBn: student.nameBn,
      classNo: student.classNo,
      avatar: student.avatar,
      locale: 'bn',
      voiceMuted: false,
    };
  }

  async updateStudentSettings(user: AuthUser, body: { locale?: string; voiceMuted?: boolean }) {
    const student = await this.currentStudent(user);
    // locale / voice preference are client-side in the MVP; echo the accepted values so the
    // write is honest rather than a silent no-op.
    return {
      studentId: student.id,
      locale: body.locale === 'en' ? 'en' : 'bn',
      voiceMuted: Boolean(body.voiceMuted),
    };
  }

  // ───────────────────────── quiz ─────────────────────────

  async startQuiz(user: AuthUser, body: { studentId?: string; chapterId?: string; count?: number }) {
    const student = body.studentId
      ? await this.requireStudentAccess(user, body.studentId)
      : await this.currentStudent(user);
    const take = Math.min(Math.max(Number(body.count) || 5, 1), 20);
    const where: Record<string, unknown> = {};
    if (body.chapterId) where.chapterId = body.chapterId;
    else {
      const chapters = await this.repo(Chapters).find({ where: { classNo: student.classNo } });
      if (chapters.length) where.chapterId = In(chapters.map((c) => c.id));
    }
    const questions = await this.repo(Questions).find({ where, take });
    if (questions.length === 0) throw new NotFoundException('No questions available for this quiz');
    // `lesson_id` is a FK to learning_content, not to chapters. Resolve the chapter's
    // first lesson; passing the chapter id violated the constraint and 400'd every quiz.
    let lessonId: string | undefined;
    if (body.chapterId) {
      const first = await this.repo(LearningContent).findOne({
        where: { chapterId: body.chapterId },
        order: { createdAt: 'ASC' },
      });
      lessonId = first?.id;
    }
    const session = await this.repo(QuizSessions).save(
      this.repo(QuizSessions).create({
        studentId: student.id,
        lessonId,
        status: quiz_status.IN_PROGRESS,
        startedAt: new Date(),
      } as DeepPartial<QuizSessions>),
    );
    return {
      session,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        textBn: q.textBn,
        options: q.options,
        difficulty: q.difficulty,
      })),
    };
  }

  async answerQuiz(user: AuthUser, sessionId: string, body: { questionId: string; selectedOption: number }) {
    const student = await this.currentStudent(user);
    const session = await this.repo(QuizSessions).findOne({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Quiz session not found');
    if (session.studentId !== student.id) throw new ForbiddenException('This quiz belongs to another student');
    if (session.status === quiz_status.COMPLETED) throw new BadRequestException('Quiz session already completed');
    const question = await this.repo(Questions).findOne({ where: { id: body.questionId } });
    if (!question) throw new NotFoundException('Question not found');
    const selected = Number(body.selectedOption);
    if (Number.isNaN(selected)) throw new BadRequestException('selectedOption must be a number');
    const isCorrect = selected === question.correctOption;
    const answer = await this.repo(QuizAnswers).save(
      this.repo(QuizAnswers).create({
        quizSessionId: session.id,
        questionId: question.id,
        topicTagId: question.topicTagId,
        isCorrect,
        answeredAt: new Date(),
      } as DeepPartial<QuizAnswers>),
    );
    return { answerId: answer.id, isCorrect, correctOption: question.correctOption };
  }

  async completeQuiz(user: AuthUser, sessionId: string) {
    const student = await this.currentStudent(user);
    const session = await this.repo(QuizSessions).findOne({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Quiz session not found');
    if (session.studentId !== student.id) throw new ForbiddenException('This quiz belongs to another student');
    const answers = await this.repo(QuizAnswers).find({ where: { quizSessionId: session.id } });
    const correct = answers.filter((a) => a.isCorrect).length;
    const total = answers.length;
    const score = total === 0 ? 0 : Math.round((correct / total) * 100);
    session.status = quiz_status.COMPLETED;
    session.completedAt = new Date();
    session.score = score;
    await this.repo(QuizSessions).save(session);
    const awarded = correct * 10;
    if (awarded > 0) await this.awardPoints(student.id, awarded, 'quiz_completed');
    const passed = score >= 60;
    // A failing quiz is routed to a retake class, per the PRD's weakness loop.
    if (!passed && total > 0) {
      const lesson = session.lessonId
        ? await this.repo(LearningContent).findOne({ where: { id: session.lessonId } })
        : null;
      await this.assignRemedial(student, lesson?.chapterId);
    }
    return {
      sessionId: session.id,
      score,
      correct,
      total,
      passed,
      verdict: passed ? 'PASSED' : 'FAILED',
      pointsAwarded: awarded,
    };
  }

  async getQuiz(user: AuthUser, sessionId: string) {
    const student = await this.currentStudent(user);
    const session = await this.repo(QuizSessions).findOne({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Quiz session not found');
    if (session.studentId !== student.id) throw new ForbiddenException('This quiz belongs to another student');
    const answers = await this.repo(QuizAnswers).find({ where: { quizSessionId: session.id } });
    return { session, answers };
  }

  // ───────────────────────── exams ─────────────────────────

  async listExams(user: AuthUser) {
    const student = await this.currentStudent(user);
    const exams = await this.repo(TermExams).find({
      where: { classNo: student.classNo },
      order: { startDate: 'DESC' },
    });
    const attempts = await this.repo(ExamAttempts).find({ where: { studentId: student.id } });
    return {
      items: exams.map((e) => ({
        ...e,
        attempts: attempts.filter((a) => a.termExamId === e.id),
      })),
      total: exams.length,
    };
  }

  async getExam(user: AuthUser, examRef: string) {
    const student = await this.currentStudent(user);
    const exam = await this.resolveExam(examRef);
    if (!exam) throw new NotFoundException('Exam not found');
    const chapters = await this.repo(Chapters).find({ where: { classNo: exam.classNo } });
    const questions = await this.repo(Questions).find({
      where: { chapterId: In(chapters.map((c) => c.id)) },
      take: 10,
    });
    return {
      exam,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        textBn: q.textBn,
        options: q.options,
        difficulty: q.difficulty,
      })),
      studentId: student.id,
    };
  }

  async startAttempt(user: AuthUser, examRef: string) {
    const student = await this.currentStudent(user);
    const exam = await this.resolveExam(examRef);
    if (!exam) throw new NotFoundException('Exam not found');
    if (exam.classNo !== student.classNo) throw new ForbiddenException('Exam is for another class');
    const now = new Date();
    if (now < exam.startDate || now > exam.endDate) {
      throw new BadRequestException('Exam window is closed');
    }
    const open = await this.repo(ExamAttempts).findOne({
      where: { termExamId: exam.id, studentId: student.id, status: attempt_status.IN_PROGRESS },
    });
    if (open) return open;
    const previous = await this.repo(ExamAttempts).count({ where: { termExamId: exam.id, studentId: student.id } });
    const attempt = await this.repo(ExamAttempts).save(
      this.repo(ExamAttempts).create({
        attemptNo: displayNo('SB-EXM', previous + 1),
        termExamId: exam.id,
        studentId: student.id,
        status: attempt_status.IN_PROGRESS,
        startedAt: now,
      } as DeepPartial<ExamAttempts>),
    );
    return attempt;
  }

  async submitAttempt(
    user: AuthUser,
    examRef: string,
    attemptRef: string,
    body: { answers?: Array<{ questionId: string; selectedOption: number }> },
  ) {
    const student = await this.currentStudent(user);
    const exam = await this.resolveExam(examRef);
    if (!exam) throw new NotFoundException('Exam not found');
    const attempt = await this.resolveAttempt(attemptRef);
    if (!attempt) throw new NotFoundException('Attempt not found');
    if (attempt.studentId !== student.id || attempt.termExamId !== exam.id) {
      throw new ForbiddenException('Attempt does not belong to this student/exam');
    }
    if (attempt.status !== attempt_status.IN_PROGRESS) {
      throw new BadRequestException('Attempt is already submitted');
    }
    const answers = Array.isArray(body.answers) ? body.answers : [];
    let correct = 0;
    for (const a of answers) {
      const question = await this.repo(Questions).findOne({ where: { id: a.questionId } });
      if (!question) continue;
      const isCorrect = Number(a.selectedOption) === question.correctOption;
      if (isCorrect) correct += 1;
      await this.repo(ExamAnswers).save(
        this.repo(ExamAnswers).create({
          examAttemptId: attempt.id,
          questionId: question.id,
          isCorrect,
          answeredAt: new Date(),
        } as DeepPartial<ExamAnswers>),
      );
    }
    const total = answers.length;
    const score = total === 0 ? 0 : Math.round((correct / total) * 100);
    const passed = score >= exam.passThreshold;
    attempt.score = score;
    attempt.submittedAt = new Date();
    attempt.status = passed ? attempt_status.PASSED : attempt_status.FAILED;
    await this.repo(ExamAttempts).save(attempt);
    if (passed) {
      await this.awardPoints(student.id, score, 'exam_passed');
    } else {
      await this.assignRemedial(student, undefined);
    }
    return {
      attemptId: attempt.id,
      attemptNo: attempt.attemptNo,
      score,
      correct,
      total,
      passed,
      verdict: passed ? 'PASSED' : 'FAILED',
      passThreshold: exam.passThreshold,
    };
  }

  async getAttempt(user: AuthUser, examRef: string, attemptRef: string) {
    const student = await this.currentStudent(user);
    const exam = await this.resolveExam(examRef);
    if (!exam) throw new NotFoundException('Exam not found');
    const attempt = await this.resolveAttempt(attemptRef);
    if (!attempt) throw new NotFoundException('Attempt not found');
    if (attempt.studentId !== student.id) throw new ForbiddenException('Attempt belongs to another student');
    const answers = await this.repo(ExamAnswers).find({ where: { examAttemptId: attempt.id } });
    return { exam, attempt, answers };
  }

  // ───────────────────────── remedial ─────────────────────────

  async assignRemedial(student: Students, chapterId?: string): Promise<RemedialAssignments> {
    const existing = await this.repo(RemedialAssignments).findOne({
      where: { studentId: student.id, status: remedial_status.ASSIGNED },
    });
    if (existing) return existing;
    const seq = await this.nextSeq(RemedialAssignments);
    return this.repo(RemedialAssignments).save(
      this.repo(RemedialAssignments).create({
        caseNo: displayNo('SB-RMD', seq),
        studentId: student.id,
        chapterId: chapterId ?? undefined,
        status: remedial_status.ASSIGNED,
        assignedAt: new Date(),
      } as DeepPartial<RemedialAssignments>),
    );
  }

  async startRemedial(user: AuthUser, body: { chapterId?: string }) {
    const student = await this.currentStudent(user);
    return this.assignRemedial(student, body.chapterId);
  }

  async getRemedial(user: AuthUser, ref: string) {
    const student = await this.currentStudent(user);
    const assignment = await this.resolveRemedial(ref);
    if (!assignment) throw new NotFoundException('Remedial assignment not found');
    if (assignment.studentId !== student.id) throw new ForbiddenException('Assignment belongs to another student');
    const chapter = assignment.chapterId
      ? await this.repo(Chapters).findOne({ where: { id: assignment.chapterId } })
      : null;
    const contents = chapter
      ? await this.repo(LearningContent).find({ where: { chapterId: chapter.id } })
      : [];
    return { assignment, chapter, contents };
  }

  async completeRemedial(user: AuthUser, ref: string) {
    const student = await this.currentStudent(user);
    const assignment = await this.resolveRemedial(ref);
    if (!assignment) throw new NotFoundException('Remedial assignment not found');
    if (assignment.studentId !== student.id) throw new ForbiddenException('Assignment belongs to another student');
    assignment.status = remedial_status.COMPLETED;
    assignment.completedAt = new Date();
    await this.repo(RemedialAssignments).save(assignment);
    await this.awardPoints(student.id, 20, 'remedial_completed');
    return assignment;
  }

  // ───────────────────────── parent proxy ─────────────────────────

  async parentDashboard(user: AuthUser) {
    const family = await this.requireFamily(user.id);
    const children = await this.repo(Students).find({ where: { familyId: family.id }, order: { name: 'ASC' } });
    const subscription = await this.latestSubscription(family.id);
    const cards = await Promise.all(
      children.map(async (child) => {
        const points = await this.sumPoints(child.id);
        const ledger = await this.screenLedger(child.id);
        const progress = await this.progressFor(child);
        return {
          id: child.id,
          displayName: child.name,
          nameBn: child.nameBn,
          classNo: child.classNo,
          avatar: child.avatar,
          status: child.status,
          points,
          streakDays: await this.streakDays(child.id),
          screenTime: {
            usedMin: ledger.minutes,
            limitMin: ledger.limitMinutes,
            remainingMin: Math.max(0, ledger.limitMinutes - ledger.minutes),
          },
          progress,
        };
      }),
    );
    const alerts = await this.repo(Notifications).find({
      where: { recipientUserId: user.id },
      order: { createdAt: 'DESC' },
      take: 10,
    });
    return {
      parent: { id: user.id, email: user.email, familyId: family.id },
      children: cards,
      subscription: subscription
        ? {
            id: subscription.id,
            subscriptionNo: subscription.subscriptionNo,
            plan: subscription.plan,
            status: subscription.status,
            entitlementUntil: subscription.entitlementUntil,
          }
        : null,
      alerts,
    };
  }

  async progressFor(student: Students) {
    const subjects = await this.repo(Subjects).find({ where: { classNo: student.classNo } });
    const progressRows = await this.repo(LessonProgress).find({ where: { studentId: student.id } });
    const rows = await Promise.all(
      subjects.map(async (s) => {
        const chapters = await this.repo(Chapters).find({ where: { subjectId: s.id } });
        const contents =
          chapters.length === 0
            ? []
            : await this.repo(LearningContent).find({ where: { chapterId: In(chapters.map((c) => c.id)) } });
        const done = contents.filter((c) => progressRows.some((p) => p.contentId === c.id && p.completed)).length;
        return {
          subjectId: s.id,
          name: s.name,
          nameBn: s.nameBn,
          progress: contents.length === 0 ? 0 : Math.round((done / contents.length) * 100),
        };
      }),
    );
    const overall = rows.length === 0 ? 0 : Math.round(rows.reduce((sum, r) => sum + r.progress, 0) / rows.length);
    return { overall, subjects: rows };
  }

  async parentProgress(user: AuthUser, studentRef: string) {
    const student = await this.requireStudentAccess(user, studentRef);
    return this.progressFor(student);
  }

  async forecast(user: AuthUser, studentRef: string) {
    const student = await this.requireStudentAccess(user, studentRef);
    const attempts = await this.repo(ExamAttempts).find({ where: { studentId: student.id } });
    const quizzes = await this.repo(QuizSessions).find({ where: { studentId: student.id } });
    const completed = quizzes.filter((q) => q.status === quiz_status.COMPLETED);
    const quizAvg =
      completed.length === 0
        ? 0
        : Math.round(completed.reduce((sum, q) => sum + (q.score ?? 0), 0) / completed.length);
    const examAvg =
      attempts.length === 0
        ? 0
        : Math.round(attempts.reduce((sum, a) => sum + (a.score ?? 0), 0) / attempts.length);
    const base = Math.round(quizAvg * 0.4 + examAvg * 0.6);
    const band = base >= 70 ? 'HIGH' : base >= 45 ? 'MEDIUM' : 'LOW';
    return {
      studentId: student.id,
      forecast: band,
      passProbability: base,
      basis: { quizAverage: quizAvg, examAverage: examAvg, attempts: attempts.length },
      aiFallback: true,
    };
  }

  async screenTimeFor(user: AuthUser, studentRef: string) {
    const student = await this.requireStudentAccess(user, studentRef);
    return this.screenLedger(student.id);
  }

  async setScreenTime(user: AuthUser, studentRef: string, limitMinutes: number) {
    const student = await this.requireStudentAccess(user, studentRef);
    if (!Number.isFinite(limitMinutes) || limitMinutes < 0 || limitMinutes > 600) {
      throw new BadRequestException('limitMinutes must be between 0 and 600');
    }
    const ledger = await this.screenLedger(student.id);
    ledger.limitMinutes = Math.round(limitMinutes);
    await this.repo(ScreenTimeLedger).save(ledger);
    return ledger;
  }

  async extendScreenTime(user: AuthUser, studentRef: string, minutes: number) {
    const student = await this.requireStudentAccess(user, studentRef);
    if (!Number.isFinite(minutes) || minutes <= 0 || minutes > 180) {
      throw new BadRequestException('minutes must be between 1 and 180');
    }
    const ledger = await this.screenLedger(student.id);
    ledger.limitMinutes += Math.round(minutes);
    await this.repo(ScreenTimeLedger).save(ledger);
    return ledger;
  }

  async sendNudge(
    user: AuthUser,
    studentRef: string,
    message?: string,
    messageBn?: string,
  ): Promise<Nudges> {
    const student = await this.requireStudentAccess(user, studentRef);
    const row = await this.repo(Nudges).save(
      this.repo(Nudges).create({
        studentId: student.id,
        message: message || 'Time to practise',
        messageBn: messageBn || 'এখন অনুশীলন করার সময়',
        sentAt: new Date(),
        read: false,
      } as DeepPartial<Nudges>),
    );
    const family = await this.repo(Families).findOne({ where: { id: student.familyId } });
    if (family) {
      await this.repo(Notifications).save(
        this.repo(Notifications).create({
          recipientUserId: family.parentUserId,
          category: notification_category.NUDGE,
          title: 'Nudge sent',
          titleBn: 'তাগাদা পাঠানো হয়েছে',
          body: `A nudge was sent to ${student.name}.`,
          bodyBn: `${student.name}-কে একটি তাগাদা পাঠানো হয়েছে।`,
          read: false,
        } as DeepPartial<Notifications>),
      );
    }
    return row;
  }

  async parentSubscription(user: AuthUser) {
    const family = await this.requireFamily(user.id);
    const subscription = await this.latestSubscription(family.id);
    const payments = await this.repo(Payments).find({ order: { createdAt: 'DESC' }, take: 20 });
    return {
      subscription,
      payments: payments.filter((p) => !subscription || p.subscriptionId === subscription.id),
      plans: Object.entries(PLAN_PRICES).map(([plan, v]) => ({ plan, amountPoisha: v.poisha, days: v.days })),
    };
  }

  async parentSettings(user: AuthUser) {
    const userRow = await this.repo(Users).findOne({ where: { id: user.id } });
    if (!userRow) throw new NotFoundException('User not found');
    return {
      id: userRow.id,
      email: userRow.email,
      familyCode: userRow.familyCode,
      hasParentPin: Boolean(userRow.parentPinHash),
    };
  }

  async updateParentSettings(
    user: AuthUser,
    body: { parentPin?: string; email?: string },
  ) {
    if (body.parentPin) await this.setParentPin(user.id, body.parentPin);
    if (body.email && body.email !== user.email) {
      const exists = await this.repo(Users).findOne({ where: { email: body.email } });
      if (exists) throw new ConflictException('Email already in use');
      await this.repo(Users).update({ id: user.id }, { email: body.email });
    }
    return this.parentSettings(user);
  }

  async onboarding(user: AuthUser) {
    const family = await this.requireFamily(user.id);
    const children = await this.repo(Students).find({ where: { familyId: family.id } });
    return {
      familyId: family.id,
      childrenCount: children.length,
      maxChildren: 3,
      completed: children.length > 0,
      children,
    };
  }

  // ───────────────────────── gamification ─────────────────────────

  async leaderboard(user: AuthUser) {
    const students = await this.repo(Students).find();
    const points = await this.repo(PointsLedger).find();
    const rows = students
      .map((s) => ({
        studentId: s.id,
        displayName: s.name,
        nameBn: s.nameBn,
        classNo: s.classNo,
        points: points.filter((p) => p.studentId === s.id).reduce((sum, p) => sum + p.points, 0),
      }))
      .sort((a, b) => b.points - a.points)
      .map((r, i) => ({ ...r, rank: i + 1, isCurrent: user.role === 'student' && user.id === r.studentId }));
    return { items: rows, total: rows.length };
  }

  async rewards(user: AuthUser) {
    const badges = await this.repo(Badges).find();
    let earned: StudentBadges[] = [];
    if (user.role === 'student') {
      earned = await this.repo(StudentBadges).find({ where: { studentId: user.id } });
    }
    return {
      items: badges.map((b) => ({
        ...b,
        earned: earned.some((e) => e.badgeId === b.id),
      })),
      total: badges.length,
    };
  }

  // ───────────────────────── usage / i18n ─────────────────────────

  async heartbeat(user: AuthUser, minutes: number) {
    const student = await this.currentStudent(user);
    const amount = Math.max(0, Math.min(Number(minutes) || 1, 60));
    await this.repo(UsageHeartbeat).save(
      this.repo(UsageHeartbeat).create({
        studentId: student.id,
        timestamp: new Date(),
        minutes: Math.round(amount),
      } as DeepPartial<UsageHeartbeat>),
    );
    const ledger = await this.screenLedger(student.id);
    ledger.minutes += Math.round(amount);
    await this.repo(ScreenTimeLedger).save(ledger);
    return {
      studentId: student.id,
      minutes: ledger.minutes,
      limitMinutes: ledger.limitMinutes,
      remainingMinutes: Math.max(0, ledger.limitMinutes - ledger.minutes),
      exhausted: ledger.minutes >= ledger.limitMinutes,
    };
  }

  async i18nCatalog() {
    return {
      locale: 'bn-BD',
      strings: {
        home: 'হোম',
        learn: 'শেখো',
        exams: 'পরীক্ষা',
        rewards: 'পুরস্কার',
        settings: 'সেটিংস',
        next: 'পরবর্তী',
        back: 'পিছনে',
        retry: 'আবার চেষ্টা করো',
        loading: 'লোড হচ্ছে…',
        error: 'কিছু একটা ভুল হয়েছে।',
      },
    };
  }

  async voiceCatalog() {
    const assets = await this.repo(VoAssets).find();
    return { locale: 'bn', items: assets, total: assets.length };
  }

  async createVoiceAsset(body: { assetKey: string; audioUrl: string; locale?: string }) {
    const locale = body.locale || 'bn';
    const existing = await this.repo(VoAssets).findOne({
      where: { assetKey: body.assetKey, locale },
    });
    if (existing) {
      existing.audioUrl = body.audioUrl;
      return this.repo(VoAssets).save(existing);
    }
    return this.repo(VoAssets).save(
      this.repo(VoAssets).create({
        assetKey: body.assetKey,
        audioUrl: body.audioUrl,
        locale,
      } as DeepPartial<VoAssets>),
    );
  }

  // ───────────────────────── payments ─────────────────────────

  async createIntent(user: AuthUser, planKey: string) {
    if (user.role !== 'parent') throw new ForbiddenException('Only parents can start a subscription');
    const plan = String(planKey || '').toUpperCase();
    const price = PLAN_PRICES[plan];
    if (!price) throw new BadRequestException('Unknown plan');
    const family = await this.requireFamily(user.id);
    const seq = await this.nextSeq(Payments);
    const paymentNo = displayNo('SB-PAY', seq);
    const intentId = displayNo('SB-INT', seq);
    const payment = await this.repo(Payments).save(
      this.repo(Payments).create({
        paymentNo,
        intentId,
        amountPoisha: price.poisha,
        currency: 'BDT',
        status: payment_status.PENDING,
        webhookConfirmed: false,
      } as DeepPartial<Payments>),
    );
    let gatewayUrl: string | null = null;
    if (process.env.SSLCOMMERZ_STORE_ID) {
      const session = await this.ssl.sessionStart({
        tranId: intentId,
        amountBdt: SslcommerzClient.poishaToBdt(price.poisha),
        cusName: user.email || 'SmartBidda Parent',
        cusEmail: user.email || 'parent@smartbidda.test',
        cusPhone: '01700000000',
        cusAddress: 'Dhaka',
        productName: plan === 'ANNUAL' ? 'Family annual' : 'Family monthly',
        productCategory: 'subscription',
        successUrl: `${process.env.APP_URL || 'http://localhost:5210'}/subscription?payment=${paymentNo}`,
        failUrl: `${process.env.APP_URL || 'http://localhost:5210'}/subscription?failed=${paymentNo}`,
        cancelUrl: `${process.env.APP_URL || 'http://localhost:5210'}/subscription?cancelled=${paymentNo}`,
      });
      if (session.status !== 'SUCCESS') {
        throw new BadRequestException(session.failedReason || 'Payment gateway rejected the request');
      }
      gatewayUrl = session.gatewayPageUrl ?? null;
    }
    return {
      paymentId: payment.id,
      paymentNo,
      intentId,
      plan,
      amountPoisha: price.poisha,
      currency: 'BDT',
      gatewayUrl,
      configured: Boolean(process.env.SSLCOMMERZ_STORE_ID),
      familyId: family.id,
    };
  }

  async paymentWebhook(body: Record<string, unknown>) {
    const valId = String(body.val_id ?? '');
    const tranId = String(body.tran_id ?? body.intentId ?? '');
    const status = String(body.status ?? '');
    if (!tranId) throw new BadRequestException('tran_id is required');
    const payment = await this.repo(Payments).findOne({ where: { intentId: tranId } });
    if (!payment) throw new NotFoundException('Payment intent not found');

    let valid = status === 'VALID' || status === 'SUCCESS';
    if (valId && process.env.SSLCOMMERZ_STORE_ID) {
      const check = await this.ssl.validate(valId);
      valid = check.status === 'VALID';
    }
    if (!valid) {
      payment.status = payment_status.FAILED;
      await this.repo(Payments).save(payment);
      return { received: true, activated: false };
    }

    payment.webhookConfirmed = true;
    payment.status = payment_status.COMPLETED;
    payment.valId = valId || undefined;
    payment.bankTranId = String(body.bank_tran_id ?? '') || undefined;
    await this.repo(Payments).save(payment);

    const family = await this.repo(Families).find({ order: { createdAt: 'ASC' }, take: 1 });
    const familyRow = family[0];
    if (!familyRow) return { received: true, activated: false };

    const plan = payment.amountPoisha >= 300000 ? subscription_plan.ANNUAL : subscription_plan.MONTHLY;
    const days = plan === subscription_plan.ANNUAL ? 365 : 30;
    const seq = await this.nextSeq(Subscriptions);
    const subscription = await this.repo(Subscriptions).save(
      this.repo(Subscriptions).create({
        subscriptionNo: displayNo('SB-SUB', seq),
        familyId: familyRow.id,
        plan,
        status: subscription_status.ACTIVE,
        entitlementUntil: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
      } as DeepPartial<Subscriptions>),
    );
    payment.subscriptionId = subscription.id;
    await this.repo(Payments).save(payment);
    return { received: true, activated: true, subscriptionId: subscription.id };
  }

  async refundSubscription(
    adminId: string,
    subscriptionRef: string,
  ): Promise<{ refunded: boolean; subscription: Subscriptions }> {
    const subscription = await this.resolveSubscription(subscriptionRef);
    if (!subscription) throw new NotFoundException('Subscription not found');
    const payment = await this.repo(Payments).findOne({
      where: { subscriptionId: subscription.id, status: payment_status.COMPLETED },
      order: { createdAt: 'DESC' },
    });
    if (payment && process.env.SSLCOMMERZ_STORE_ID) {
      const result = await this.ssl.refund({
        bankTranId: payment.bankTranId || payment.intentId || payment.paymentNo,
        valId: payment.valId || '',
        refundAmountBdt: SslcommerzClient.poishaToBdt(payment.amountPoisha),
        remarks: 'SmartBidda subscription refund',
      });
      if (result.status !== 'SUCCESS') {
        throw new BadRequestException('Gateway refund failed');
      }
    }
    if (payment) {
      payment.status = payment_status.REFUNDED;
      await this.repo(Payments).save(payment);
    }
    const cancelled = await this.subscriptionsService.cancelNow(subscription.id);
    await this.audit(adminId, 'refund', 'subscriptions', subscription.id);
    return { refunded: true, subscription: cancelled };
  }

  // ───────────────────────── content authoring ─────────────────────────

  async contentList() {
    const items = await this.repo(LearningContent).find({ order: { createdAt: 'DESC' } });
    return { items, total: items.length };
  }

  async contentGet(id: string) {
    const byAny = await this.findByAny(LearningContent, id);
    if (!byAny) throw new NotFoundException('Content not found');
    return byAny;
  }

  async contentCreate(body: DeepPartial<LearningContent>) {
    if (!body.title || !body.titleBn || !body.chapterId) {
      throw new BadRequestException('chapterId, title and titleBn are required');
    }
    return this.repo(LearningContent).save(this.repo(LearningContent).create(body));
  }

  async contentUpdate(id: string, body: DeepPartial<LearningContent>) {
    const row = await this.contentGet(id);
    Object.assign(row, body);
    return this.repo(LearningContent).save(row);
  }

  async contentDelete(id: string) {
    const row = await this.contentGet(id);
    await this.repo(LearningContent).softDelete(row.id);
    return { deleted: true };
  }

  // ───────────────────────── admin reads ─────────────────────────

  async adminDashboard() {
    const [users, students, parents, teachers, subscriptions, payments, remedial, exams] = await Promise.all([
      this.repo(Users).count(),
      this.repo(Students).count(),
      this.repo(Users).count({ where: { role: 'parent' } }),
      this.repo(Users).count({ where: { role: 'teacher' } }),
      this.repo(Subscriptions).count({ where: { status: subscription_status.ACTIVE } }),
      this.repo(Payments).find({ where: { status: payment_status.COMPLETED } }),
      this.repo(RemedialAssignments).count({ where: { status: remedial_status.ASSIGNED } }),
      this.repo(TermExams).count(),
    ]);
    return {
      users,
      students,
      parents,
      teachers,
      activeSubscriptions: subscriptions,
      revenuePoisha: payments.reduce((sum, p) => sum + Number(p.amountPoisha), 0),
      pendingRemedial: remedial,
      termExams: exams,
    };
  }

  async adminStudents() {
    const students = await this.repo(Students).find({ order: { name: 'ASC' } });
    const families = await this.repo(Families).find();
    return {
      items: students.map((s) => ({
        ...s,
        family: families.find((f) => f.id === s.familyId) ?? null,
      })),
      total: students.length,
    };
  }

  async adminCreateStudent(body: {
    familyId?: string;
    name?: string;
    nameBn?: string;
    classNo?: number;
    avatar?: string;
    kidPin?: string;
    status?: string;
  }): Promise<Students> {
    if (!body.familyId || !body.name || !body.classNo) {
      throw new BadRequestException('familyId, name and classNo are required');
    }
    const family = await this.repo(Families).findOne({ where: { id: body.familyId } });
    if (!family) throw new NotFoundException('Family not found');
    const count = await this.repo(Students).count({ where: { familyId: family.id } });
    if (count >= 3) throw new BadRequestException('A family can have at most 3 children');
    const pinHash = await bcrypt.hash(String(body.kidPin || '0000'), 10);
    return this.repo(Students).save(
      this.repo(Students).create({
        familyId: family.id,
        name: body.name,
        nameBn: body.nameBn,
        avatar: body.avatar,
        classNo: Number(body.classNo),
        pinHash,
        status: (body.status as account_status) || account_status.ACTIVE,
      } as DeepPartial<Students>),
    );
  }

  async adminDeleteStudent(idRef: string) {
    const student = await this.resolveStudent(idRef);
    if (!student) throw new NotFoundException('Student not found');
    await this.repo(Students).softDelete(student.id);
    return { deleted: true };
  }

  async adminSetStudentStatus(idRef: string, status: string) {
    const student = await this.resolveStudent(idRef);
    if (!student) throw new NotFoundException('Student not found');
    const allowed = Object.values(account_status) as string[];
    if (!allowed.includes(status)) throw new BadRequestException('Invalid account status');
    student.status = status as account_status;
    return this.repo(Students).save(student);
  }

  async adminParents() {
    const parents = await this.repo(Users).find({ where: { role: 'parent' } });
    const families = await this.repo(Families).find();
    const students = await this.repo(Students).find();
    return {
      items: parents.map((p) => {
        const family = families.find((f) => f.parentUserId === p.id);
        return {
          id: p.id,
          email: p.email,
          familyCode: p.familyCode,
          familyId: family?.id,
          children: family ? students.filter((s) => s.familyId === family.id).length : 0,
          status: p.status,
        };
      }),
      total: parents.length,
    };
  }

  async adminTeachers() {
    const teachers = await this.repo(Users).find({ where: { role: 'teacher' } });
    return {
      items: teachers.map((t) => ({
        id: t.id,
        email: t.email,
        role: t.role,
        status: t.status,
        familyCode: t.familyCode,
        createdAt: t.createdAt,
      })),
      total: teachers.length,
    };
  }

  async adminCreateTeacher(body: { email?: string; password?: string }) {
    if (!body.email || !body.password) throw new BadRequestException('email and password are required');
    const existing = await this.repo(Users).findOne({ where: { email: body.email } });
    if (existing) throw new ConflictException('Email already registered');
    const hash = await bcrypt.hash(body.password, 10);
    return this.repo(Users).save(
      this.repo(Users).create({
        email: body.email,
        passwordHash: hash,
        role: 'teacher',
        status: account_status.ACTIVE,
        emailVerified: true,
      } as DeepPartial<Users>),
    );
  }

  async adminSubscriptions() {
    const items = await this.repo(Subscriptions).find({ order: { createdAt: 'DESC' } });
    const families = await this.repo(Families).find();
    const users = await this.repo(Users).find();
    return {
      items: items.map((s) => {
        const family = families.find((f) => f.id === s.familyId);
        const parent = family ? users.find((u) => u.id === family.parentUserId) : undefined;
        return { ...s, parent: parent ? { id: parent.id, email: parent.email, familyCode: parent.familyCode } : null };
      }),
      total: items.length,
    };
  }

  async adminPayments() {
    const items = await this.repo(Payments).find({ order: { createdAt: 'DESC' } });
    return { items, total: items.length };
  }

  async adminAuditLogs() {
    const items = await this.repo(AuditLogs).find({ order: { createdAt: 'DESC' }, take: 200 });
    return { items, total: items.length };
  }

  async adminNotifications() {
    const items = await this.repo(Notifications).find({ order: { createdAt: 'DESC' }, take: 200 });
    return { items, total: items.length };
  }

  // ───────────────────────── admin questions ─────────────────────────

  async adminQuestions() {
    const items = await this.repo(Questions).find({ order: { createdAt: 'DESC' } });
    return { items, total: items.length };
  }

  async adminQuestion(idRef: string) {
    const row = await this.findByAny(Questions, idRef);
    if (!row) throw new NotFoundException('Question not found');
    return row;
  }

  async adminCreateQuestion(body: DeepPartial<Questions>) {
    if (!body.text || !body.textBn || !body.options) {
      throw new BadRequestException('text, textBn and options are required');
    }
    return this.repo(Questions).save(this.repo(Questions).create(body));
  }

  async adminUpdateQuestion(idRef: string, body: DeepPartial<Questions>) {
    const row = await this.adminQuestion(idRef);
    Object.assign(row, body);
    return this.repo(Questions).save(row);
  }

  async adminDuplicateQuestion(idRef: string) {
    const row = await this.adminQuestion(idRef);
    return this.questionsService.duplicate(row.id);
  }

  async adminDeleteQuestion(idRef: string) {
    const row = await this.adminQuestion(idRef);
    await this.repo(Questions).softDelete(row.id);
    return { deleted: true };
  }

  // ───────────────────────── admin exams ─────────────────────────

  async adminExams() {
    const items = await this.repo(TermExams).find({ order: { startDate: 'DESC' } });
    return { items, total: items.length };
  }

  async adminCreateExam(body: DeepPartial<TermExams>) {
    if (!body.name || !body.nameBn || !body.classNo) {
      throw new BadRequestException('name, nameBn and classNo are required');
    }
    return this.repo(TermExams).save(this.repo(TermExams).create(body));
  }

  async adminUpdateExam(idRef: string, body: DeepPartial<TermExams>) {
    const exam = await this.resolveExam(idRef);
    if (!exam) throw new NotFoundException('Exam not found');
    Object.assign(exam, body);
    return this.repo(TermExams).save(exam);
  }

  async adminCloseExam(idRef: string) {
    const exam = await this.resolveExam(idRef);
    if (!exam) throw new NotFoundException('Exam not found');
    exam.endDate = new Date();
    return this.repo(TermExams).save(exam);
  }

  async adminRemedial() {
    const items = await this.repo(RemedialAssignments).find({ order: { assignedAt: 'DESC' } });
    const students = await this.repo(Students).find();
    return {
      items: items.map((r) => ({ ...r, student: students.find((s) => s.id === r.studentId) ?? null })),
      total: items.length,
    };
  }

  async adminUpdateRemedial(idRef: string, status: string) {
    const row = await this.resolveRemedial(idRef);
    if (!row) throw new NotFoundException('Remedial assignment not found');
    const allowed = Object.values(remedial_status) as string[];
    if (!allowed.includes(status)) throw new BadRequestException('Invalid remedial status');
    row.status = status as RemedialAssignments['status'];
    if (status === remedial_status.COMPLETED) row.completedAt = new Date();
    return this.repo(RemedialAssignments).save(row);
  }

  // ───────────────────────── admin curriculum ─────────────────────────

  async adminCurriculum() {
    const subjects = await this.repo(Subjects).find({ order: { classNo: 'ASC', name: 'ASC' } });
    const chapters = await this.repo(Chapters).find({ order: { sortOrder: 'ASC' } });
    return {
      items: subjects.map((s) => ({
        ...s,
        chapters: chapters.filter((c) => c.subjectId === s.id),
      })),
      total: subjects.length,
    };
  }

  async adminCreateCurriculum(body: { type?: string } & Record<string, unknown>) {
    if (body.type === 'subject') {
      const { type: _type, ...rest } = body;
      return this.repo(Subjects).save(this.repo(Subjects).create(rest as DeepPartial<Subjects>));
    }
    const { type: _type, ...rest } = body;
    if (!rest.chapterId && !rest.subjectId) {
      throw new BadRequestException('A curriculum item needs a subjectId (subject) or chapterId (lesson)');
    }
    return this.repo(Chapters).save(this.repo(Chapters).create(rest as DeepPartial<Chapters>));
  }

  async adminUpdateCurriculum(idRef: string, body: Record<string, unknown>) {
    const chapter = await this.findByAny(Chapters, idRef);
    if (chapter) {
      Object.assign(chapter, body);
      return this.repo(Chapters).save(chapter);
    }
    const subject = await this.findByAny(Subjects, idRef);
    if (!subject) throw new NotFoundException('Curriculum item not found');
    Object.assign(subject, body);
    return this.repo(Subjects).save(subject);
  }

  // ───────────────────────── small helpers ─────────────────────────

  async latestSubscription(familyId: string): Promise<Subscriptions | null> {
    const rows = await this.repo(Subscriptions).find({
      where: { familyId },
      order: { createdAt: 'DESC' },
      take: 1,
    });
    return rows[0] ?? null;
  }

  async sumPoints(studentId: string): Promise<number> {
    const rows = await this.repo(PointsLedger).find({ where: { studentId } });
    return rows.reduce((sum, r) => sum + r.points, 0);
  }

  async awardPoints(studentId: string, points: number, reason: string): Promise<void> {
    if (points <= 0) return;
    await this.repo(PointsLedger).save(
      this.repo(PointsLedger).create({ studentId, points: Math.round(points), reason } as DeepPartial<PointsLedger>),
    );
  }

  async rankOf(studentId: string): Promise<number> {
    const students = await this.repo(Students).find();
    const points = await this.repo(PointsLedger).find();
    const mine = points.filter((p) => p.studentId === studentId).reduce((sum, p) => sum + p.points, 0);
    const above = students.filter((s) => {
      if (s.id === studentId) return false;
      return points.filter((p) => p.studentId === s.id).reduce((sum, p) => sum + p.points, 0) > mine;
    }).length;
    return above + 1;
  }

  async streakDays(studentId: string): Promise<number> {
    const rows = await this.repo(UsageHeartbeat).find({ where: { studentId } });
    const days = new Set(rows.map((r) => dayKey(r.timestamp)));
    let streak = 0;
    const cursor = new Date();
    while (days.has(dayKey(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  async screenLedger(studentId: string): Promise<ScreenTimeLedger> {
    const today = new Date(`${dayKey()}T00:00:00.000Z`);
    const existing = await this.repo(ScreenTimeLedger).findOne({ where: { studentId, date: today } });
    if (existing) return existing;
    return this.repo(ScreenTimeLedger).save(
      this.repo(ScreenTimeLedger).create({
        studentId,
        date: today,
        minutes: 0,
        limitMinutes: 60,
      } as DeepPartial<ScreenTimeLedger>),
    );
  }
}
