import { afterEach, describe, expect, it, vi } from 'vitest'

import { contactMode, sendContact } from './contact'

const message = {
  name: ' Ada ',
  email: 'ada@example.com',
  subject: 'A role',
  message: 'I would like to talk about a role.',
  website: '',
}

function mockFetch(status, body) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('sendContact', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('is wired to Web3Forms out of the box', () => {
    // The live site must send real messages with no environment setup.
    expect(contactMode).toBe('web3forms')
  })

  it('posts the trimmed message with the access key and no honeypot', async () => {
    const fetchMock = mockFetch(200, { success: true })

    await sendContact(message)

    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.web3forms.com/submit')
    const body = JSON.parse(options.body)
    expect(body.access_key).toMatch(/^[0-9a-f-]{36}$/)
    expect(body).toMatchObject({ name: 'Ada', email: 'ada@example.com', subject: 'A role' })
    expect(body).not.toHaveProperty('website')
  })

  it('treats a rejection in the response body as a failure', async () => {
    mockFetch(200, { success: false, message: 'Invalid access key' })
    await expect(sendContact(message)).rejects.toThrow('could not be sent')
  })

  it('reports rate limiting by status', async () => {
    mockFetch(429, { success: false })
    await expect(sendContact(message)).rejects.toMatchObject({ status: 429 })
  })

  it('reports an unreachable server', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(sendContact(message)).rejects.toMatchObject({ status: 0 })
  })
})
