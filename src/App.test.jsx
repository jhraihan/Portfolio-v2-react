// Every route renders its content on the first pass — there is no API to
// wait for — with one h1, a main landmark, and the hiding rule applied.
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import App from './App'
import { projects } from '@/data'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

const ROUTES = ['/', '/projects', '/about', '/contact', ...projects.map((p) => `/projects/${p.slug}`), '/nope']

describe('routes', () => {
  it.each(ROUTES)('%s renders exactly one h1 inside main', (path) => {
    const { container } = renderAt(path)

    expect(container.querySelectorAll('h1')).toHaveLength(1)
    expect(within(screen.getByRole('main')).getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('offers a skip link as the first focusable element', () => {
    const { container } = renderAt('/')
    const first = container.querySelector('a, button, input, textarea, [tabindex]')
    expect(first).toHaveTextContent('Skip to content')
    expect(first).toHaveAttribute('href', '#main')
  })

  it('renders every project on the home page without waiting for data', () => {
    renderAt('/')
    for (const project of projects) {
      expect(screen.getByRole('link', { name: project.title })).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Md. Jahid Hasan Raihan')
  })

  it('never shows the CGPA or a stat counter', () => {
    const { container } = renderAt('/about')
    expect(container.textContent).not.toMatch(/CGPA|3\.30/)
  })

  it.each(projects.map((p) => [p.slug, Boolean(p.liveUrl)]))(
    '%s shows a live demo button only when it has a URL',
    (slug, hasLive) => {
      renderAt(`/projects/${slug}`)
      const main = screen.getByRole('main')
      const demo = within(main).queryByRole('link', { name: /^live demo$/i })
      expect(Boolean(demo)).toBe(hasLive)
    },
  )

  it('numbers case study sections consecutively and embeds the walkthrough', () => {
    const { container } = renderAt('/projects/sellflowbd')

    const headings = [...container.querySelectorAll('main h2')].map((h) => h.textContent)
    expect(headings).toEqual(
      expect.arrayContaining(['The problem', 'The approach', 'Features', 'Architecture', 'Hardest problem', 'What I learned']),
    )
    const numbers = [...container.querySelectorAll('main h2')]
      .map((h) => h.previousElementSibling?.textContent)
      .filter(Boolean)
    expect(numbers).toEqual(['01', '02', '03', '04', '05', '06'])

    expect(screen.getByTitle('SellFlow BD walkthrough')).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/4FBawFRC9EY',
    )
  })

  it('shows a not-found page with a way back for an unknown project', () => {
    renderAt('/projects/promptcanvas')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Project not found')
    expect(screen.getByRole('link', { name: /all projects/i })).toHaveAttribute('href', '/projects')
  })

  it('filters projects by technology from the URL', () => {
    renderAt('/projects?tech=mysql')
    expect(screen.getByText('1 project matching filter')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'MySQL' })).toHaveAttribute('aria-pressed', 'true')
  })
})
