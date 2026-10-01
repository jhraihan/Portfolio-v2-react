// Site-wide constants.
//
// SITE_URL is resolved at build time in vite.config.js: an explicit
// VITE_SITE_URL wins, otherwise Vercel's production domain is used, so the
// canonical link, Open Graph URLs and sitemap always name the real domain
// rather than a placeholder.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '')

export const SITE_NAME = 'Md. Jahid Hasan Raihan'
