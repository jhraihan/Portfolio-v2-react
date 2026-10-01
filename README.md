# Md. Jahid Hasan Raihan — Portfolio v2

A static React portfolio: six full-stack case studies, served as plain files
from a CDN. There is no backend, no database and no API call, so the page
renders fully on first load with no cold start.

**Stack:** React 18 · Vite 6 · Tailwind CSS 3 · Framer Motion 11 · React Router 7 ·
Lucide · Vitest + Testing Library

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 77 tests, including the content rules
npm run build      # outputs dist/
npm run preview    # serves dist/ at http://localhost:4173
```

## Editing content

All content lives in `src/data/`. Edit a file, commit, push — Vercel redeploys.

| File | Holds |
| --- | --- |
| `profile.js` | Name, hero copy, about text, links, typewriter phrases |
| `projects.js` | All six case studies, in display order |
| `skills.js` | Six skill categories with named levels |
| `education.js` | Degree and coursework |

Rules the code relies on:

- **Empty hides.** An optional field left empty (`''` or `[]`) removes its
  element entirely. No `liveUrl` means no demo button; a blank case study
  section is skipped and the numbering closes up.
- **Paragraphs** in long text fields are separated by a blank line.
- **Images are imported**, not referenced by path, so Vite fingerprints them.
  Each screenshot has a 1600px original and an 800px `-800.jpg` companion,
  offered through `srcSet`.
- **Adding a project:** add its screenshots under
  `src/assets/projects/<slug>/`, add an entry to `projects.js`, and add a
  diagram definition to `FLOWS` in `src/components/ArchitectureDiagram.jsx`.
  The home grid, projects page, command palette and sitemap pick it up
  automatically.
- **Résumé:** replace `public/resume.pdf`. It is served by path, never imported.

`src/data/data.test.js` encodes the content rules — six projects, exactly three
live demos, no CGPA, no numeric skill levels, no AI skills — so a change that
breaks one fails the build rather than shipping.

## Contact form

With no backend, the form posts to a third-party form service. Copy
`.env.example` to `.env` and set **one** of:

- `VITE_CONTACT_ENDPOINT` — a Formspree endpoint (`https://formspree.io/f/…`)
- `VITE_WEB3FORMS_ACCESS_KEY` — a Web3Forms access key

On Vercel, add the same variable under **Project → Settings → Environment
Variables** and redeploy. Both values are public by design.

Until one is set, submitting the form opens the visitor's mail app with the
message already written, so the form is never a dead button. Direct email is
always shown beside it.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project →** import the repository. The Vite preset is
   detected; the build command is `npm run build` and the output is `dist`.
3. Deploy.

`vercel.json` rewrites every path to `index.html`, so opening a case study URL
directly (or refreshing one) works instead of returning 404.

The canonical link, Open Graph URLs, `sitemap.xml` and `robots.txt` use the
real domain automatically: the build reads Vercel's
`VERCEL_PROJECT_PRODUCTION_URL`. After adding a custom domain, redeploy once and
all of them switch to it. Set `VITE_SITE_URL` only to override this.

## Project layout

```
public/            favicon, og-image.png, resume.pdf
build/seo.js       site URL, sitemap.xml and robots.txt generation
src/assets/        profile photo and project screenshots (optimised)
src/components/    Reveal, Spotlight, Magnetic, ImageFrame, ProjectCard,
                   ArchitectureDiagram, CommandPalette, …
src/sections/      home page blocks
src/pages/         one component per route
src/layouts/       Header, Footer
src/hooks/         useTheme, useTypewriter, useDocumentTitle, …
src/lib/contact.js contact form validation and submission
src/data/          all site content
```
