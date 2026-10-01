import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { CommandPalette } from './CommandPalette'

const projects = [
  { slug: 'micromart', title: 'MicroMart', subtitle: 'E-commerce platform' },
  { slug: 'eduflow', title: 'EduFlow', subtitle: 'Learning management' },
]

const profile = {
  githubUrl: 'https://github.com/example',
  email: 'test@example.com',
}

function renderPalette(props = {}) {
  return render(
    <MemoryRouter>
      <CommandPalette
        open
        onClose={vi.fn()}
        projects={projects}
        profile={profile}
        theme="dark"
        onToggleTheme={vi.fn()}
        {...props}
      />
    </MemoryRouter>,
  )
}

describe('CommandPalette', () => {
  it('renders nothing while closed', () => {
    const { container } = render(
      <MemoryRouter>
        <CommandPalette open={false} onClose={vi.fn()} projects={projects} />
      </MemoryRouter>,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('lists navigation and every project', () => {
    renderPalette()

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('MicroMart')).toBeInTheDocument()
    expect(screen.getByText('EduFlow')).toBeInTheDocument()
  })

  it('filters as the user types', async () => {
    const user = userEvent.setup()
    renderPalette()

    await user.type(screen.getByRole('textbox'), 'micro')

    expect(screen.getByText('MicroMart')).toBeInTheDocument()
    expect(screen.queryByText('EduFlow')).toBeNull()
  })

  it('reports when nothing matches', async () => {
    const user = userEvent.setup()
    renderPalette()

    await user.type(screen.getByRole('textbox'), 'zzzznomatch')

    expect(screen.getByText(/No matches/)).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderPalette({ onClose })

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalled()
  })

  it('omits links the profile does not have', () => {
    renderPalette({ profile: { email: 'test@example.com' } })

    expect(screen.queryByText('Open GitHub')).toBeNull()
    expect(screen.queryByText('Open LinkedIn')).toBeNull()
  })

  it('builds its case studies from the data module', async () => {
    // A new project must appear without touching the palette.
    const { projects: all } = await import('@/data')
    renderPalette({ projects: all })

    for (const project of all) {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    }
    expect(screen.queryByText(/PromptCanvas/i)).toBeNull()
  })
})
