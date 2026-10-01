// Six categories, strongest first within each. Levels are named, never
// numeric: a percentage bar implies a precision that does not exist.

export const SKILL_LEVELS = {
  core: 'Core',
  strong: 'Strong',
  working: 'Working knowledge',
  familiar: 'Familiar',
}

export const skillCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'Python', level: 'core', levelDisplay: 'Core', featured: true },
      { name: 'SQL', level: 'strong', levelDisplay: 'Strong' },
      { name: 'HTML', level: 'strong', levelDisplay: 'Strong' },
      { name: 'CSS', level: 'strong', levelDisplay: 'Strong' },
      { name: 'JavaScript', level: 'working', levelDisplay: 'Working knowledge' },
      { name: 'Java', level: 'familiar', levelDisplay: 'Familiar' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Django', level: 'core', levelDisplay: 'Core', featured: true },
      { name: 'Django REST Framework', level: 'core', levelDisplay: 'Core', featured: true },
      { name: 'Django ORM', level: 'core', levelDisplay: 'Core' },
      { name: 'REST API design', level: 'strong', levelDisplay: 'Strong' },
      { name: 'Authentication (JWT, session, OAuth)', level: 'strong', levelDisplay: 'Strong' },
      { name: 'FastAPI', level: 'familiar', levelDisplay: 'Familiar' },
      { name: 'Node.js', level: 'familiar', levelDisplay: 'Familiar' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 'strong', levelDisplay: 'Strong', featured: true },
      { name: 'React Router', level: 'strong', levelDisplay: 'Strong' },
      { name: 'Fetch API', level: 'strong', levelDisplay: 'Strong' },
      { name: 'Tailwind CSS', level: 'working', levelDisplay: 'Working knowledge' },
      { name: 'Context API', level: 'working', levelDisplay: 'Working knowledge' },
      { name: 'Vite', level: 'working', levelDisplay: 'Working knowledge' },
      { name: 'Bootstrap', level: 'working', levelDisplay: 'Working knowledge' },
      { name: 'Next.js', level: 'familiar', levelDisplay: 'Familiar' },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'MySQL', level: 'strong', levelDisplay: 'Strong', featured: true },
      { name: 'PostgreSQL', level: 'strong', levelDisplay: 'Strong' },
      { name: 'SQLite', level: 'strong', levelDisplay: 'Strong' },
      { name: 'Database design and normalisation', level: 'strong', levelDisplay: 'Strong' },
      { name: 'Query optimisation', level: 'working', levelDisplay: 'Working knowledge' },
    ],
  },
  {
    name: 'DevOps and Deployment',
    skills: [
      { name: 'Git', level: 'strong', levelDisplay: 'Strong' },
      { name: 'GitHub', level: 'strong', levelDisplay: 'Strong' },
      { name: 'Environment management', level: 'strong', levelDisplay: 'Strong' },
      { name: 'Linux', level: 'working', levelDisplay: 'Working knowledge' },
      { name: 'Vercel / Netlify', level: 'working', levelDisplay: 'Working knowledge' },
      { name: 'Railway / Render / PythonAnywhere', level: 'working', levelDisplay: 'Working knowledge' },
      { name: 'Nginx', level: 'familiar', levelDisplay: 'Familiar' },
      { name: 'GitHub Actions', level: 'familiar', levelDisplay: 'Familiar' },
      { name: 'AWS', level: 'familiar', levelDisplay: 'Familiar' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'VS Code', level: 'strong', levelDisplay: 'Strong' },
      { name: 'Postman', level: 'strong', levelDisplay: 'Strong' },
      { name: 'Git CLI', level: 'strong', levelDisplay: 'Strong' },
      { name: 'AI coding tools', level: 'strong', levelDisplay: 'Strong' },
      { name: 'pgAdmin / MySQL Workbench', level: 'working', levelDisplay: 'Working knowledge' },
      { name: 'Figma', level: 'familiar', levelDisplay: 'Familiar' },
    ],
  },
]

/** The five skills surfaced most prominently. */
export const featuredSkills = skillCategories
  .flatMap((category) => category.skills)
  .filter((skill) => skill.featured)
