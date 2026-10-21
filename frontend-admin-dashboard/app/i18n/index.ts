/**
 * i18n/index.ts — react-i18next initialization.
 *
 * Wired into ~/root.tsx via `import './i18n'`. After that, every component
 * can `useTranslation('namespace')` and reference keys.
 *
 * v54 evidence: signup page rendered raw `auth.signup.title` keys because
 * the LLM imported useTranslation but never initialized i18next. This file
 * removes that gap by being the single canonical init point.
 *
 * Add new namespaces by:
 *   1. Creating locales/<lang>/<namespace>.json with the key-value pairs
 *   2. Adding the import + resource entry below
 *
 * Default locale + supported list mirror the FSP PRD (ko default, en fallback).
 * Override via VITE_DEFAULT_LOCALE in .env.
 */
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// i18n-scaffold-imports-start
import actionsBn from './locales/bn/actions.json';
import authBn from './locales/bn/auth.json';
import brandBn from './locales/bn/brand.json';
import commonBn from './locales/bn/common.json';
import emptyBn from './locales/bn/empty.json';
import errorsBn from './locales/bn/errors.json';
import navBn from './locales/bn/nav.json';
import notFoundBn from './locales/bn/notFound.json';
import paginationBn from './locales/bn/pagination.json';
import actionsEn from './locales/en/actions.json';
import authEn from './locales/en/auth.json';
import brandEn from './locales/en/brand.json';
import commonEn from './locales/en/common.json';
import emptyEn from './locales/en/empty.json';
import errorsEn from './locales/en/errors.json';
import navEn from './locales/en/nav.json';
import notFoundEn from './locales/en/notFound.json';
import paginationEn from './locales/en/pagination.json';
import actionsKo from './locales/ko/actions.json';
import authKo from './locales/ko/auth.json';
import brandKo from './locales/ko/brand.json';
import commonKo from './locales/ko/common.json';
import emptyKo from './locales/ko/empty.json';
import errorsKo from './locales/ko/errors.json';
import navKo from './locales/ko/nav.json';
import notFoundKo from './locales/ko/notFound.json';
import paginationKo from './locales/ko/pagination.json';
// i18n-scaffold-imports-end

const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE || 'bn';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // i18n-scaffold-resources-start
    resources: {
      bn: { actions: actionsBn, auth: authBn, brand: brandBn, common: commonBn, empty: emptyBn, errors: errorsBn, nav: navBn, notFound: notFoundBn, pagination: paginationBn },
      en: { actions: actionsEn, auth: authEn, brand: brandEn, common: commonEn, empty: emptyEn, errors: errorsEn, nav: navEn, notFound: notFoundEn, pagination: paginationEn },
      ko: { actions: actionsKo, auth: authKo, brand: brandKo, common: commonKo, empty: emptyKo, errors: errorsKo, nav: navKo, notFound: notFoundKo, pagination: paginationKo },
    },
    // i18n-scaffold-resources-end
    // Active language reads a stored preference first (set by the language toggle,
    // or by the story suite as i18nextLng=en), falling back to defaultLocale. SSR +
    // a no-preference user get defaultLocale (no hydration mismatch); only an explicit
    // override differs. Without this, `lng: defaultLocale` overrides LanguageDetector
    // so the app is locked to one locale — English story specs can't then match a
    // Korean-default page (RULE-T6).
    lng: (typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem('i18nextLng')) || defaultLocale,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'auth', 'errors'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
