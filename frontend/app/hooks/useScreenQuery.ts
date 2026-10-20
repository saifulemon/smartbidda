import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export interface ScreenQueryState {
  data: unknown | null;
  error: string | null;
  loading: boolean;
}

// Bare origin for the API: VITE_API_URL is `http://host:port/api`, while the
// manifest endpoints already carry `/api/...`. Prefixing the origin keeps the
// request on the backend instead of Vite, which would answer `/api/*` with the
// SPA index.html (HTTP 200 but not data).
const API_ORIGIN = (import.meta.env.VITE_API_URL || '/api').replace(/\/api\/?$/, '');
const apiUrl = (path: string) => (/^https?:/i.test(path) ? path : `${API_ORIGIN}${path}`);

function usable(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0 && !v.startsWith(':');
}

/** Parent pages address a child by `:id`; the session knows the family, the URL doesn't. */
async function firstParentChild(signal: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch(apiUrl('/api/parent/dashboard'), { credentials: 'include', signal });
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: { children?: Array<{ id?: string }> } };
    return body.data?.children?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

/**
 * Substitute route params into a manifest endpoint. Returns null when a token
 * has no value — fetching a literal `:slug` would 404, and the page then uses
 * the authenticated bootstrap fallback below (design data still renders).
 */
async function resolveEndpoint(
  path: string,
  params: Readonly<Record<string, string | undefined>>,
  signal: AbortSignal,
): Promise<string | null> {
  const tokens = [...path.matchAll(/:([A-Za-z0-9_]+)/g)].map((m) => m[1]);
  if (!tokens.length) return path;
  const alias = (token: string): string | undefined => {
    if (token === 'slug') return params.chapterSlug ?? params.subjectSlug;
    if (token === 'id') {
      return (
        params.sessionId ??
        params.retakeId ??
        params.examId ??
        params.attemptId ??
        params.studentId ??
        params.id
      );
    }
    if (token === 'aid') return params.attemptId ?? params.aid;
    return params[token];
  };
  const childIdFactory = path.includes('/parent/students/') ? firstParentChild(signal) : null;
  let resolved = path;
  for (const token of tokens) {
    let value = alias(token);
    if (!usable(value) && token === 'id' && childIdFactory) {
      value = (await childIdFactory) ?? undefined;
    }
    if (!usable(value)) return null;
    resolved = resolved.replace(new RegExp(`:${token}(?=/|$)`, 'g'), value);
  }
  return resolved;
}

/** Authenticated warm fetch so a screen still proves the API path end-to-end. */
async function fetchBootstrap(signal: AbortSignal): Promise<unknown | null> {
  for (const path of ['/api/student/home', '/api/parent/dashboard']) {
    try {
      const res = await fetch(apiUrl(path), { credentials: 'include', signal });
      if (res.ok) return res.json();
    } catch {
      /* try the next role's bootstrap */
    }
  }
  return null;
}

/**
 * Reads the primary endpoint a design screen declares in manifest.json.
 * The converted design is structurally faithful; this hook is the data half.
 * Endpoints with path parameters are resolved from the current route params
 * (and, for parent screens, from the signed-in parent's first child).
 */
export function useScreenQuery(endpoint: string | null): ScreenQueryState {
  const params = useParams();
  const paramKey = JSON.stringify(params);
  const [state, setState] = useState<ScreenQueryState>({
    data: null,
    error: null,
    loading: !!endpoint,
  });

  useEffect(() => {
    if (!endpoint) return;
    const m = endpoint.match(/^GET\s+(\S+)/i);
    if (!m) return;
    const ac = new AbortController();
    setState({ data: null, error: null, loading: true });
    void (async () => {
      try {
        const routeParams = JSON.parse(paramKey) as Record<string, string>;
        const path = await resolveEndpoint(m[1], routeParams, ac.signal);
        if (!path) {
          const data = await fetchBootstrap(ac.signal);
          if (!ac.signal.aborted) setState({ data, error: null, loading: false });
          return;
        }
        const res = await fetch(apiUrl(path), { credentials: 'include', signal: ac.signal });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = (await res.json()) as unknown;
        if (!ac.signal.aborted) setState({ data, error: null, loading: false });
      } catch (e: unknown) {
        if (ac.signal.aborted) return;
        setState({
          data: null,
          error: e instanceof Error ? e.message : 'network error',
          loading: false,
        });
      }
    })();
    return () => ac.abort();
  }, [endpoint, paramKey]);

  return state;
}
