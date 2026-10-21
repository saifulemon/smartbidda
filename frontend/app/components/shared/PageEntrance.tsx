import { Outlet, useLocation } from 'react-router';
import { usePageEntrance } from '~/hooks/usePageEntrance';

/**
 * Route-level entrance animation wrapper.
 *
 * Remounts on every pathname change so each navigation replays the entrance,
 * and scopes the GSAP selectors to the routed page only.
 */
export default function PageEntrance() {
  const { pathname } = useLocation();
  return <EntranceFrame key={pathname} />;
}

function EntranceFrame() {
  const ref = usePageEntrance<HTMLDivElement>();
  return (
    <div ref={ref} data-page-entrance>
      <Outlet />
    </div>
  );
}
