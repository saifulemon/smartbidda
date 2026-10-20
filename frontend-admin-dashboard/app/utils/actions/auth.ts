/**
 * RR7 form actions for login + register (canonical).
 *
 * v72: replaces the prior STUB which validated the form schema and
 * returned `{ message: 'Login successful' }` without ever calling the
 * backend. The stub silently broke any `<form action={loginAction}>`
 * page — v71 evidence: the admin-dashboard frontend cell got 0/10 story
 * pass rate because its login.tsx used loginAction and authentication
 * never actually happened, AuthGuard rejected on SSR, all 10 stories
 * failed at "page not reachable".
 *
 * This version:
 * - Removes 'use server' so the action runs in the browser, letting it
 *   set the httpOnly auth cookies via `credentials: 'include'`.
 * - POSTs to <VITE_API_URL>/auth/login (or /auth/signup) with the form
 *   body the backend's canonical auth controller expects.
 * - Returns the parsed body on success (caller usually navigates) or a
 *   structured error JSON for the form's `useActionState` consumer.
 *
 * Mirrors what scaffold-auth-pages' LoginPage.tsx does via Redux thunks;
 * both paths now work, regardless of which file routes.ts wires.
 */
import { z } from 'zod';
import { loginSchema, registerSchema } from '~/utils/validations/auth';
import type { LoginResponse } from '~/types/auth';

function apiBase(): string {
  // Vite injects import.meta.env at build time. Fallback to localhost for
  // dev. Strip trailing slash to avoid '//auth/login'.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const env = import.meta.env;
  const base = (env.VITE_API_URL as string | undefined) || '/api';
  return base.replace(/\/$/, '');
}

async function postAuth(path: string, body: unknown): Promise<{ ok: boolean; data?: unknown; error?: string }> {
  try {
    const res = await fetch(`${apiBase()}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let msg = res.status === 401 ? 'Invalid credentials' : 'Authentication failed';
      try {
        const err = await res.json();
        if (err && typeof err === 'object') msg = (err as Record<string, unknown>).message as string ?? msg;
      } catch { /* non-JSON error body — fall back to default msg */ }
      return { ok: false, error: msg };
    }
    let data: unknown = null;
    try { data = await res.json(); } catch { /* empty body is OK */ }
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' };
  }
}

function zodErrorsToJson(error: z.ZodError): string {
  const errors: Record<string, string> = {};
  error.errors.forEach((err) => {
    const key = String(err.path[0] ?? 'form');
    errors[key] = err.message;
  });
  return JSON.stringify(errors);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginAction(_prevState: unknown, formData: FormData): Promise<LoginResponse> {
  try {
    const data = loginSchema.parse(Object.fromEntries(formData));
    const result = await postAuth('/auth/login', data);
    if (!result.ok) {
      return { error: JSON.stringify({ form: result.error ?? 'Invalid credentials' }) } as LoginResponse;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { message: 'Login successful', data: result.data as LoginResponse['data'] } as LoginResponse;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { error: zodErrorsToJson(error) } as LoginResponse;
    }
    return { error: JSON.stringify({ form: 'Invalid credentials' }) } as LoginResponse;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerAction(_prevState: unknown, formData: FormData): Promise<LoginResponse> {
  try {
    const data = registerSchema.parse(Object.fromEntries(formData));
    const result = await postAuth('/auth/signup', data);
    if (!result.ok) {
      return { error: JSON.stringify({ form: result.error ?? 'Registration failed' }) } as LoginResponse;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { message: 'Registration successful', data: result.data as LoginResponse['data'] } as LoginResponse;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { error: zodErrorsToJson(error) } as LoginResponse;
    }
    return { error: JSON.stringify({ form: 'Registration failed' }) } as LoginResponse;
  }
}
