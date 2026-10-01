import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ArchitectureDiagram, hasDiagram } from './ArchitectureDiagram'
import { projects } from '@/data'

describe('ArchitectureDiagram', () => {
  it('renders the flow for a known project', () => {
    render(<ArchitectureDiagram slug="intellichat" />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Django')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('Streaming response path')).toBeInTheDocument()
  })

  it('renders an external service as a branch when one exists', () => {
    render(<ArchitectureDiagram slug="intellichat" />)
    expect(screen.getByText('Gemini API')).toBeInTheDocument()
  })

  it('omits the branch for projects with no external service', () => {
    render(<ArchitectureDiagram slug="eduflow" />)

    expect(screen.getByText('DRF')).toBeInTheDocument()
    expect(screen.queryByText('Gemini API')).toBeNull()
  })

  it('draws the two new projects with their branches', () => {
    const { unmount } = render(<ArchitectureDiagram slug="sellflowbd" />)
    expect(screen.getByText('tenant-scoped')).toBeInTheDocument()
    expect(screen.getByText('Courier APIs')).toBeInTheDocument()
    unmount()

    render(<ArchitectureDiagram slug="servorabd" />)
    expect(screen.getByText('Trust engine')).toBeInTheDocument()
    expect(screen.getByText('scheduled recompute')).toBeInTheDocument()
  })

  it('renders nothing for an unknown project rather than an empty frame', () => {
    const { container } = render(<ArchitectureDiagram slug="does-not-exist" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('reports which projects have a diagram', () => {
    expect(hasDiagram('micromart')).toBe(true)
    expect(hasDiagram('unknown-project')).toBe(false)
  })

  it('has a diagram for every project, and none for PromptCanvas', () => {
    for (const project of projects) {
      expect(hasDiagram(project.slug)).toBe(true)
    }
    expect(hasDiagram('promptcanvas')).toBe(false)
  })
})
