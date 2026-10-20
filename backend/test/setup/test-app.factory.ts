/**
 * test-app.factory.ts — canonical NestJS e2e test-app factory.
 *
 * Single source of truth. Copied by scaffold-test-setup from
 * `.claude/stacks/nestjs/templates/test/setup/`. Do NOT modify per-project — the
 * factory is framework glue. LLM tests consume this; LLM does not author it.
 *
 * Why this exists: across v54..v59 the LLM-authored test-app.factory wrote
 * 21 test suites that all failed at `closeTestApp` calling
 * `context.app.close()` on undefined — half-finished factory variants where
 * `createTestApp` swallowed errors or returned the wrong shape. The shape
 * stays here; the LLM only writes the per-module .e2e-spec.ts files that
 * USE it.
 */
import { INestApplication, Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import { DataSource } from 'typeorm';
import { AppModule } from 'src/app.module';
import { validationPipe } from 'src/core/pipes/validation.pipe';
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter';
import { AllExceptionsFilter } from 'src/core/filters/all-exceptions.filter';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// v66: jest default beforeAll timeout (5s) is too tight for our first-call
// AppModule.compile() + Postgres connection. v61 evidence: 16 suites / 248
// tests all failed at `Exceeded timeout of 5000 ms for a hook` because
// createTestApp legitimately takes >5s on cold boot. Bump to 30s.
if (typeof jest !== 'undefined') {
  jest.setTimeout(30000);
}

export interface TestAppContext {
  app: INestApplication;
  module: TestingModule;
  dataSource: DataSource;
}

export interface CreateTestAppOptions {
  /**
   * Optional provider overrides — `[ServiceClass, mockInstance][]`.
   * Example: `[[MailService, { send: jest.fn() }]]`.
   */
  overrides?: Array<[Type<unknown> | string, unknown]>;
}

/**
 * Create a NestJS test app wired against the real AppModule.
 *
 * Returns a context with: `app` (INestApplication), `module` (TestingModule),
 * `dataSource` (TypeORM DataSource — for direct DB seeding/cleanup).
 *
 * Always pair with `closeTestApp(context)` in `afterAll`. The factory tolerates
 * partial initialization — if `app.init()` throws, the partially-built
 * TestingModule still gets cleaned up so the next test suite can boot.
 */
export async function createTestApp(
  options: CreateTestAppOptions = {},
): Promise<TestAppContext> {
  let moduleBuilder = Test.createTestingModule({
    imports: [AppModule],
  });

  if (options.overrides) {
    for (const [token, value] of options.overrides) {
      moduleBuilder = moduleBuilder.overrideProvider(token).useValue(value);
    }
  }

  const module = await moduleBuilder.compile();
  const app = module.createNestApplication();

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  // Mirror main.ts: the app wraps every response in { success, statusCode, message, data }.
  // Without the interceptor the test app returned raw controller values, so every spec's
  // `res.body.data` assertion failed against a shape production never produces.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), new TransformInterceptor());

  try {
    await app.init();
  } catch (err) {
    // Partial-init cleanup: close whatever did spin up so the next test can boot.
    try { await module.close(); } catch (_) { /* swallow secondary errors */ }
    throw err;
  }

  const dataSource = module.get(DataSource);

  return { app, module, dataSource };
}

/**
 * Close the test app, dataSource, and module — in dependency order.
 * Idempotent and null-safe. Always call this in `afterAll`.
 */
export async function closeTestApp(
  context: TestAppContext | null | undefined,
): Promise<void> {
  if (!context) return;
  if (context.app) {
    try { await context.app.close(); } catch (_) { /* swallow — closing twice is fine */ }
  } else if (context.module) {
    try { await context.module.close(); } catch (_) { /* swallow */ }
  }
}
