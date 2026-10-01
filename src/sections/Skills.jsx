import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Spotlight } from '@/components/Spotlight'
import { coursework, skillCategories, SKILL_LEVELS } from '@/data'

// Named levels rather than percentages: a bar implies precision that does not
// exist, and invites a comparison nobody wins.
const LEVEL_STYLES = {
  core: 'border-accent/60 bg-accent/[0.12] text-accent',
  strong: 'border-line-strong bg-elevated text-ink',
  working: 'border-line bg-transparent text-ink-muted',
  familiar: 'border-line/60 bg-transparent text-ink-faint',
}

// Category accents, used only on the label so the grid reads as grouped.
const CATEGORY_TONE = {
  Languages: 'text-accent',
  Backend: 'text-violet',
  Frontend: 'text-pink',
  Databases: 'text-green',
  'DevOps and Deployment': 'text-amber',
  Tools: 'text-ink-muted',
}

export function Skills() {
  return (
    <section className="section border-t border-line bg-surface" id="skills">
      <div className="container-content">
        <SectionHeading
          eyebrow="Technical"
          title="What I work with"
          description="Grouped by how I actually use them, not by how impressive the list looks. Nothing here is listed above the level I can defend in an interview."
        />

        <Reveal delay={0.05}>
          <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
            {Object.entries(SKILL_LEVELS).map(([level, label]) => (
              <li
                key={level}
                className="inline-flex items-center gap-2 font-mono text-[11px] text-ink-faint"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-sm border ${LEVEL_STYLES[level]}`}
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal key={category.name} delay={Math.min(index * 0.05, 0.25)}>
              <Spotlight className="card ring-gradient group h-full p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
                      CATEGORY_TONE[category.name] || 'text-accent'
                    }`}
                  >
                    {category.name}
                  </h3>
                  <span className="font-mono text-[10px] tabular text-ink-faint">
                    {String(category.skills.length).padStart(2, '0')}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs transition-colors ${
                        LEVEL_STYLES[skill.level] || LEVEL_STYLES.working
                      }`}
                      title={`${skill.name} — ${skill.levelDisplay}`}
                    >
                      {skill.name}
                      {/* The level is carried by colour on screen; spell it
                          out for screen readers. */}
                      <span className="sr-only">, {skill.levelDisplay}</span>
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-5 rounded-card border border-dashed border-line bg-canvas p-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
              Studied at university
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {coursework.map((subject) => (
                <li key={subject} className="tag">
                  {subject}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
