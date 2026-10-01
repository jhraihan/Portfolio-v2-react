import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Run the form against a configured endpoint, with the network call mocked.
const sendContact = vi.fn()
vi.mock('@/lib/contact', async (importOriginal) => ({
  ...(await importOriginal()),
  contactMode: 'endpoint',
  sendContact: (...args) => sendContact(...args),
}))

const { Contact } = await import('./Contact')
const { buildMailto, validateContact } = await import('@/lib/contact')

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  )
}

async function fillValidForm(user) {
  await user.type(screen.getByLabelText('Name'), 'Ada Lovelace')
  await user.type(screen.getByLabelText('Email'), 'ada@example.com')
  await user.type(screen.getByLabelText('Subject'), 'A role')
  await user.type(screen.getByLabelText('Message'), 'I would like to talk about a role.')
}

describe('Contact form', () => {
  beforeEach(() => {
    sendContact.mockReset()
  })

  it('shows per-field errors linked to their inputs', async () => {
    const user = userEvent.setup()
    renderContact()

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/correct the highlighted fields/i)
    const name = screen.getByLabelText('Name')
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveAttribute('aria-describedby', 'name-error')
    expect(document.getElementById('name-error')).toHaveTextContent('Please enter your name.')
    expect(screen.getByLabelText('Message')).toHaveAttribute('aria-describedby', 'message-error')
    // Focus moves to the first problem.
    expect(name).toHaveFocus()
    expect(sendContact).not.toHaveBeenCalled()
  })

  it('clears a field error as soon as the field is edited', async () => {
    const user = userEvent.setup()
    renderContact()

    await user.click(screen.getByRole('button', { name: /send message/i }))
    await user.type(screen.getByLabelText('Name'), 'A')

    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'false')
    expect(document.getElementById('name-error')).toBeNull()
  })

  it('includes a hidden honeypot field', () => {
    renderContact()

    const honeypot = document.querySelector('input[name="website"]')
    expect(honeypot).toBeInTheDocument()
    expect(honeypot).toHaveAttribute('tabindex', '-1')
    expect(honeypot.closest('[aria-hidden="true"]')).not.toBeNull()
  })

  it('shows the success state after sending, and resets on request', async () => {
    sendContact.mockResolvedValue(undefined)
    const user = userEvent.setup()
    renderContact()

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(sendContact).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Ada Lovelace', email: 'ada@example.com' }),
    )
    expect(await screen.findByText('Message sent')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /send another message/i }))
    expect(screen.getByLabelText('Name')).toHaveValue('')
  })

  it('reports a failed send without losing what was typed', async () => {
    sendContact.mockRejectedValue(Object.assign(new Error('Your message could not be sent.'), { status: 500 }))
    const user = userEvent.setup()
    renderContact()

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/email me directly at jahidhr05@gmail.com/)
    expect(screen.getByLabelText('Name')).toHaveValue('Ada Lovelace')
  })

  it('sends nothing when the honeypot is filled', async () => {
    const user = userEvent.setup()
    renderContact()

    await fillValidForm(user)
    await user.type(document.querySelector('input[name="website"]'), 'spam.example')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(sendContact).not.toHaveBeenCalled()
    expect(screen.getByText('Message sent')).toBeInTheDocument()
  })

  it('always offers direct email beside the form', () => {
    renderContact()
    expect(screen.getByRole('link', { name: 'jahidhr05@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:jahidhr05@gmail.com',
    )
  })
})

describe('validateContact', () => {
  const valid = { name: 'Ada', email: 'ada@example.com', subject: 'Hello', message: 'A long enough message.' }

  it('accepts a valid message', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('applies the v1 length rules', () => {
    expect(validateContact({ ...valid, name: 'A' }).name).toMatch(/at least 2/)
    expect(validateContact({ ...valid, subject: 'Hi' }).subject).toMatch(/at least 3/)
    expect(validateContact({ ...valid, message: 'short' }).message).toMatch(/at least 10/)
    expect(validateContact({ ...valid, message: 'x'.repeat(5001) }).message).toMatch(/under 5000/)
    expect(validateContact({ ...valid, email: 'not-an-email' }).email).toMatch(/valid email/)
  })
})

describe('buildMailto', () => {
  it('carries the whole message to the owner', () => {
    const href = buildMailto({ name: 'Ada', email: 'ada@example.com', subject: 'A role', message: 'Hello there.' })
    expect(href.startsWith('mailto:jahidhr05@gmail.com?subject=A%20role&body=')).toBe(true)
    expect(decodeURIComponent(href.split('body=')[1])).toBe('Hello there.\n\n— Ada (ada@example.com)')
  })
})
