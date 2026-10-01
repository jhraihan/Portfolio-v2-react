import { useEffect } from 'react'

import { SITE_NAME, SITE_URL } from '@/config'

/** Finds a <meta> or <link> in the head, creating it if absent. */
function upsert(selector, create) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = create()
    document.head.appendChild(element)
  }
  return element
}

function setMeta(attribute, key, content) {
  upsert(`meta[${attribute}="${key}"]`, () => {
    const meta = document.createElement('meta')
    meta.setAttribute(attribute, key)
    return meta
  }).setAttribute('content', content)
}

/**
 * Sets the document title and meta description for a page, and keeps the
 * Open Graph, Twitter and canonical tags in step with them so a shared link
 * previews the page it points at rather than the home page.
 */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Software Engineer`
    document.title = fullTitle
    setMeta('property', 'og:title', fullTitle)
    setMeta('name', 'twitter:title', fullTitle)

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }

    const origin = SITE_URL || window.location.origin
    const url = `${origin}${window.location.pathname}`
    setMeta('property', 'og:url', url)
    upsert('link[rel="canonical"]', () => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      return link
    }).setAttribute('href', url)
  }, [title, description])
}
