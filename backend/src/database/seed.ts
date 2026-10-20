/**
 * seed.ts — deterministic development/demo seed for SmartBidda.
 *
 * Idempotent: re-running it never duplicates rows. It seeds the identities the
 * design fixtures reference (family SB-FAM-…, subscription SB-SUB-…, payment
 * SB-PAY-…), the NCTB-shaped Class 1–5 subject tree, Bangla lesson content,
 * questions, term exams, badges and one retake case, so the student, parent and
 * admin surfaces all have something real to render.
 *
 * Run: npm run seed
 */
import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from './data-source';

import { Users } from '../modules/users/users.entity';
import { Families } from '../modules/families/families.entity';
import { Students } from '../modules/students/students.entity';
import { Subjects } from '../modules/subjects/subjects.entity';
import { Chapters } from '../modules/chapters/chapters.entity';
import { LearningContent } from '../modules/learning-content/learning-content.entity';
import { LessonProgress } from '../modules/lesson-progress/lesson-progress.entity';
import { Questions } from '../modules/questions/questions.entity';
import { TermExams } from '../modules/term-exams/term-exams.entity';
import { Badges } from '../modules/badges/badges.entity';
import { StudentBadges } from '../modules/student-badges/student-badges.entity';
import { Subscriptions } from '../modules/subscriptions/subscriptions.entity';
import { Payments } from '../modules/payments/payments.entity';
import { ScreenTimeLedger } from '../modules/screen-time-ledger/screen-time-ledger.entity';
import { PointsLedger } from '../modules/points-ledger/points-ledger.entity';
import { UsageHeartbeat } from '../modules/usage-heartbeat/usage-heartbeat.entity';
import { RemedialAssignments } from '../modules/remedial-assignments/remedial-assignments.entity';
import { Notifications } from '../modules/notifications/notifications.entity';

import { account_status } from '../common/enums/account-status.enum';
import { content_kind } from '../common/enums/content-kind.enum';
import { content_status } from '../common/enums/content-status.enum';
import { difficulty } from '../common/enums/difficulty.enum';
import { payment_status } from '../common/enums/payment-status.enum';
import { remedial_status } from '../common/enums/remedial-status.enum';
import { subscription_plan } from '../common/enums/subscription-plan.enum';
import { subscription_status } from '../common/enums/subscription-status.enum';
import { notification_category } from '../common/enums/notification-category.enum';

const SUBJECTS = [
  { slug: 'bangla', name: 'Bangla', nameBn: 'বাংলা' },
  { slug: 'english', name: 'English', nameBn: 'ইংরেজি' },
  { slug: 'ganit', name: 'Mathematics', nameBn: 'গণিত' },
  { slug: 'bigyan', name: 'Science', nameBn: 'বিজ্ঞান' },
];

const CHAPTERS: Record<string, Array<{ slug: string; name: string; nameBn: string }>> = {
  bangla: [
    { slug: 'bornomala', name: 'Bornomala', nameBn: 'বর্ণমালা' },
    { slug: 'shobdo-gothon', name: 'Word Formation', nameBn: 'শব্দ গঠন' },
    { slug: 'poddya-porichoy', name: 'Poetry Introduction', nameBn: 'পদ্য পরিচয়' },
    { slug: 'golpo-porichoy', name: 'Story Introduction', nameBn: 'গল্প পরিচয়' },
  ],
  english: [
    { slug: 'alphabet', name: 'Alphabet', nameBn: 'বর্ণমালা' },
    { slug: 'parts-of-speech', name: 'Parts of Speech', nameBn: 'পদ প্রকরণ' },
    { slug: 'sentence', name: 'Sentence', nameBn: 'বাক্য' },
    { slug: 'comprehension', name: 'Comprehension', nameBn: 'অনুধাবন' },
  ],
  ganit: [
    { slug: 'sonkha', name: 'Numbers', nameBn: 'সংখ্যা' },
    { slug: 'bhagnangsho', name: 'Fractions', nameBn: 'ভগ্নাংশ' },
    { slug: 'jog-biyog', name: 'Addition and Subtraction', nameBn: 'যোগ ও বিয়োগ' },
    { slug: 'gun-bhag', name: 'Multiplication and Division', nameBn: 'গুণ ও ভাগ' },
  ],
  bigyan: [
    { slug: 'jib-jagot', name: 'Living World', nameBn: 'জীবজগৎ' },
    { slug: 'padartho', name: 'Matter', nameBn: 'পদার্থ' },
    { slug: 'shokti', name: 'Energy', nameBn: 'শক্তি' },
    { slug: 'poribesh', name: 'Environment', nameBn: 'পরিবেশ' },
  ],
};

function today(): Date {
  return new Date(`${new Date().toISOString().slice(0, 10)}T00:00:00.000Z`);
}

async function main(): Promise<void> {
  await AppDataSource.initialize();
  if (process.env.NODE_ENV !== 'production') {
    // Bring a dev database up to the entity definitions (the repo may be ahead of
    // the last generated migration while features are being built).
    await AppDataSource.synchronize();
  }

  const users = AppDataSource.getRepository(Users);
  const families = AppDataSource.getRepository(Families);
  const students = AppDataSource.getRepository(Students);
  const subjects = AppDataSource.getRepository(Subjects);
  const chapters = AppDataSource.getRepository(Chapters);
  const content = AppDataSource.getRepository(LearningContent);
  const progress = AppDataSource.getRepository(LessonProgress);
  const questions = AppDataSource.getRepository(Questions);
  const exams = AppDataSource.getRepository(TermExams);
  const badges = AppDataSource.getRepository(Badges);
  const studentBadges = AppDataSource.getRepository(StudentBadges);
  const subscriptions = AppDataSource.getRepository(Subscriptions);
  const payments = AppDataSource.getRepository(Payments);
  const screenTime = AppDataSource.getRepository(ScreenTimeLedger);
  const points = AppDataSource.getRepository(PointsLedger);
  const heartbeats = AppDataSource.getRepository(UsageHeartbeat);
  const remedial = AppDataSource.getRepository(RemedialAssignments);
  const notifications = AppDataSource.getRepository(Notifications);

  const passwordHash = (p: string) => bcrypt.hashSync(p, 10);
  const pinHash = (p: string) => bcrypt.hashSync(p, 10);

  // ── identities ──
  let admin = await users.findOne({ where: { email: 'admin@smartbidda.test' } });
  if (!admin) {
    admin = await users.save(
      users.create({
        email: 'admin@smartbidda.test',
        passwordHash: passwordHash('Admin1234'),
        role: 'admin',
        status: account_status.ACTIVE,
        emailVerified: true,
        parentPinHash: pinHash('123456'),
      }),
    );
  }
  let teacher = await users.findOne({ where: { email: 'teacher@smartbidda.test' } });
  if (!teacher) {
    teacher = await users.save(
      users.create({
        email: 'teacher@smartbidda.test',
        passwordHash: passwordHash('Teacher1234'),
        role: 'teacher',
        status: account_status.ACTIVE,
        emailVerified: true,
      }),
    );
  }
  let parent = await users.findOne({ where: { email: 'abida.begum@example.com' } });
  if (!parent) {
    parent = await users.save(
      users.create({
        email: 'abida.begum@example.com',
        passwordHash: passwordHash('Parent1234'),
        role: 'parent',
        status: account_status.ACTIVE,
        emailVerified: true,
        familyCode: 'SB-FAM-20260902-1041',
        parentPinHash: pinHash('123456'),
      }),
    );
  }
  if (!parent.familyCode) {
    parent.familyCode = 'SB-FAM-20260902-1041';
    await users.save(parent);
  }

  let family = await families.findOne({ where: { parentUserId: parent.id } });
  if (!family) {
    family = await families.save(families.create({ parentUserId: parent.id }));
  }

  // ── children (fixtures: রাফিদ / মাহিন) ──
  let rafid = await students.findOne({ where: { familyId: family.id, name: 'রাফিদ হাসান' } });
  if (!rafid) {
    rafid = await students.save(
      students.create({
        familyId: family.id,
        name: 'রাফিদ হাসান',
        nameBn: 'রাফিদ হাসান',
        avatar: 'র',
        classNo: 4,
        pinHash: pinHash('1234'),
        status: account_status.ACTIVE,
      }),
    );
  }
  let mahin = await students.findOne({ where: { familyId: family.id, name: 'মাহিন হাসান' } });
  if (!mahin) {
    mahin = await students.save(
      students.create({
        familyId: family.id,
        name: 'মাহিন হাসান',
        nameBn: 'মাহিন হাসান',
        avatar: 'ম',
        classNo: 2,
        pinHash: pinHash('1234'),
        status: account_status.ACTIVE,
      }),
    );
  }

  // ── curriculum (classes 1–5) ──
  const subjectRows: Subjects[] = [];
  for (let classNo = 1; classNo <= 5; classNo += 1) {
    for (const s of SUBJECTS) {
      let row = await subjects.findOne({ where: { classNo, slug: s.slug } });
      if (!row) {
        row = await subjects.save(
          subjects.create({ classNo, slug: s.slug, name: `${s.name} ${classNo}`, nameBn: `${s.nameBn} (শ্রেণি ${classNo})` }),
        );
      }
      subjectRows.push(row);
    }
  }

  const chaptersBySlug = new Map<string, Chapters>();
  for (const subject of subjectRows) {
    if (subject.classNo !== 4 && subject.classNo !== 2) continue;
    const defs = CHAPTERS[subject.slug] ?? [];
    const limit = subject.classNo === 4 ? defs.length : 2;
    for (let i = 0; i < limit; i += 1) {
      const def = defs[i];
      const uniqueSlug = `class-${subject.classNo}-${def.slug}`;
      let chapter = await chapters.findOne({ where: { slug: uniqueSlug } });
      if (!chapter) {
        chapter = await chapters.save(
          chapters.create({
            subjectId: subject.id,
            classNo: subject.classNo,
            name: def.name,
            nameBn: def.nameBn,
            slug: uniqueSlug,
            status: content_status.PUBLISHED,
            sortOrder: i + 1,
          }),
        );
      }
      chaptersBySlug.set(`${subject.classNo}:${subject.slug}:${i}`, chapter);

      let lesson = await content.findOne({ where: { chapterId: chapter.id } });
      if (!lesson) {
        lesson = await content.save(
          content.create({
            chapterId: chapter.id,
            kind: content_kind.LESSON,
            title: `${def.name} — lesson`,
            titleBn: `${def.nameBn} — পাঠ`,
            videoUrl: 'https://example.com/smartbidda/lesson.mp4',
            status: content_status.PUBLISHED,
            rightsAttestation: true,
          }),
        );
      }

      const existingQuestions = await questions.count({ where: { chapterId: chapter.id } });
      if (existingQuestions < 2) {
        const base = [
          {
            text: `${def.name} — practice question 1`,
            textBn: `${def.nameBn} — অনুশীলন প্রশ্ন ১`,
            options: { a: 'Option A', b: 'Option B', c: 'Option C', d: 'Option D' },
            correctOption: 0,
            difficulty: difficulty.EASY,
          },
          {
            text: `${def.name} — practice question 2`,
            textBn: `${def.nameBn} — অনুশীলন প্রশ্ন ২`,
            options: { a: 'Option A', b: 'Option B', c: 'Option C', d: 'Option D' },
            correctOption: 1,
            difficulty: difficulty.MEDIUM,
          },
        ];
        for (const q of base) {
          await questions.save(questions.create({ ...q, chapterId: chapter.id }));
        }
      }
    }
  }

  // ── term exams ──
  for (const classNo of [2, 4]) {
    const nameBn = classNo === 4 ? '১ম সাময়িক পরীক্ষা (৪র্থ শ্রেণি)' : '১ম সাময়িক পরীক্ষা (২য় শ্রেণি)';
    let exam = await exams.findOne({ where: { classNo, nameBn } });
    if (!exam) {
      const start = new Date();
      start.setDate(start.getDate() - 5);
      const end = new Date();
      end.setDate(end.getDate() + 20);
      exam = await exams.save(
        exams.create({
          classNo,
          name: classNo === 4 ? 'First Term Examination (Class 4)' : 'First Term Examination (Class 2)',
          nameBn,
          passThreshold: 60,
          startDate: start,
          endDate: end,
        }),
      );
    }
  }

  // ── badges ──
  const badgeDefs = [
    { name: 'First Steps', nameBn: 'প্রথম পদক্ষেপ', criteria: 'Complete the first lesson' },
    { name: 'Quiz Star', nameBn: 'কুইজ তারকা', criteria: 'Score 80% or more on a quiz' },
    { name: 'Five Day Streak', nameBn: 'পাঁচ দিনের ধারা', criteria: 'Study five days in a row' },
    { name: 'Math Explorer', nameBn: 'গণিত অভিযাত্রী', criteria: 'Finish a mathematics chapter' },
    { name: 'Science Whiz', nameBn: 'বিজ্ঞান বিশারদ', criteria: 'Finish a science chapter' },
    { name: 'Retake Hero', nameBn: 'রিটেক বীর', criteria: 'Pass a re-exam after a retake' },
  ];
  const badgeRows: Badges[] = [];
  for (const b of badgeDefs) {
    let row = await badges.findOne({ where: { name: b.name } });
    if (!row) row = await badges.save(badges.create(b));
    badgeRows.push(row);
  }
  for (const badge of badgeRows.slice(0, 2)) {
    const earned = await studentBadges.findOne({ where: { studentId: rafid.id, badgeId: badge.id } });
    if (!earned) {
      await studentBadges.save(studentBadges.create({ studentId: rafid.id, badgeId: badge.id, earnedAt: new Date() }));
    }
  }

  // ── subscription + payment (fixture display ids) ──
  let subscription = await subscriptions.findOne({ where: { familyId: family.id, status: subscription_status.ACTIVE } });
  if (!subscription) {
    const until = new Date();
    until.setDate(until.getDate() + 365);
    subscription = await subscriptions.save(
      subscriptions.create({
        subscriptionNo: 'SB-SUB-20260901-1041',
        familyId: family.id,
        plan: subscription_plan.ANNUAL,
        status: subscription_status.ACTIVE,
        entitlementUntil: until,
      }),
    );
  }
  let payment = await payments.findOne({ where: { paymentNo: 'SB-PAY-20260925-4181' } });
  if (!payment) {
    payment = await payments.save(
      payments.create({
        paymentNo: 'SB-PAY-20260925-4181',
        subscriptionId: subscription.id,
        intentId: 'SB-INT-20260925-4181',
        amountPoisha: 349900,
        currency: 'BDT',
        status: payment_status.COMPLETED,
        webhookConfirmed: true,
      }),
    );
  }

  // ── today's screen time / points / progress / retake / alerts ──
  for (const [child, used, limit] of [
    [rafid, 24, 60],
    [mahin, 10, 60],
  ] as Array<[Students, number, number]>) {
    const row = await screenTime.findOne({ where: { studentId: child.id, date: today() } });
    if (!row) {
      await screenTime.save(screenTime.create({ studentId: child.id, date: today(), minutes: used, limitMinutes: limit }));
    }
  }
  if ((await points.count({ where: { studentId: rafid.id } })) === 0) {
    await points.save(points.create({ studentId: rafid.id, points: 1240, reason: 'seed' }));
  }
  if ((await points.count({ where: { studentId: mahin.id } })) === 0) {
    await points.save(points.create({ studentId: mahin.id, points: 320, reason: 'seed' }));
  }
  // The design anchors `৫ দিন` (five-day streak); seed five consecutive study days for রাফিদ.
  if ((await heartbeats.count({ where: { studentId: rafid.id } })) === 0) {
    for (let daysAgo = 0; daysAgo < 5; daysAgo += 1) {
      const ts = new Date();
      ts.setDate(ts.getDate() - daysAgo);
      ts.setHours(17, 0, 0, 0);
      await heartbeats.save(heartbeats.create({ studentId: rafid.id, timestamp: ts, minutes: 20 }));
    }
  }
  if ((await remedial.count({ where: { studentId: rafid.id, status: remedial_status.ASSIGNED } })) === 0) {
    const chapter = chaptersBySlug.get('4:ganit:1');
    await remedial.save(
      remedial.create({
        caseNo: 'SB-RMD-20261017-0001',
        studentId: rafid.id,
        chapterId: chapter?.id,
        status: remedial_status.ASSIGNED,
        assignedAt: new Date(),
      }),
    );
  }
  const rafidContent = await content
    .createQueryBuilder('c')
    .innerJoin(Chapters, 'ch', 'ch.id = c.chapter_id')
    .where('ch.class_no = :classNo', { classNo: 4 })
    .limit(2)
    .getMany();
  for (const item of rafidContent) {
    const existing = await progress.findOne({ where: { studentId: rafid.id, contentId: item.id } });
    if (!existing) {
      await progress.save(
        progress.create({ studentId: rafid.id, contentId: item.id, watchedPct: 100, completed: true }),
      );
    }
  }
  if ((await notifications.count({ where: { recipientUserId: parent.id } })) === 0) {
    await notifications.save([
      notifications.create({
        recipientUserId: parent.id,
        category: notification_category.EXAM_RESULT,
        title: 'Exam result published',
        titleBn: 'পরীক্ষার ফল প্রকাশিত হয়েছে',
        body: 'The first term result is ready.',
        bodyBn: 'প্রথম সাময়িক পরীক্ষার ফলাফল তৈরি হয়েছে।',
        read: false,
      }),
      notifications.create({
        recipientUserId: parent.id,
        category: notification_category.WEAKNESS_ALERT,
        title: 'A weakness was detected',
        titleBn: 'একটি দুর্বলতা শনাক্ত হয়েছে',
        body: 'A retake class has been assigned.',
        bodyBn: 'একটি রিটেক ক্লাস দেওয়া হয়েছে।',
        read: false,
      }),
    ]);
  }

  console.log('seed: done');
  console.log(`  admin    admin@smartbidda.test / Admin1234`);
  console.log(`  teacher  teacher@smartbidda.test / Teacher1234`);
  console.log(`  parent   abida.begum@example.com / Parent1234 (PIN 123456)`);
  console.log(`  students রাফিদ হাসান (class 4, PIN 1234), মাহিন হাসান (class 2, PIN 1234)`);
  console.log(`  family   SB-FAM-20260902-1041 · subscription SB-SUB-20260901-1041`);
  await AppDataSource.destroy();
}

main().catch((err) => {
  console.error('seed failed', err);
  process.exitCode = 1;
});
