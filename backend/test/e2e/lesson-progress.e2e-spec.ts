/** Generated CRUD e2e suite. Uses the canonical test framework. */
import supertest from 'supertest';
import { createTestApp, closeTestApp, TestAppContext } from '../setup/test-app.factory';
import { cleanDatabase } from '../setup/test-database';
import { createTestUser } from '../fixtures/user.fixture';
import { loginAndGetCookie } from '../fixtures/auth.fixture';
import { ensureRow } from '../fixtures/fk.fixture';
import { RoleEnum } from '../../src/common/enums/role.enum';

describe('LessonProgress E2E', () => {
  let ctx: TestAppContext;
  let adminCookie: string;
  // Ids of the rows this entity's REQUIRED foreign keys point at. Rebuilt in beforeEach because
  // cleanDatabase truncates between tests — a parent created once in beforeAll is gone by the
  // second test, and the payload would reference a row that no longer exists.
  const fkIds: Record<string, string> = {};

  beforeAll(async () => {
    ctx = await createTestApp();
    const admin = await createTestUser(ctx.dataSource, {
      email: 'lessonProgress.admin@test.com',
      role: RoleEnum.admin,
    });
    adminCookie = await loginAndGetCookie(ctx.app, admin.email, admin.password);
  });

  beforeEach(async () => {
    await cleanDatabase(ctx.dataSource);
    fkIds.studentId = await ensureRow(ctx.dataSource, 'student');
    fkIds.contentId = await ensureRow(ctx.dataSource, 'content');

  });

  afterAll(async () => {
    await closeTestApp(ctx);
  });

  describe('POST /api/lesson_progress', () => {
    it('creates a lessonProgress when authenticated', async () => {
      const res = await supertest(ctx.app.getHttpServer())
        .post('/api/lesson_progress')
        .set('Cookie', adminCookie)
        .send({
          studentId: fkIds.studentId,
          contentId: fkIds.contentId,
        })
        .expect(201);

      expect(res.body.data).toHaveProperty('id');
    });

    it('rejects unauthenticated requests with 401', async () => {
      await supertest(ctx.app.getHttpServer())
        .post('/api/lesson_progress')
        .send({
          watchedPct: 1,
          completed: true,
        })
        .expect(401);
    });

    it('rejects invalid bodies with 400', async () => {
      await supertest(ctx.app.getHttpServer())
        .post('/api/lesson_progress')
        .set('Cookie', adminCookie)
        .send({})
        .expect(400);
    });
  });

  describe('GET /api/lesson_progress', () => {
    it('returns paginated list', async () => {
      const res = await supertest(ctx.app.getHttpServer())
        .get('/api/lesson_progress')
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body.data).toHaveProperty('items');
      expect(Array.isArray(res.body.data.items)).toBe(true);
    });
  });

  describe('GET /api/lesson_progress/:id', () => {
    it('returns 404 for unknown id', async () => {
      await supertest(ctx.app.getHttpServer())
        .get('/api/lesson_progress/00000000-0000-0000-0000-000000000000')
        .set('Cookie', adminCookie)
        .expect(404);
    });

    it('returns the lessonProgress when it exists', async () => {
      const created = await supertest(ctx.app.getHttpServer())
        .post('/api/lesson_progress')
        .set('Cookie', adminCookie)
        .send({
          studentId: fkIds.studentId,
          contentId: fkIds.contentId,
        })
        .expect(201);
      const id = created.body.data.id;

      const res = await supertest(ctx.app.getHttpServer())
        .get(`/api/lesson_progress/${id}`)
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body.data.id).toBe(id);
    });
  });

  describe('DELETE /api/lesson_progress/:id', () => {
    it('soft-deletes the lessonProgress', async () => {
      const created = await supertest(ctx.app.getHttpServer())
        .post('/api/lesson_progress')
        .set('Cookie', adminCookie)
        .send({
          studentId: fkIds.studentId,
          contentId: fkIds.contentId,
        })
        .expect(201);
      const id = created.body.data.id;

      await supertest(ctx.app.getHttpServer())
        .delete(`/api/lesson_progress/${id}`)
        .set('Cookie', adminCookie)
        .expect(204);

      await supertest(ctx.app.getHttpServer())
        .get(`/api/lesson_progress/${id}`)
        .set('Cookie', adminCookie)
        .expect(404);
    });
  });
});
