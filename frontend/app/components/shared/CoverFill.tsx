import type { LucideIcon } from 'lucide-react';
import { cn } from '~/lib/utils';

interface CoverFillProps {
  /** Icon centred in the cover. Ignored when `label` is given. */
  icon?: LucideIcon;
  /** Short text centred instead of an icon (e.g. a name initial). */
  label?: string;
  /** Glyph size: `md` for small thumbs, `xl` for tiles, `xxl` for heroes/video. */
  size?: 'md' | 'xl' | 'xxl';
}

const ICON_SIZES = { md: 'icon-lg', xl: 'icon-xl', xxl: 'icon-xxl' } as const;

/**
 * Brand-gradient fill for a `.media` slot — the on-brand stand-in for the
 * design's random stock photos. Renders an icon or a monogram initial, so the
 * surrounding media element keeps its aspect ratio, radius and test id.
 */
export function CoverFill({ icon: Icon, label, size = 'xl' }: CoverFillProps) {
  return (
    <span
      className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary-soft to-surface-soft"
      aria-hidden="true"
    >
      {label ? (
        <span className="t-display-md text-primary">{label}</span>
      ) : Icon ? (
        <Icon className={cn(ICON_SIZES[size], 'text-primary')} />
      ) : null}
    </span>
  );
}
