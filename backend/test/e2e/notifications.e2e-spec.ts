/** Generated CRUD e2e suite. Uses the canonical test framework. */
import supertest from 'supertest';
import { createTestApp, closeTestApp, TestAppContext } from '../setup/test-app.factory';
import { cleanDatabase } from '../setup/test-database';
import { createTestUser } from '../fixtures/user.fixture';
import { loginAndGetCookie } from '../fixtures/auth.fixture';
import { notification_category } from '../../src/common/enums/notification-category.enum';
import { ensureRow } from '../fixtures/fk.fixture';
import { RoleEnum } from '../../src/common/enums/role.enum';

describe('Notifications E2E', () => {
  let ctx: TestAppContext;
  let adminCookie: string;
  // Ids of the rows this entity's REQUIRED foreign keys point at. Rebuilt in beforeEach because
  // cleanDatabase truncates between tests — a parent created once in beforeAll is gone by the
  // second test, and the payload would reference a row that no longer exists.
  const fkIds: Record<string, string> = {};

  beforeAll(async () => {
    ctx = await createTestApp();
    const admin = await createTestUser(ctx.dataSource, {
      email: 'notifications.admin@test.com',
      role: RoleEnum.admin,
    });
    adminCookie = await loginAndGetCookie(ctx.app, admin.email, admin.password);
  });

  beforeEach(async () => {
    await cleanDatabase(ctx.dataSource);
    fkIds.recipientUserId = await ensureRow(ctx.dataSource, 'recipientUser');

  });

  afterAll(async () => {
    await closeTestApp(ctx);
  });

  describe('POST /api/notifications', () => {
    it('creates a notifications when authenticated', async () => {
      const res = await supertest(ctx.app.getHttpServer())
        .post('/api/notifications')
        .set('Cookie', adminCookie)
        .send({
          recipientUserId: fkIds.recipientUserId,
          category: Object.values(notification_category)[0] as never,
          title: 'test',
          titleBn: 'test',
        })
        .expect(201);

      expect(res.body.data).toHaveProperty('id');
    });

    it('rejects unauthenticated requests with 401', async () => {
      await supertest(ctx.app.getHttpServer())
        .post('/api/notifications')
        .send({
          category: 'test',
          title: 'test',
          titleBn: 'test',
          read: true,
        })
        .expect(401);
    });

    it('rejects invalid bodies with 400', async () => {
      await supertest(ctx.app.getHttpServer())
        .post('/api/notifications')
        .set('Cookie', adminCookie)
        .send({})
        .expect(400);
    });
  });

  describe('GET /api/notifications', () => {
    it('returns paginated list', async () => {
      const res = await supertest(ctx.app.getHttpServer())
        .get('/api/notifications')
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body.data).toHaveProperty('items');
      expect(Array.isArray(res.body.data.items)).toBe(true);
    });
  });

  describe('GET /api/notifications/:id', () => {
    it('returns 404 for unknown id', async () => {
      await supertest(ctx.app.getHttpServer())
        .get('/api/notifications/00000000-0000-0000-0000-000000000000')
        .set('Cookie', adminCookie)
        .expect(404);
    });

    it('returns the notifications when it exists', async () => {
      const created = await supertest(ctx.app.getHttpServer())
        .post('/api/notifications')
        .set('Cookie', adminCookie)
        .send({
          recipientUserId: fkIds.recipientUserId,
          category: Object.values(notification_category)[0] as never,
          title: 'test',
          titleBn: 'test',
        })
        .expect(201);
      const id = created.body.data.id;

      const res = await supertest(ctx.app.getHttpServer())
        .get(`/api/notifications/${id}`)
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body.data.id).toBe(id);
    });
  });

  describe('DELETE /api/notifications/:id', () => {
    it('soft-deletes the notifications', async () => {
      const created = await supertest(ctx.app.getHttpServer())
        .post('/api/notifications')
        .set('Cookie', adminCookie)
        .send({
          recipientUserId: fkIds.recipientUserId,
          category: Object.values(notification_category)[0] as never,
          title: 'test',
          titleBn: 'test',
        })
        .expect(201);
      const id = created.body.data.id;

      await supertest(ctx.app.getHttpServer())
        .delete(`/api/notifications/${id}`)
        .set('Cookie', adminCookie)
        .expect(204);

      await supertest(ctx.app.getHttpServer())
        .get(`/api/notifications/${id}`)
        .set('Cookie', adminCookie)
        .expect(404);
    });
  });
});
