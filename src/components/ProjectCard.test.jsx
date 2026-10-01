import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ProjectCard } from './ProjectCard'

const baseProject = {
  slug: 'micromart',
  title: 'MicroMart',
  subtitle: 'An e-commerce platform',
  summary: 'A summary of the project.',
  accentLabel: 'E-commerce',
  technologies: ['Django', 'React'],
  githubUrl: 'https://github.com/example/repo',
  liveUrl: '',
  coverImage: null,
}

function renderCard(overrides = {}) {
  return render(
    <MemoryRouter>
      <ProjectCard project={{ ...baseProject, ...overrides }} />
    </MemoryRouter>,
  )
}

describe('ProjectCard', () => {
  it('renders the project details', () => {
    renderCard()

    expect(screen.getByText('MicroMart')).toBeInTheDocument()
    expect(screen.getByText('An e-commerce platform')).toBeInTheDocument()
    expect(screen.getByText('Django')).toBeInTheDocument()
  })

  it('links to the case study', () => {
    renderCard()

    expect(
      screen.getByRole('link', { name: 'MicroMart' }),
    ).toHaveAttribute('href', '/projects/micromart')
  })

  it('shows a GitHub link when the URL exists', () => {
    renderCard()
    expect(
      screen.getByRole('link', { name: /source on GitHub/i }),
    ).toBeInTheDocument()
  })

  it('hides the live demo link when there is no URL', () => {
    // An undeployed project must not render a dead button.
    renderCard()
    expect(screen.queryByRole('link', { name: /live demo/i })).toBeNull()
  })

  it('shows the live demo link once a URL exists', () => {
    renderCard({ liveUrl: 'https://example.com' })
    expect(
      screen.getByRole('link', { name: /live demo/i }),
    ).toHaveAttribute('href', 'https://example.com')
  })

  it('collapses a long technology list', () => {
    renderCard({
      technologies: [1, 2, 3, 4, 5, 6].map((n) => `Tech${n}`),
    })

    expect(screen.getByText('Tech1')).toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()
    expect(screen.queryByText('Tech6')).toBeNull()
  })
})
