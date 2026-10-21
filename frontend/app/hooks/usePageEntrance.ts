import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/**
 * Page-load entrance animation for a screen's top-level sections.
 *
 * Elements marked `data-entrance` rise and fade in with a short stagger; pages
 * that do not mark their sections fall back to animating the page root's direct
 * children, so every route gets the same motion. `.progress-fill` bars grow from
 * zero to their inline width. Motion is skipped entirely for
 * `prefers-reduced-motion` users, and the callback only runs in the browser
 * (useGSAP is an isomorphic layout effect), so SSR is unaffected.
 *
 * Returns the ref to attach to the page root — it scopes every selector.
 */
export function usePageEntrance<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const marked = root.querySelectorAll('[data-entrance]');
      const targets = marked.length > 0 ? Array.from(marked) : Array.from(root.children);

      if (targets.length > 0) {
        gsap.from(targets, {
          y: 14,
          opacity: 0,
          duration: 0.42,
          stagger: 0.055,
          ease: 'power2.out',
          clearProps: 'all',
        });
      }

      const bars = root.querySelectorAll('.progress-fill');
      if (bars.length > 0) {
        gsap.from(bars, {
          width: 0,
          duration: 0.65,
          delay: 0.2,
          ease: 'power2.out',
        });
      }
    },
    { scope: rootRef },
  );

  return rootRef;
}
