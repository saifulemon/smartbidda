import { Activity, BookOpen, BookText, Calculator, FlaskConical, Globe2, HeartPulse, Languages, MonitorSmartphone, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import { CoverFill } from '~/components/shared/CoverFill';

/** Bangla subject name → cover glyph. NCTB primary subjects; anything unknown falls back to BookOpen. */
const SUBJECT_ICONS: ReadonlyArray<readonly [RegExp, LucideIcon]> = [
  [/গণিত/, Calculator],
  [/বাংলা/, BookText],
  [/ইংরেজি/, Languages],
  [/বিজ্ঞান/, FlaskConical],
  [/সমাজ/, Globe2],
  [/ধর্ম/, BookOpen],
  [/চারু/, Palette],
  [/শরীর/, Activity],
  [/স্বাস্থ্য/, HeartPulse],
  [/তথ্য/, MonitorSmartphone],
];

interface SubjectCoverProps {
  /** Visible Bangla subject name — selects the icon. */
  subject: string;
  /** `xl` for large covers (subject rail), `md` for small thumbs (listing rows). */
  size?: 'md' | 'xl';
  /** Extra classes for the media slot (aspect ratio, flex basis, …). */
  className?: string;
}

/**
 * On-brand stand-in for stock-photo subject covers: a soft brand gradient with
 * the subject's lucide glyph. Decorative by design — the subject name always
 * renders next to it as real text, so the cover stays aria-hidden.
 */
export function SubjectCover({ subject, size = 'md', className }: SubjectCoverProps) {
  const Icon = SUBJECT_ICONS.find(([match]) => match.test(subject))?.[1] ?? BookOpen;
  return (
    <span className={cn('media block', className)}>
      <CoverFill icon={Icon} size={size === 'xl' ? 'xl' : 'md'} />
    </span>
  );
}
