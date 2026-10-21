/**
 * View-only shapes for screens whose layout is still rendered from the design
 * fixture but whose controls read live API payloads. Domain/entity types stay
 * in the generated `~/types/<module>.d.ts` files; these describe just the
 * fields a page touches, so pages stay free of inline domain interfaces.
 */

/** One row of `GET /api/parent/dashboard` → alerts[] (or the alerts fixture). */
export interface ParentAlert {
  id: string;
  title?: string;
  titleBn?: string;
  body?: string;
  bodyBn?: string;
}

/** One child of `GET /api/parent/dashboard` → children[]. */
export interface FamilyChild {
  id: string;
  displayName?: string;
  nameBn?: string;
}

/** Plan keys accepted by `POST /api/payments/intents`. */
export type PlanKey = 'MONTHLY' | 'ANNUAL' | 'CRASH_TERM' | 'CRASH_ANNUAL';
