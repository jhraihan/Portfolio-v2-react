import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { projects } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

// Only technologies worth filtering by. Listing every one turns the filter
// into a wall of buttons that nobody reads.
const FILTER_PRIORITY = [
  'Django',
  'Django REST Framework',
  'React',
  'MySQL',
  'PostgreSQL',
  'Python',
  'JavaScript',
  'JWT',
  'Tailwind CSS',
]

/** 'Django REST Framework' -> 'django-rest-framework', for readable URLs. */
export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Offer a filter only if at least one project actually uses it, so no button
// can ever lead to an empty result.
const used = new Set(projects.flatMap((project) => project.technologies))
const FILTERS = FILTER_PRIORITY.filter((name) => used.has(name)).map((name) => ({
  name,
  slug: slugify(name),
}))

export function Projects() {
  useDocumentTitle(
    'Projects',
    'Full-stack applications built with Django, Django REST Framework, React, and PostgreSQL.',
  )

  // The active filter lives in the URL, so a filtered view is shareable and
  // survives a refresh or a back navigation.
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTech = searchParams.get('tech') || ''

  const visible = useMemo(
    () =>
      activeTech
        ? projects.filter((project) =>
            project.technologies.some((tech) => slugify(tech) === activeTech),
          )
        : projects,
    [activeTech],
  )

  const setFilter = (slug) => {
    setSearchParams(slug ? { tech: slug } : {})
  }

  const buttonClass = (active) =>
    `rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
      active
        ? 'border-accent bg-accent/[0.08] text-ink'
        : 'border-line text-ink-muted hover:border-line-strong hover:text-ink'
    }`

  return (
    <div className="section">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Work
          </p>
          <h1 className="mt-4 text-display font-bold text-ink">Projects</h1>
          <p className="prose-body mt-5 max-w-prose text-pretty">
            Six applications, each built end to end. Every one handles
            authentication, role-based access, and a relational schema behind a
            REST API — and each case study covers the architecture and the
            hardest problem it presented.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mt-10 flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter by technology"
          >
            <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              Filter
            </span>

            <button
              type="button"
              onClick={() => setFilter('')}
              aria-pressed={!activeTech}
              className={buttonClass(!activeTech)}
            >
              All
            </button>

            {FILTERS.map((tech) => (
              <button
                key={tech.slug}
                type="button"
                onClick={() => setFilter(tech.slug)}
                aria-pressed={activeTech === tech.slug}
                className={buttonClass(activeTech === tech.slug)}
              >
                {tech.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12" aria-live="polite">
          {visible.length === 0 ? (
            <div className="rounded-card border border-dashed border-line bg-surface px-6 py-16 text-center">
              <p className="text-ink">No projects use that technology.</p>
              <button
                type="button"
                onClick={() => setFilter('')}
                className="btn-secondary mt-5"
              >
                Show all projects
              </button>
            </div>
          ) : (
            <>
              <p className="mb-6 font-mono text-xs text-ink-faint">
                {visible.length} {visible.length === 1 ? 'project' : 'projects'}
                {activeTech && ' matching filter'}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((project, index) => (
                  <Reveal key={project.slug} delay={Math.min(index * 0.05, 0.25)}>
                    <ProjectCard project={project} index={index} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
