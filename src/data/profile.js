// Identity, hero copy, about text, and links. Every value is supplied by the
// owner and reproduced verbatim (PRD section 5).

import photo from '@/assets/profile/raihan.jpg'
import photoSm from '@/assets/profile/raihan-480.jpg'

export const profile = {
  fullName: 'Md. Jahid Hasan Raihan',
  displayName: 'Md. Jahid Hasan Raihan',
  title: 'Software Engineer',
  location: 'Dhaka, Bangladesh',
  email: 'jahidhr05@gmail.com',
  availability: 'Open to remote, hybrid, and onsite roles',

  tagline: 'I build complete, production-shaped web applications.',
  heroIntro: 'Full-stack software engineer working across Django, Django REST Framework, React, and PostgreSQL. I build complete systems — the interface, the API behind it, and the database underneath.',
  metaDescription: 'Md. Jahid Hasan Raihan — software engineer in Dhaka, Bangladesh. Full-stack applications built with Django, Django REST Framework, React, and MySQL.',

  // Home page.
  aboutShort: 'I build full-stack web applications with Django and React. What interests me is the whole system: how a request travels from the browser through the API into the database and back, how authentication holds it together, and how the schema shapes what is possible.',
  // /about. Paragraphs are separated by a blank line.
  aboutLong: `I am a software engineer based in Dhaka, Bangladesh, completing a BSc in Computer Science and Engineering at Independent University, Bangladesh.

My programming started with my degree. I chose Computer Science because the field genuinely interested me, and coding turned out to be the part I could not put down. Most of what I know beyond coursework I taught myself, through online courses and by building things that broke until they did not.

Python came first, then data structures and algorithms, which is still where I go to sharpen how I think about problems. Django came next and stayed — partly because Python already felt natural, and partly because it let me build entire applications rather than fragments. From there: Django REST Framework for APIs, then databases in earnest with MySQL, SQLite, and PostgreSQL, and React on the frontend.

What I care about is complete, working systems. Every project I have built is a full application rather than an isolated feature: role-based access control, JWT authentication, relational schema design, and a decoupled React frontend talking to a REST API. I would rather understand why something works than just get it working.`,

  githubUrl: 'https://github.com/jhraihan',
  linkedinUrl: 'https://www.linkedin.com/in/md-jahid-hasan-raihan-745023393',
  // Footer link only. The solved count is deliberately never shown.
  leetcodeUrl: 'https://leetcode.com/u/Jahid_Hasan_Raihan/',

  photo,
  photoSrcSet: `${photoSm} 480w, ${photo} 800w`,
  // Served from public/ and referenced by path, never imported.
  resume: '/resume.pdf',
}

// What the hero typewriter cycles through. Each names something actually
// built, and the list deliberately spans both ends of the stack.
export const heroPhrases = [
  'REST APIs with Django & DRF',
  'React interfaces that stay fast',
  'role-based access control',
  'relational database schemas',
  'JWT authentication flows',
]
