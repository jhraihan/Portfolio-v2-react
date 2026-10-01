import { profile } from '@/data'

// The contact form posts to a third-party form service, since there is no
// backend. Both ids are public by design and rate-limited by the provider, so
// they are safe to inline at build time.
//
//   VITE_CONTACT_ENDPOINT       a Formspree URL, e.g. https://formspree.io/f/abcdwxyz
//   VITE_WEB3FORMS_ACCESS_KEY   a Web3Forms access key (used if set)
//
// With neither set, the form still works: it opens the visitor's mail app
// with the message already written, so it is never a dead button.
const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || ''
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

export const contactMode = WEB3FORMS_KEY
  ? 'web3forms'
  : FORM_ENDPOINT
    ? 'endpoint'
    : 'mailto'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Client-side validation. The rules and messages are the ones the v1 API
 * enforced, so the form behaves exactly as it did with a backend behind it.
 * Returns an object of field -> message; empty when the form is valid.
 */
export function validateContact({ name, email, subject, message }) {
  const errors = {}
  const trimmedName = name.trim()
  const trimmedSubject = subject.trim()
  const trimmedMessage = message.trim()

  if (!trimmedName) errors.name = 'Please enter your name.'
  else if (trimmedName.length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (trimmedName.length > 120) errors.name = 'Name must be under 120 characters.'

  if (!email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Enter a valid email address.'

  if (!trimmedSubject) errors.subject = 'Please enter a subject.'
  else if (trimmedSubject.length < 3) errors.subject = 'Subject must be at least 3 characters.'
  else if (trimmedSubject.length > 200) errors.subject = 'Subject must be under 200 characters.'

  if (!trimmedMessage) errors.message = 'Please enter a message.'
  else if (trimmedMessage.length < 10) errors.message = 'Message must be at least 10 characters.'
  else if (trimmedMessage.length > 5000) errors.message = 'Message must be under 5000 characters.'

  return errors
}

/** A mailto: link carrying the whole message, for the no-endpoint fallback. */
export function buildMailto({ name, email, subject, message }) {
  const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`
  return `mailto:${profile.email}?subject=${encodeURIComponent(
    subject.trim(),
  )}&body=${encodeURIComponent(body)}`
}

export class ContactError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

/** Sends a validated message to the configured form service. */
export async function sendContact({ name, email, subject, message }) {
  const fields = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  }

  const [url, body] =
    contactMode === 'web3forms'
      ? [
          'https://api.web3forms.com/submit',
          { ...fields, access_key: WEB3FORMS_KEY, from_name: 'Portfolio contact form' },
        ]
      : [FORM_ENDPOINT, { ...fields, _subject: fields.subject }]

  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new ContactError('Could not reach the server. Check your connection and try again.', 0)
  }

  if (!response.ok) {
    throw new ContactError('Your message could not be sent.', response.status)
  }
}
