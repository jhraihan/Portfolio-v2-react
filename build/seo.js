// Build-time SEO: the site's public origin, sitemap.xml and robots.txt.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/**
 * The public origin, used for the canonical link, Open Graph URLs and the
 * sitemap. An explicit VITE_SITE_URL wins; otherwise Vercel's production
 * domain, which Vercel sets on every build and which switches to a custom
 * domain automatically once one is added. Local builds fall back to the
 * preview server, so no placeholder domain can ever ship.
 */
export function resolveSiteUrl(env = process.env) {
  let url = 'http://localhost:4173'
  if (env.VITE_SITE_URL) url = env.VITE_SITE_URL
  else if (env.VERCEL_PROJECT_PRODUCTION_URL) url = `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  return url.replace(/\/$/, '')
}

/**
 * Reads the project slugs straight from the data module, so a new case study
 * appears in the sitemap without anyone remembering to add it. (The module
 * itself imports images, so it is read as text rather than imported.)
 */
export function projectSlugs() {
  const source = fs.readFileSync(path.join(ROOT, 'src/data/projects.js'), 'utf8')
  return [...source.matchAll(/^\s{4}slug: '([^']+)',$/gm)].map((match) => match[1])
}

export function sitemapRoutes() {
  return ['/', '/projects', '/about', '/contact', ...projectSlugs().map((slug) => `/projects/${slug}`)]
}

/** Vite plugin: injects the origin into index.html, emits sitemap and robots. */
export function seo(siteUrl) {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', siteUrl)
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = sitemapRoutes()
        .map((route) => `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}
