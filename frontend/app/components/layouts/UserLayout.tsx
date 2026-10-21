import { Link } from 'react-router';
import PageEntrance from '~/components/shared/PageEntrance';

/**
 * Mobile design frame. Every converted page carries the design's own app bar,
 * tab bar and (for admin) sidebar, so the layout must not add a second web
 * navbar. It only owns the width and the Outlet.
 */
export default function UserLayout() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-background" data-testid="user-layout">
      <Link to="/" className="sr-only" data-testid="layout-home-link">স্মার্টবিদ্যা<span className="sr-only"> brand logo</span></Link>
      <PageEntrance />
    </div>
  );
}
