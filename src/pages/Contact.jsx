import { useRef, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { profile } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import {
  buildMailto,
  contactMode,
  sendContact,
  validateContact,
} from '@/lib/contact'

const EMPTY_FORM = { name: '', email: '', subject: '', message: '', website: '' }

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
]

const inputClass = (hasError) =>
  `mt-2 w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 ${
    hasError ? 'border-accent' : 'border-line focus:border-accent'
  }`

// Only links that exist are rendered; email is always first, so the form is
// never the only way to get in touch.
const contactLinks = [
  profile.email && {
    href: `mailto:${profile.email}`,
    label: profile.email,
    Icon: Mail,
    external: false,
  },
  profile.githubUrl && {
    href: profile.githubUrl,
    label: 'GitHub',
    Icon: Github,
    external: true,
  },
  profile.linkedinUrl && {
    href: profile.linkedinUrl,
    label: 'LinkedIn',
    Icon: Linkedin,
    external: true,
  },
].filter(Boolean)

export function Contact() {
  useDocumentTitle(
    'Contact',
    'Get in touch about roles, projects, or collaboration.',
  )

  const [form, setForm] = useState(EMPTY_FORM)
  // idle | sending | success | handoff | error
  const [status, setStatus] = useState('idle')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const formRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))

    // Clear a field's error as soon as the user edits it.
    if (fieldErrors[name]) {
      setFieldErrors((current) => {
        const next = { ...current }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return

    setFormError('')

    const errors = validateContact(form)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setFormError('Please correct the highlighted fields.')
      setStatus('error')
      // Move focus to the first invalid field so keyboard and screen reader
      // users land on the problem rather than hunting for it.
      const first = Object.keys(errors)[0]
      formRef.current?.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    setFieldErrors({})

    // Honeypot tripped: a person cannot see this field, so only a bot fills
    // it. Report success and send nothing, so the bot learns nothing.
    if (form.website) {
      setStatus('success')
      setForm(EMPTY_FORM)
      return
    }

    if (contactMode === 'mailto') {
      window.location.href = buildMailto(form)
      setStatus('handoff')
      return
    }

    setStatus('sending')
    try {
      await sendContact(form)
      setStatus('success')
      setForm(EMPTY_FORM)
    } catch (error) {
      setStatus('error')
      setFormError(
        error.status === 429
          ? 'Too many messages sent recently. Please try again later, or email me directly.'
          : `${error.message} Please try again, or email me directly at ${profile.email}.`,
      )
    }
  }

  const sent = status === 'success' || status === 'handoff'

  return (
    <div className="section">
      <div className="container-content">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
          <div className="min-w-0 max-w-xl">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h1 className="mt-3 text-display font-bold text-ink">
                Get in touch
              </h1>
              <p className="prose-body mt-5 text-pretty">
                Whether it is a role, a project, or a question about something I
                have built — send a message and I will reply.
              </p>
            </Reveal>

            {sent ? (
              <div
                className="mt-10 rounded-card border border-accent/40 bg-accent/5 p-8 text-center"
                role="status"
              >
                <CheckCircle2
                  className="mx-auto h-8 w-8 text-accent"
                  aria-hidden="true"
                />
                <h2 className="mt-4 text-heading font-semibold text-ink">
                  {status === 'handoff' ? 'Almost there' : 'Message sent'}
                </h2>
                <p className="prose-body mt-2 text-sm">
                  {status === 'handoff' ? (
                    <>
                      Your email app should now be open with the message
                      written. If it did not open, email me directly at{' '}
                      <a href={`mailto:${profile.email}`} className="link-underline">
                        {profile.email}
                      </a>
                      .
                    </>
                  ) : (
                    'Thanks for reaching out. I will get back to you soon.'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-secondary mt-6"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <Reveal delay={0.08}>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="mt-10 space-y-5"
                  noValidate
                  aria-label="Contact form"
                >
                  {formError && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-lg border border-accent/40 bg-accent/5 px-4 py-3"
                    >
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <p className="text-sm text-ink">{formError}</p>
                    </div>
                  )}

                  {FIELDS.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-ink"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={form[field.name]}
                        onChange={handleChange}
                        required
                        autoComplete={field.autoComplete}
                        aria-invalid={Boolean(fieldErrors[field.name])}
                        aria-describedby={
                          fieldErrors[field.name]
                            ? `${field.name}-error`
                            : undefined
                        }
                        className={inputClass(fieldErrors[field.name])}
                      />
                      {fieldErrors[field.name] && (
                        <p
                          id={`${field.name}-error`}
                          className="mt-1.5 text-xs text-accent"
                        >
                          {fieldErrors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-ink"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      required
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={
                        fieldErrors.message ? 'message-error' : undefined
                      }
                      className={`${inputClass(fieldErrors.message)} resize-y`}
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-accent">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot: hidden from users, irresistible to bots. */}
                  <div className="absolute left-[-9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      value={form.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {status === 'sending' ? (
                      <>
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                          aria-hidden="true"
                        />
                        Sending
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              </Reveal>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={0.12}>
              <div className="card p-6">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  Direct
                </h2>

                <ul className="mt-5 space-y-3">
                  {contactLinks.map(({ href, label, Icon, external }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer noopener' : undefined}
                        className="inline-flex items-center gap-2.5 break-all text-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>

                {profile.location && (
                  <p className="mt-6 inline-flex items-center gap-2 border-t border-line pt-5 font-mono text-xs text-ink-faint">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {profile.location}
                  </p>
                )}

                {profile.availability && (
                  <p className="mt-3 text-sm text-ink-muted">
                    {profile.availability}
                  </p>
                )}
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </div>
  )
}
