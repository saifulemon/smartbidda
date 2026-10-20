/** Generated CRUD e2e suite. Uses the canonical test framework. */
import supertest from 'supertest';
import { createTestApp, closeTestApp, TestAppContext } from '../setup/test-app.factory';
import { cleanDatabase } from '../setup/test-database';
import { createTestUser } from '../fixtures/user.fixture';
import { loginAndGetCookie } from '../fixtures/auth.fixture';
import { content_status } from '../../src/common/enums/content-status.enum';
import { ensureRow } from '../fixtures/fk.fixture';
import { RoleEnum } from '../../src/common/enums/role.enum';

describe('Chapters E2E', () => {
  let ctx: TestAppContext;
  let adminCookie: string;
  // Ids of the rows this entity's REQUIRED foreign keys point at. Rebuilt in beforeEach because
  // cleanDatabase truncates between tests — a parent created once in beforeAll is gone by the
  // second test, and the payload would reference a row that no longer exists.
  const fkIds: Record<string, string> = {};

  beforeAll(async () => {
    ctx = await createTestApp();
    const admin = await createTestUser(ctx.dataSource, {
      email: 'chapters.admin@test.com',
      role: RoleEnum.admin,
    });
    adminCookie = await loginAndGetCookie(ctx.app, admin.email, admin.password);
  });

  beforeEach(async () => {
    await cleanDatabase(ctx.dataSource);
    fkIds.subjectId = await ensureRow(ctx.dataSource, 'subject');

  });

  afterAll(async () => {
    await closeTestApp(ctx);
  });

  describe('POST /api/chapters', () => {
    it('creates a chapters when authenticated', async () => {
      const res = await supertest(ctx.app.getHttpServer())
        .post('/api/chapters')
        .set('Cookie', adminCookie)
        .send({
          subjectId: fkIds.subjectId,
          classNo: 1,
          name: 'test',
          nameBn: 'test',
          slug: 'test',
          status: Object.values(content_status)[0] as never,
        })
        .expect(201);

      expect(res.body.data).toHaveProperty('id');
    });

    it('rejects unauthenticated requests with 401', async () => {
      await supertest(ctx.app.getHttpServer())
        .post('/api/chapters')
        .send({
          classNo: 1,
          name: 'test',
          nameBn: 'test',
          slug: 'test',
          status: 'test',
          sortOrder: 1,
        })
        .expect(401);
    });

    it('rejects invalid bodies with 400', async () => {
      await supertest(ctx.app.getHttpServer())
        .post('/api/chapters')
        .set('Cookie', adminCookie)
        .send({})
        .expect(400);
    });
  });

  describe('GET /api/chapters', () => {
    it('returns paginated list', async () => {
      const res = await supertest(ctx.app.getHttpServer())
        .get('/api/chapters')
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body.data).toHaveProperty('items');
      expect(Array.isArray(res.body.data.items)).toBe(true);
    });
  });

  describe('GET /api/chapters/:id', () => {
    it('returns 404 for unknown id', async () => {
      await supertest(ctx.app.getHttpServer())
        .get('/api/chapters/00000000-0000-0000-0000-000000000000')
        .set('Cookie', adminCookie)
        .expect(404);
    });

    it('returns the chapters when it exists', async () => {
      const created = await supertest(ctx.app.getHttpServer())
        .post('/api/chapters')
        .set('Cookie', adminCookie)
        .send({
          subjectId: fkIds.subjectId,
          classNo: 1,
          name: 'test',
          nameBn: 'test',
          slug: 'test',
          status: Object.values(content_status)[0] as never,
        })
        .expect(201);
      const id = created.body.data.id;

      const res = await supertest(ctx.app.getHttpServer())
        .get(`/api/chapters/${id}`)
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body.data.id).toBe(id);
    });
  });

  describe('DELETE /api/chapters/:id', () => {
    it('soft-deletes the chapters', async () => {
      const created = await supertest(ctx.app.getHttpServer())
        .post('/api/chapters')
        .set('Cookie', adminCookie)
        .send({
          subjectId: fkIds.subjectId,
          classNo: 1,
          name: 'test',
          nameBn: 'test',
          slug: 'test',
          status: Object.values(content_status)[0] as never,
        })
        .expect(201);
      const id = created.body.data.id;

      await supertest(ctx.app.getHttpServer())
        .delete(`/api/chapters/${id}`)
        .set('Cookie', adminCookie)
        .expect(204);

      await supertest(ctx.app.getHttpServer())
        .get(`/api/chapters/${id}`)
        .set('Cookie', adminCookie)
        .expect(404);
    });
  });
});
