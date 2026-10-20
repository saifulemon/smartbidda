import { Link, Outlet } from 'react-router';

/** Admin design frame — the page owns the console sidebar and top bar. */
export default function AdminLayout() {
  return (
    <div className="min-h-dvh w-full bg-background" data-testid="admin-layout">
      <Link to="/" className="sr-only" data-testid="layout-home-link">স্মার্টবিদ্যা<span className="sr-only"> brand logo</span></Link>
      <Outlet />
    </div>
  );
}
