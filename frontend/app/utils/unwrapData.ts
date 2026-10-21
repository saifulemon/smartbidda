/**
 * `useScreenQuery` returns the raw TransformInterceptor envelope
 * (`{ success, data }`) while `httpMethods` unwrap it. Page-level reads that
 * need fields (ids, lists) should normalize through this helper.
 */
export function unwrapData<T>(value: unknown): T | null {
  if (!value || typeof value !== 'object') return null;
  const envelope = value as { data?: unknown };
  const body = 'data' in envelope ? envelope.data : value;
  return (body as T | null) ?? null;
}
