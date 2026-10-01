// These tests encode the content rules (PRD section 4), so a change that
// breaks a promise to the owner fails the suite rather than shipping.
import { describe, expect, it } from 'vitest'

import {
  coursework,
  education,
  featuredSkills,
  getProject,
  profile,
  projects,
  skillCategories,
} from '@/data'
import { projectSlugs, sitemapRoutes } from '../../build/seo.js'

describe('projects', () => {
  it('has exactly six, in the required order', () => {
    expect(projects.map((project) => project.slug)).toEqual([
      'sellflowbd',
      'medidesk',
      'micromart',
      'servorabd',
      'eduflow',
      'intellichat',
    ])
    expect(projects.map((project) => project.order)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('does not include PromptCanvas anywhere', () => {
    expect(getProject('promptcanvas')).toBeNull()
    expect(JSON.stringify(projects)).not.toMatch(/promptcanvas/i)
  })

  it('gives exactly three projects a live demo', () => {
    const live = projects.filter((project) => project.liveUrl).map((project) => project.slug)
    expect(live.sort()).toEqual(['micromart', 'sellflowbd', 'servorabd'])
  })

  it('gives every project a cover, a GitHub URL and a video URL', () => {
    for (const project of projects) {
      expect(project.coverImage, project.slug).toBeTruthy()
      expect(project.githubUrl, project.slug).toMatch(/^https:\/\/github\.com\/jhraihan\//)
      expect(project.videoUrl, project.slug).toMatch(/^https:\/\/youtu\.be\/[\w-]{11}$/)
    }
  })

  it('gives every screenshot a caption and alt text', () => {
    for (const project of projects) {
      expect(project.images.length, project.slug).toBeGreaterThan(0)
      // Thumbnails must never download the full 1600px capture.
      expect(project.coverSrcSet, project.slug).toMatch(/ 800w, .+ 1600w$/)
      for (const image of project.images) {
        expect(image.src).toBeTruthy()
        expect(image.srcSet).toMatch(/ 800w, .+ 1600w$/)
        expect(image.caption).toBeTruthy()
        expect(image.alt).toBeTruthy()
      }
    }
  })

  it('fills every case study section for every project', () => {
    for (const project of projects) {
      for (const key of ['summary', 'problem', 'solution', 'architecture', 'challenges', 'lessons']) {
        expect(project[key]?.trim(), `${project.slug}.${key}`).toBeTruthy()
      }
      expect(project.features.length, project.slug).toBeGreaterThan(0)
      expect(project.technologies.length, project.slug).toBeGreaterThan(0)
    }
  })

  it('marks every project as solo and completed', () => {
    for (const project of projects) {
      expect(project.isSolo).toBe(true)
      expect(project.status).toBe('completed')
    }
  })

  it('leaves no content placeholder in the copy', () => {
    expect(JSON.stringify(projects)).not.toMatch(/CONTENT NEEDED|lorem ipsum|TODO/i)
  })

  it('frames the ServoraBD figures as local measurements, never live usage', () => {
    const servora = getProject('servorabd')
    const text = [servora.architecture, servora.lessons].join(' ')
    expect(text).toMatch(/Measured locally against 10,018 seeded providers/)
    expect(text).toMatch(/illustrative provider profiles/)
    expect(text).not.toMatch(/\b(users|customers) (trust|use|rely)/i)
  })

  it('keeps the sitemap in step with the data', () => {
    expect(projectSlugs()).toEqual(projects.map((project) => project.slug))
    expect(sitemapRoutes()).toHaveLength(4 + projects.length)
  })
})

describe('skills', () => {
  const allSkills = skillCategories.flatMap((category) => category.skills)

  it('has six categories', () => {
    expect(skillCategories.map((category) => category.name)).toEqual([
      'Languages',
      'Backend',
      'Frontend',
      'Databases',
      'DevOps and Deployment',
      'Tools',
    ])
  })

  it('never exposes a numeric level', () => {
    // A percentage bar implies a precision that does not exist.
    const levels = new Set(['core', 'strong', 'working', 'familiar'])
    for (const skill of allSkills) {
      expect(levels.has(skill.level), skill.name).toBe(true)
      expect(typeof skill.levelDisplay).toBe('string')
      expect(Object.values(skill).some((value) => typeof value === 'number')).toBe(false)
    }
  })

  it('surfaces the five featured skills', () => {
    expect(featuredSkills.map((skill) => skill.name).sort()).toEqual(
      ['Django', 'Django REST Framework', 'MySQL', 'Python', 'React'],
    )
  })

  it('lists no AI or ML skills', () => {
    const names = allSkills.map((skill) => skill.name).join(' | ')
    expect(names).not.toMatch(/\b(RAG|embedding|vector|LangChain|agent|fine-?tun|machine learning|ML)\b/i)
  })

  it('lists the strongest skills first within each category', () => {
    const rank = { core: 0, strong: 1, working: 2, familiar: 3 }
    for (const category of skillCategories) {
      const ranks = category.skills.map((skill) => rank[skill.level])
      expect(ranks, category.name).toEqual([...ranks].sort((a, b) => a - b))
    }
  })
})

describe('profile and education', () => {
  it('publishes the confirmed identity and links', () => {
    expect(profile.displayName).toBe('Md. Jahid Hasan Raihan')
    expect(profile.title).toBe('Software Engineer')
    expect(profile.email).toBe('jahidhr05@gmail.com')
    expect(profile.resume).toBe('/resume.pdf')
  })

  it('never stores the CGPA, so it cannot be rendered', () => {
    const everything = JSON.stringify({ profile, education, coursework })
    expect(everything).not.toMatch(/3\.30|cgpa|gpa/i)
  })

  it('carries no excluded content', () => {
    const everything = JSON.stringify({ profile, projects, education })
    expect(everything).not.toMatch(/currently learning ai/i)
    expect(everything).not.toMatch(/years of experience/i)
    // LeetCode is a footer link only; no solved count.
    expect(everything).not.toMatch(/problems solved|solved \d+/i)
  })

  it('has seven coursework subjects', () => {
    expect(coursework).toHaveLength(7)
  })
})
