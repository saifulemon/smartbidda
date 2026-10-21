/**
 * not-found.tsx — catch-all 404 page (RULE-F4).
 *
 * Canonical template. Registered as `route("*", "pages/not-found.tsx")` in
 * app/routes.ts so React Router 7 falls through here when no earlier route
 * matches. v54 evidence: without this catch-all, /admin and /dashboard
 * rendered an LLM-generated fallback page with raw i18n keys instead of
 * resolved strings.
 */
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';

export default function NotFoundPage() {
  const { t } = useTranslation('common');
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center"
      data-testid="not-found-page"
    >
      <p className="text-sm uppercase tracking-widest text-muted-foreground">৪০৪</p>
      <h1 className="text-3xl font-semibold sm:text-4xl">
        {t('notFound.title', 'পাতাটি পাওয়া যায়নি')}
      </h1>
      <p className="max-w-md text-base text-muted-foreground">
        {t(
          'notFound.description',
          'আপনি যে পাতাটি খুঁজছেন সেটি নেই। এটি সরানো বা স্থানান্তরিত হয়ে থাকতে পারে।',
        )}
      </p>
      <Button asChild data-testid="not-found-home-link">
        <Link to="/">{t('notFound.backToHome', 'হোমে ফিরে যান')}</Link>
      </Button>
    </main>
  );
}
