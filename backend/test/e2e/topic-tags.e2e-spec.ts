/** Generated CRUD e2e suite. Uses the canonical test framework. */
import supertest from 'supertest';
import { createTestApp, closeTestApp, TestAppContext } from '../setup/test-app.factory';
import { cleanDatabase } from '../setup/test-database';
import { createTestUser } from '../fixtures/user.fixture';
import { loginAndGetCookie } from '../fixtures/auth.fixture';
import { ensureRow } from '../fixtures/fk.fixture';
import { RoleEnum } from '../../src/common/enums/role.enum';

describe('TopicTags E2E', () => {
  let ctx: TestAppContext;
  let adminCookie: string;
  // Ids of the rows this entity's REQUIRED foreign keys point at. Rebuilt in beforeEach because
  // cleanDatabase truncates between tests — a parent created once in beforeAll is gone by the
  // second test, and the payload would reference a row that no longer exists.
  const fkIds: Record<string, string> = {};

  beforeAll(async () => {
    ctx = await createTestApp();
    const admin = await createTestUser(ctx.dataSource, {
      email: 'topicTags.admin@test.com',
      role: RoleEnum.admin,
    });
    adminCookie = await loginAndGetCookie(ctx.app, admin.email, admin.password);
  });

  beforeEach(async () => {
    await cleanDatabase(ctx.dataSource);

  });

  afterAll(async () => {
    await closeTestApp(ctx);
  });

  describe('POST /api/topic_tags', () => {
    it('creates a topicTags when authenticated', async () => {
      const res = await supertest(ctx.app.getHttpServer())
        .post('/api/topic_tags')
        .set('Cookie', adminCookie)
        .send({
          name: 'test',
          nameBn: 'test',
        })
        .expect(201);

      expect(res.body.data).toHaveProperty('id');
    });

    it('rejects unauthenticated requests with 401', async () => {
      await supertest(ctx.app.getHttpServer())
        .post('/api/topic_tags')
        .send({
          name: 'test',
          nameBn: 'test',
        })
        .expect(401);
    });

    it('rejects invalid bodies with 400', async () => {
      await supertest(ctx.app.getHttpServer())
        .post('/api/topic_tags')
        .set('Cookie', adminCookie)
        .send({})
        .expect(400);
    });
  });

  describe('GET /api/topic_tags', () => {
    it('returns paginated list', async () => {
      const res = await supertest(ctx.app.getHttpServer())
        .get('/api/topic_tags')
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body.data).toHaveProperty('items');
      expect(Array.isArray(res.body.data.items)).toBe(true);
    });
  });

  describe('GET /api/topic_tags/:id', () => {
    it('returns 404 for unknown id', async () => {
      await supertest(ctx.app.getHttpServer())
        .get('/api/topic_tags/00000000-0000-0000-0000-000000000000')
        .set('Cookie', adminCookie)
        .expect(404);
    });

    it('returns the topicTags when it exists', async () => {
      const created = await supertest(ctx.app.getHttpServer())
        .post('/api/topic_tags')
        .set('Cookie', adminCookie)
        .send({
          name: 'test',
          nameBn: 'test',
        })
        .expect(201);
      const id = created.body.data.id;

      const res = await supertest(ctx.app.getHttpServer())
        .get(`/api/topic_tags/${id}`)
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body.data.id).toBe(id);
    });
  });

  describe('DELETE /api/topic_tags/:id', () => {
    it('soft-deletes the topicTags', async () => {
      const created = await supertest(ctx.app.getHttpServer())
        .post('/api/topic_tags')
        .set('Cookie', adminCookie)
        .send({
          name: 'test',
          nameBn: 'test',
        })
        .expect(201);
      const id = created.body.data.id;

      await supertest(ctx.app.getHttpServer())
        .delete(`/api/topic_tags/${id}`)
        .set('Cookie', adminCookie)
        .expect(204);

      await supertest(ctx.app.getHttpServer())
        .get(`/api/topic_tags/${id}`)
        .set('Cookie', adminCookie)
        .expect(404);
    });
  });
});
