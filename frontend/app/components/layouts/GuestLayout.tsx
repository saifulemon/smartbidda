import { Link } from 'react-router';
import PageEntrance from '~/components/shared/PageEntrance';

/** Auth/PIN design frame — the login protos are chrome-less centered columns. */
export default function GuestLayout() {
  return (
    <div className="min-h-dvh w-full" data-testid="guest-layout">
      <Link to="/" className="sr-only" data-testid="layout-home-link">স্মার্টবিদ্যা<span className="sr-only"> brand logo</span></Link>
      <PageEntrance />
    </div>
  );
}
