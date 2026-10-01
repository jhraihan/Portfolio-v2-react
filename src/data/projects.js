// Every project the site shows, in display order.
//
// This file replaces the v1 database. Editing a case study means editing
// this file, committing, and pushing. Long text fields separate paragraphs
// with a blank line. Any optional field left empty ('' or []) removes its
// element from the page entirely — no placeholder, no dead button.
//
// Images are imported rather than referenced by path so Vite fingerprints
// them; a raw string path would bypass the build. Each screenshot has an
// 800px companion, offered through srcSet so a card or gallery thumbnail
// never downloads the full 1600px capture.

import sellflowbdCover from '@/assets/projects/sellflowbd/cover.jpg'
import sellflowbdCoverSm from '@/assets/projects/sellflowbd/cover-800.jpg'
import sellflowbd01 from '@/assets/projects/sellflowbd/01.jpg'
import sellflowbd01Sm from '@/assets/projects/sellflowbd/01-800.jpg'
import sellflowbd02 from '@/assets/projects/sellflowbd/02.jpg'
import sellflowbd02Sm from '@/assets/projects/sellflowbd/02-800.jpg'
import sellflowbd03 from '@/assets/projects/sellflowbd/03.jpg'
import sellflowbd03Sm from '@/assets/projects/sellflowbd/03-800.jpg'
import sellflowbd04 from '@/assets/projects/sellflowbd/04.jpg'
import sellflowbd04Sm from '@/assets/projects/sellflowbd/04-800.jpg'
import servorabdCover from '@/assets/projects/servorabd/cover.jpg'
import servorabdCoverSm from '@/assets/projects/servorabd/cover-800.jpg'
import servorabd01 from '@/assets/projects/servorabd/01.jpg'
import servorabd01Sm from '@/assets/projects/servorabd/01-800.jpg'
import servorabd02 from '@/assets/projects/servorabd/02.jpg'
import servorabd02Sm from '@/assets/projects/servorabd/02-800.jpg'
import servorabd03 from '@/assets/projects/servorabd/03.jpg'
import servorabd03Sm from '@/assets/projects/servorabd/03-800.jpg'
import micromartCover from '@/assets/projects/micromart/cover.jpg'
import micromartCoverSm from '@/assets/projects/micromart/cover-800.jpg'
import micromart01 from '@/assets/projects/micromart/01.jpg'
import micromart01Sm from '@/assets/projects/micromart/01-800.jpg'
import micromart02 from '@/assets/projects/micromart/02.jpg'
import micromart02Sm from '@/assets/projects/micromart/02-800.jpg'
import micromart03 from '@/assets/projects/micromart/03.jpg'
import micromart03Sm from '@/assets/projects/micromart/03-800.jpg'
import micromart04 from '@/assets/projects/micromart/04.jpg'
import micromart04Sm from '@/assets/projects/micromart/04-800.jpg'
import eduflowCover from '@/assets/projects/eduflow/cover.jpg'
import eduflowCoverSm from '@/assets/projects/eduflow/cover-800.jpg'
import eduflow01 from '@/assets/projects/eduflow/01.jpg'
import eduflow01Sm from '@/assets/projects/eduflow/01-800.jpg'
import eduflow02 from '@/assets/projects/eduflow/02.jpg'
import eduflow02Sm from '@/assets/projects/eduflow/02-800.jpg'
import eduflow03 from '@/assets/projects/eduflow/03.jpg'
import eduflow03Sm from '@/assets/projects/eduflow/03-800.jpg'
import eduflow04 from '@/assets/projects/eduflow/04.jpg'
import eduflow04Sm from '@/assets/projects/eduflow/04-800.jpg'
import intellichatCover from '@/assets/projects/intellichat/cover.jpg'
import intellichatCoverSm from '@/assets/projects/intellichat/cover-800.jpg'
import intellichat01 from '@/assets/projects/intellichat/01.jpg'
import intellichat01Sm from '@/assets/projects/intellichat/01-800.jpg'
import intellichat02 from '@/assets/projects/intellichat/02.jpg'
import intellichat02Sm from '@/assets/projects/intellichat/02-800.jpg'
import intellichat03 from '@/assets/projects/intellichat/03.jpg'
import intellichat03Sm from '@/assets/projects/intellichat/03-800.jpg'
import medideskCover from '@/assets/projects/medidesk/cover.jpg'
import medideskCoverSm from '@/assets/projects/medidesk/cover-800.jpg'
import medidesk01 from '@/assets/projects/medidesk/01.jpg'
import medidesk01Sm from '@/assets/projects/medidesk/01-800.jpg'
import medidesk02 from '@/assets/projects/medidesk/02.jpg'
import medidesk02Sm from '@/assets/projects/medidesk/02-800.jpg'
import medidesk03 from '@/assets/projects/medidesk/03.jpg'
import medidesk03Sm from '@/assets/projects/medidesk/03-800.jpg'

const srcSet = (small, large) => `${small} 800w, ${large} 1600w`

export const projects = [
  {
    slug: 'sellflowbd',
    title: 'SellFlow BD',
    subtitle: 'Multi-tenant order and delivery platform for F-commerce sellers',
    summary: 'A multi-tenant SaaS platform for Bangladeshi Facebook and Instagram sellers. A seller signs up, creates a store, invites staff, and runs order entry, confirmation, inventory, courier booking, delivery tracking, cash-on-delivery reconciliation, returns, and profit from a single dashboard.',
    accentLabel: 'SaaS Platform',
    projectType: 'web_app',
    status: 'completed',
    isSolo: true,
    order: 1,
    featured: true,

    problem: `Thousands of Bangladeshi businesses sell entirely through Facebook and Instagram. Orders arrive as Messenger chats, comments, and phone calls, and almost everything ships cash on delivery through a third-party courier. There is no storefront, no checkout, and no system of record, so the seller tracks orders in a notebook and discovers months later that the business is not profitable.

Cash on delivery is the fact that makes the domain hard. The seller ships goods before being paid, and that one fact creates every other requirement: orders have to be confirmed before stock is committed, customers who refuse delivery have to be recognised, courier money has to be reconciled rather than assumed, and returns have to be counted against the margin.`,
    solution: `One order book replaces the scattered channels, with search, filters, and a full status timeline for every order. Orders are confirmed by phone with the call outcome logged, and stock is committed only once an order is confirmed. Duplicate detection warns when the same customer has a recent open order with overlapping products, and the seller can explicitly override it. Customers are risk-scored automatically from their delivery and return history, and repeat offenders can be blacklisted.

Inventory keeps separate on_hand and reserved counts, so availability never includes stock already promised to another order. Returns capture the forward delivery cost, the return charge, and any written-off stock, and all of it feeds a net profit figure calculated after cost of goods, delivery cost, return loss, and operating expenses. Revenue is recognised on delivery, never on order creation — a pending cash-on-delivery order is not revenue.`,
    architecture: `The backend is fourteen domain apps, each shaped the same way: models.py for structure, services.py for business logic, and thin views that handle only HTTP. Because the logic lives in the service layer, the same create_order() runs for the dashboard, the public order form, and the API alike.

Three pieces carry most of the weight. Tenant isolation is enforced in three layers: a base manager that returns nothing when no store is resolved, a mixin that resolves the tenant from the user's own memberships, and a view mixin that scopes every query and injects the store on writes. Cross-tenant access returns 404, never 403, so the API never confirms that another tenant's record exists. The order state machine declares its legal transitions as data and attaches stock side effects to them, applied inside a transaction with a row lock and recorded in an immutable audit trail. Inventory is an append-only ledger: every movement records its resulting balances, and concurrent reservations are serialised with select_for_update() so the last unit in stock cannot be sold twice.

Access is capability-based. Five roles — owner, manager, order staff, delivery staff, and accountant — map to named capabilities that are checked on every request. Every courier sits behind one adapter interface, with manual, Pathao, and Steadfast implemented; courier credentials are encrypted at rest with Fernet and never returned by the API. There is no Celery or Redis: scheduled work runs from a GitHub Actions schedule that calls a protected endpoint every 15 minutes.`,
    challenges: `Reconciling cash on delivery. The courier collects the customer's money and pays the seller later, in bulk, as a statement — and a settlement recorded wrongly is money quietly lost. So nothing settles automatically. The courier statement is uploaded as a CSV and becomes a draft. Every row lands in one of four buckets: matched, amount mismatch, unmatched, or already settled. The seller reviews a preview before committing, and committing settles only the matched rows. Mismatches are skipped unless the seller explicitly opts into them, and any shortfall is surfaced as a number rather than left to be noticed.

The input itself is untidy. Column names vary between couriers, so the parser accepts several spellings of each column and strips currency symbols before it reads an amount.`,
    lessons: `That in a system handling money, the rules worth having are the ones a test enforces. Money is always stored as a DecimalField with twelve digits and two decimal places, and a test walks every analytics endpoint and fails if any value comes back as a float — so the rule cannot erode as new endpoints are added. The same thinking shaped smaller decisions: order numbers come from an atomic per-store counter rather than COUNT(*) + 1, and phone numbers are normalised to +8801XXXXXXXXX on save.

I also learned how far one awkward fact about a domain reaches. Cash on delivery decided when revenue could be recognised, when stock could be committed, and why the courier's money had to be reconciled rather than trusted. Once that was clear, most of the features followed from it.`,

    technologies: [
      'Python',
      'JavaScript',
      'React',
      'Vite',
      'Django',
      'Django REST Framework',
      'REST API',
      'JWT',
      'PostgreSQL',
      'SQLite',
      'GitHub Actions',
    ],
    features: [
      { title: 'Order book', description: 'One book for every channel, with search, filters, and a full status timeline.' },
      { title: 'Phone confirmation', description: 'Call outcomes logged; stock committed only once an order is confirmed.' },
      { title: 'Duplicate detection', description: 'Warns on a recent open order with overlapping products, with explicit override.' },
      { title: 'Customer risk scoring', description: 'Scored automatically from delivery and return history, plus a blacklist.' },
      { title: 'Reserved inventory', description: 'Separate on_hand and reserved counts, so availability stays truthful.' },
      { title: 'Courier booking and tracking', description: 'Manual, Pathao, and Steadfast behind one adapter interface.' },
      { title: 'COD reconciliation', description: 'Courier statements uploaded, matched against shipments, previewed, then committed.' },
      { title: 'Returns accounting', description: 'Forward delivery cost, return charge, and written-off stock captured per return.' },
      { title: 'Net profit', description: 'Profit after cost of goods, delivery cost, return loss, and operating expenses.' },
      { title: 'Staff and capabilities', description: 'Five roles mapped to named capabilities, checked on every request.' },
      { title: 'Public order form', description: 'Orders placed through the same service logic as the dashboard and the API.' },
    ],

    githubUrl: 'https://github.com/jhraihan/SellFlowBD',
    videoUrl: 'https://youtu.be/4FBawFRC9EY',
    liveUrl: 'https://sellflow-web.onrender.com',

    coverImage: sellflowbdCover,
    coverSrcSet: srcSet(sellflowbdCoverSm, sellflowbdCover),
    images: [
      { src: sellflowbd01, srcSet: srcSet(sellflowbd01Sm, sellflowbd01), caption: 'Seller dashboard with orders awaiting confirmation', alt: 'SellFlow BD — seller dashboard with orders awaiting confirmation' },
      { src: sellflowbd02, srcSet: srcSet(sellflowbd02Sm, sellflowbd02), caption: 'Order book with status filters', alt: 'SellFlow BD — order book with status filters' },
      { src: sellflowbd03, srcSet: srcSet(sellflowbd03Sm, sellflowbd03), caption: 'Store settings — delivery charges, couriers, and staff', alt: 'SellFlow BD — store settings — delivery charges, couriers, and staff' },
      { src: sellflowbd04, srcSet: srcSet(sellflowbd04Sm, sellflowbd04), caption: 'Cash-on-delivery payments ledger', alt: 'SellFlow BD — cash-on-delivery payments ledger' },
    ],
  },
  {
    slug: 'servorabd',
    title: 'ServoraBD',
    subtitle: 'Local service marketplace built around a computed trust score',
    summary: 'A marketplace connecting customers in Dhaka with verified electricians, plumbers, AC technicians, and other tradespeople. The booking flow is a well-understood problem; the point of the project is the trust model — a six-factor score computed from what providers have actually done, and designed to resist gaming.',
    accentLabel: 'Marketplace',
    projectType: 'web_app',
    status: 'completed',
    isSolo: true,
    order: 2,
    featured: true,

    problem: `Star ratings do not work for choosing a tradesperson. A provider with one 5-star review outranks a provider with two hundred jobs averaging 4.8. Ratings cluster so tightly between 4.5 and 5.0 that they carry almost no information, and they only measure jobs that were completed — a provider who accepts ten bookings and abandons eight can still hold a perfect score.

The point of this project is not the booking flow; that is a well-understood problem. It is the trust model.`,
    solution: `Every provider carries a trust score computed from six weighted factors rather than a single average: verification depth (20%), job volume (15%), completion reliability (20%), cancellation discipline (15%), responsiveness (10%), and review quality (20%). Each factor answers a different question — has this person proven who they are, is there enough evidence to judge them, do they finish what they commit to, how often do they break a commitment, how long does a customer wait, and what do verified customers say.

Customers browse and filter providers by service, area, availability, and trust tier, with results ranked by trust. The score is recomputed nightly for every provider.`,
    architecture: `A React and Vite frontend talks to a Django REST Framework API, with PostgreSQL underneath and JWT authentication. The trust engine runs as a scheduled recompute rather than on each request: every provider's score is recalculated nightly from their verification, job, cancellation, response, and review history.

Measured locally against 10,018 seeded providers, provider search returned at a p95 of 100 ms against a 400 ms target, and the nightly trust recompute for all of them finished in 175 seconds against a 15-minute target. The landing page reached a Largest Contentful Paint of 1.58 s on Slow 4G with 4× CPU throttling, against a 2.5 s target.

In my own test runs the project has 587 backend tests and 47 frontend unit and component tests. Playwright runs both golden paths plus a WCAG 2.1 AA scan of every page, in Chromium at a 360 px viewport; axe-core reports no WCAG 2.1 AA violations, and pip-audit and npm audit report zero known vulnerabilities.`,
    challenges: `Designing a score that resists gaming. A number that decides who gets work will be optimised against, so each part of the formula had to answer a specific attack.

A single glowing review is answered by Bayesian smoothing on completion rate and reviews: a provider with little history regresses toward the platform mean instead of scoring 100 on one job. A well-timed cancellation is answered by weighting cancellations by the damage they do — cancelling an hour before costs four times what cancelling two days ahead costs — and letting old cancellations fade with a 180-day half-life. A pile of trivial jobs is answered by counting volume logarithmically, saturating at 100 jobs, so farming small jobs has sharply diminishing returns. Penalties for upheld disputes are applied after the weighted sum rather than inside it, so one serious incident cannot be diluted by strong performance elsewhere.`,
    lessons: `That a scoring formula needs worked examples before it needs code. The trust model was specified with two illustrative provider profiles and their expected scores — examples the system produces, not real users — and the engine reproduces both exactly, at 84.19 and 53.48. Fixed expected outputs turned a debate about weights into a test that either passes or fails.

I also learned how much of a project's quality sits where a demo cannot show it. A security review fixed a rate-limit bypass through forged X-Forwarded-For headers, stopped accepting HTML files renamed to .jpg, added an audit that fails the suite if any route omits its permission check, and upgraded the project to Django 5.2 LTS.`,

    technologies: [
      'Python',
      'JavaScript',
      'React',
      'Vite',
      'Django',
      'Django REST Framework',
      'REST API',
      'JWT',
      'PostgreSQL',
      'Playwright',
    ],
    features: [
      { title: 'Six-factor trust score', description: 'Verification, volume, completion, cancellations, responsiveness, and reviews, weighted into one score.' },
      { title: 'Bayesian smoothing', description: 'Low-volume providers regress toward the platform mean instead of scoring 100 on one job.' },
      { title: 'Damage-weighted cancellations', description: 'Late cancellations cost more, and old ones fade with a 180-day half-life.' },
      { title: 'Saturating job volume', description: 'Volume counted logarithmically up to 100 jobs, so farming trivial jobs stops paying.' },
      { title: 'Dispute penalties', description: 'Upheld disputes applied after the weighted sum, so they cannot be diluted.' },
      { title: 'Provider search', description: 'Filter by service, area, availability, and trust tier, ranked by trust.' },
      { title: 'Service catalogue', description: 'Services grouped by category, each leading to matching providers.' },
      { title: 'Customer and provider accounts', description: 'Sign up to hire a provider or to offer services.' },
      { title: 'Nightly recompute', description: 'Trust scores recalculated for every provider on a schedule.' },
      { title: 'Permission audit', description: 'The test suite fails if any route omits its permission check.' },
    ],

    githubUrl: 'https://github.com/jhraihan/ServoraBD',
    videoUrl: 'https://youtu.be/P6uvjq-dDbA',
    liveUrl: 'https://servorabd-web.onrender.com',

    coverImage: servorabdCover,
    coverSrcSet: srcSet(servorabdCoverSm, servorabdCover),
    images: [
      { src: servorabd01, srcSet: srcSet(servorabd01Sm, servorabd01), caption: 'Provider search ranked by trust score', alt: 'ServoraBD — provider search ranked by trust score' },
      { src: servorabd02, srcSet: srcSet(servorabd02Sm, servorabd02), caption: 'Service catalogue by category', alt: 'ServoraBD — service catalogue by category' },
      { src: servorabd03, srcSet: srcSet(servorabd03Sm, servorabd03), caption: 'Sign-up as a customer or a provider', alt: 'ServoraBD — sign-up as a customer or a provider' },
    ],
  },
  {
    slug: 'micromart',
    title: 'MicroMart',
    subtitle: 'Multi-role e-commerce platform with integrated payments',
    summary: 'A fully decoupled e-commerce platform serving three distinct user types — customers, sellers, and administrators — with product discovery, cart and checkout, payment processing through SSLCommerz, order tracking, and seller and inventory management.',
    accentLabel: 'E-commerce',
    projectType: 'web_app',
    status: 'completed',
    isSolo: true,
    order: 3,
    featured: true,

    problem: 'A working e-commerce system is not one application but several overlapping ones. A customer browsing and buying, a seller managing a storefront and inventory, and an administrator overseeing the marketplace each need a different view of the same data, with different permissions over it. I built MicroMart to work through that problem end to end rather than build a storefront in isolation.',
    solution: 'A decoupled architecture: a React single-page application on the frontend, a Django and Django REST Framework API on the backend, and MySQL underneath. Authentication uses JWT, with the token identifying which of the three user types is making a request and what that user is permitted to do. Payments run through SSLCommerz.',
    architecture: `The React SPA holds no server state of its own; every read and write goes through the REST API. A request carries a JWT, which the backend verifies before resolving the user's type and permissions. Views are scoped so that a seller reaches only their own store, products, and orders, while an administrator sees across the marketplace.

Checkout is the most involved path. The cart is validated against current inventory and pricing, an order is created in a pending state, and the user is handed off to SSLCommerz. The gateway's response determines whether the order is confirmed, inventory is decremented, and the order enters the tracking flow — or whether it is abandoned and the reservation released.`,
    challenges: 'The hardest part was the complete order and payment workflow. Taking a payment is straightforward in isolation; keeping an order, its inventory, and its payment state consistent is not. A user can abandon a payment mid-flow, a gateway callback can arrive late or twice, and inventory must not be decremented for an order that was never paid for. Getting the states and their transitions right — so that no path leaves the system in a half-finished state — took the most thought of anything in the project.',
    lessons: 'That the interesting part of a feature is usually its failure cases. The happy path through checkout took a fraction of the time; everything after it — abandoned payments, duplicate callbacks, stock that must not be committed prematurely — was the actual work. I also learned how much a clear set of order states simplifies the code around them: once the transitions were explicit, most of the conditional logic scattered through the views disappeared.',

    technologies: [
      'Python',
      'JavaScript',
      'React',
      'Django',
      'Django REST Framework',
      'REST API',
      'JWT',
      'MySQL',
      'SSLCommerz',
    ],
    features: [
      { title: 'Registration and authentication', description: 'JWT-based authentication across three user types.' },
      { title: 'Product search', description: 'Search across the product catalogue.' },
      { title: 'Voice search', description: 'Spoken queries as an alternative to typing.' },
      { title: 'Shopping cart', description: 'Cart management through to checkout.' },
      { title: 'Payment processing', description: 'Checkout through the SSLCommerz payment gateway.' },
      { title: 'Product reviews', description: 'Customer reviews on purchased products.' },
      { title: 'Order tracking', description: 'Order status visible to customer and seller.' },
      { title: 'Store management', description: 'Sellers manage their own storefront.' },
      { title: 'Product and inventory management', description: 'Catalogue and stock levels per seller.' },
      { title: 'Sales analytics', description: 'Sales figures for sellers and administrators.' },
      { title: 'Pricing management', description: 'Seller-controlled product pricing.' },
      { title: 'User management', description: 'Administrative control over platform accounts.' },
      { title: 'Complaint management', description: 'Customer complaints routed for administrative review.' },
      { title: 'Fraud monitoring', description: 'Administrative monitoring for suspicious activity.' },
      { title: 'Seller verification', description: 'Verification step before a seller can trade.' },
    ],

    githubUrl: 'https://github.com/jhraihan/MicroMart',
    videoUrl: 'https://youtu.be/6ujWklMaXg0',
    liveUrl: 'https://micromart-17ws.onrender.com',

    coverImage: micromartCover,
    coverSrcSet: srcSet(micromartCoverSm, micromartCover),
    images: [
      { src: micromart01, srcSet: srcSet(micromart01Sm, micromart01), caption: 'Product catalogue and category browsing', alt: 'MicroMart — product catalogue and category browsing' },
      { src: micromart02, srcSet: srcSet(micromart02Sm, micromart02), caption: 'Product detail and purchase flow', alt: 'MicroMart — product detail and purchase flow' },
      { src: micromart03, srcSet: srcSet(micromart03Sm, micromart03), caption: 'Cart and checkout', alt: 'MicroMart — cart and checkout' },
      { src: micromart04, srcSet: srcSet(micromart04Sm, micromart04), caption: 'Seller dashboard', alt: 'MicroMart — seller dashboard' },
    ],
  },
  {
    slug: 'eduflow',
    title: 'EduFlow',
    subtitle: 'Role-based learning management system',
    summary: 'A learning management system with separate Admin, Teacher, and Student roles, covering courses, lessons, assignments, enrolments, submissions, and results. Built with a Django REST Framework backend and a React frontend, with client state handled by native React hooks rather than an external state library.',
    accentLabel: 'EdTech',
    projectType: 'web_app',
    status: 'completed',
    isSolo: true,
    order: 4,
    featured: true,

    problem: 'A learning platform is defined by who is allowed to do what. A teacher creating an assignment, a student submitting to it, and an administrator overseeing both act on the same records with very different rights. EduFlow was an exercise in getting that permission model right rather than bolting roles onto an application built without them.',
    solution: 'Role-based access control with three distinct roles, enforced on the backend and reflected in the interface so users are never shown controls they cannot use. Authentication is JWT-based, with user lookup by phone number rather than email. The frontend is React with Vite and Tailwind CSS, kept deliberately free of heavy state dependencies.',
    architecture: `The Django REST Framework backend exposes CRUD endpoints for courses, lessons, assignments, enrolments, submissions, and results. Permissions are enforced at the API layer: the role carried by the authenticated user determines both which records are returned and which operations are allowed on them.

On the frontend, client state is managed with native React hooks — useState, useEffect, and React Context — with no external state management library. Server responses drive banner notifications, and destructive actions route through a shared confirmation dialog.`,
    challenges: `Keeping one set of permission rules authoritative. Three roles acting on the same records means every endpoint has to answer two questions rather than one: may this user perform this action, and which records may they perform it on. Answering only the first leaves a teacher able to reach another teacher's course simply by changing an id in the URL.

The rule I settled on was that the interface never decides access. The API scopes every queryset by the authenticated user's role, and the frontend hides controls purely as a convenience. Hiding a button is a design choice; scoping a queryset is the actual boundary.`,
    lessons: `How much a project benefits from deciding the permission model before writing the first view. Roles added afterwards tend to become scattered conditionals; roles designed in stay in one place.

I also deliberately built the frontend with nothing but useState, useEffect, and Context, to find out where that genuinely stops being enough. For an application of this size it never did — which was worth knowing firsthand rather than assuming.`,

    technologies: [
      'Python',
      'JavaScript',
      'React',
      'Vite',
      'Tailwind CSS',
      'Context API',
      'Django',
      'Django REST Framework',
      'REST API',
      'JWT',
    ],
    features: [
      { title: 'Role-based access control', description: 'Distinct permissions and interface for Admin, Teacher, and Student.' },
      { title: 'Phone-based authentication', description: 'JWT authentication with user lookup by phone number.' },
      { title: 'Course and lesson management', description: 'Full CRUD for courses and their lessons.' },
      { title: 'Assignments and submissions', description: 'Teachers set assignments; students submit against them.' },
      { title: 'Enrolment management', description: 'Students enrolled onto courses.' },
      { title: 'Results', description: 'Recorded and viewable per student.' },
      { title: 'Server-driven notifications', description: 'Interface feedback driven by API responses.' },
      { title: 'Confirmation dialogs', description: 'Destructive actions confirmed before they run.' },
    ],

    githubUrl: 'https://github.com/jhraihan/Edu-Flow',
    videoUrl: 'https://youtu.be/yTR0klKN5f4',
    liveUrl: '',

    coverImage: eduflowCover,
    coverSrcSet: srcSet(eduflowCoverSm, eduflowCover),
    images: [
      { src: eduflow01, srcSet: srcSet(eduflow01Sm, eduflow01), caption: 'Course overview', alt: 'EduFlow — course overview' },
      { src: eduflow02, srcSet: srcSet(eduflow02Sm, eduflow02), caption: 'Assignments and submissions', alt: 'EduFlow — assignments and submissions' },
      { src: eduflow03, srcSet: srcSet(eduflow03Sm, eduflow03), caption: 'Results and grading', alt: 'EduFlow — results and grading' },
      { src: eduflow04, srcSet: srcSet(eduflow04Sm, eduflow04), caption: 'Administration', alt: 'EduFlow — administration' },
    ],
  },
  {
    slug: 'intellichat',
    title: 'IntelliChat',
    subtitle: 'Streaming AI chat application with persistent conversations',
    summary: 'A chat application built on the Google Gemini API, streaming responses token by token over Server-Sent Events. Conversations persist in PostgreSQL so a session survives a page reload, and responses render as Markdown with syntax-highlighted code blocks.',
    accentLabel: 'AI Application',
    projectType: 'web_app',
    status: 'completed',
    isSolo: true,
    order: 5,
    featured: true,

    problem: 'A chat interface that waits for a complete model response before showing anything feels broken, even when it is working. The response has to arrive progressively, and it has to survive a page reload. Both requirements change how the backend is built.',
    solution: 'Django streams the model\'s response to the browser over Server-Sent Events rather than returning a single completed reply. Conversations and messages are persisted in PostgreSQL, so a user can reload and continue where they left off. Responses are rendered as Markdown with syntax highlighting and a copy-code control.',
    architecture: `React sends a request to POST /api/chat/. Django calls the Gemini API and streams the result back as a sequence of Server-Sent Events: a meta event first, then repeated delta events carrying generated text as it arrives, and finally either a done or an error event to close the stream.

Conversations and their messages are written to PostgreSQL, which is what allows a reloaded page to restore prior context. Users register, sign in, and sign out, and the session survives a reload.`,
    challenges: `Streaming forced me to give up the request/response shape I was used to. A normal Django view builds a complete response and returns it; here the connection has to stay open while text arrives in fragments, each one forwarded to the browser immediately.

That created a second problem: a stream can end in more than one way. It can complete, it can fail partway through, and the client can disconnect while the model is still generating. I settled on an explicit event protocol — a meta event, repeated delta events, and a terminating done or error — so the frontend always knows which of those happened instead of inferring it from a stream that simply stopped.`,
    lessons: `That a persistence layer changes what an interface can promise. Once conversations and messages were stored in PostgreSQL rather than held in memory, a page reload stopped being a data-loss event, and the frontend could be much simpler as a result.

More generally, this project taught me to design the protocol between client and server first. Once the event sequence was decided, both sides became straightforward to write.`,

    technologies: [
      'Python',
      'JavaScript',
      'React',
      'Tailwind CSS',
      'Django',
      'Django REST Framework',
      'Server-Sent Events',
      'PostgreSQL',
      'Redis',
      'Google Gemini API',
    ],
    features: [
      { title: 'Streaming responses', description: 'Model output streamed token by token over Server-Sent Events.' },
      { title: 'Persistent conversations', description: 'Conversations and messages stored in PostgreSQL and restored on reload.' },
      { title: 'Markdown rendering', description: 'Headings, lists, tables, links, and fenced code blocks.' },
      { title: 'Syntax highlighting', description: 'Highlighted code blocks with a copy-code control.' },
      { title: 'Authentication', description: 'Register, sign in, and sign out, with sessions surviving reload.' },
    ],

    githubUrl: 'https://github.com/jhraihan/Intelli-Chat',
    videoUrl: 'https://youtu.be/D6H_cSP2K68',
    liveUrl: '',

    coverImage: intellichatCover,
    coverSrcSet: srcSet(intellichatCoverSm, intellichatCover),
    images: [
      { src: intellichat01, srcSet: srcSet(intellichat01Sm, intellichat01), caption: 'Sign-in with demo access', alt: 'IntelliChat — sign-in with demo access' },
      { src: intellichat02, srcSet: srcSet(intellichat02Sm, intellichat02), caption: 'Streaming response with syntax-highlighted code', alt: 'IntelliChat — streaming response with syntax-highlighted code' },
      { src: intellichat03, srcSet: srcSet(intellichat03Sm, intellichat03), caption: 'Conversation history', alt: 'IntelliChat — conversation history' },
    ],
  },
  {
    slug: 'medidesk',
    title: 'MediDesk',
    subtitle: 'Hospital management system with four-role access control',
    summary: 'A hospital operations system covering patients, doctors, appointments, prescriptions, and billing, with JWT authentication and role-based access across Admin, Doctor, Patient, and Receptionist.',
    accentLabel: 'Healthcare',
    projectType: 'web_app',
    status: 'completed',
    isSolo: true,
    order: 6,
    featured: true,

    problem: 'Hospital workflows are a permissions problem before they are a software problem. A receptionist books appointments but must not read clinical notes; a doctor issues prescriptions but does not manage billing; a patient sees only their own records. MediDesk models those boundaries across four roles.',
    solution: 'JWT authentication with access to each module restricted by role. Appointments, prescriptions, patient and doctor records, billing, and a medicine catalogue each expose only the operations a given role is permitted to perform.',
    architecture: `Appointments move through an explicit lifecycle — booked, approved, completed, or cancelled — with filtering by doctor, patient, and date. Prescriptions link a consultation to multiple medicines, each with its own dosage and duration, so a prescription is a structured record rather than free text.

Billing generates patient invoices with tracked totals and payment status. Doctor availability is a live toggle, which is what makes the booking flow reflect real capacity.`,
    challenges: `Modelling a prescription properly. Storing it as text would have been quick, but a prescription is genuinely structured data: one consultation links to several medicines, and each of those carries its own dosage and duration. Getting that relation right was what made the medicine catalogue and the prescription history useful rather than decorative.

Four roles also made access control harder than the three-role projects. A receptionist books appointments but has no business reading clinical records; a doctor issues prescriptions but does not manage billing. Each module had to be reasoned about separately rather than governed by one blanket rule.`,
    lessons: `That the schema decides what the application can do later. Because prescriptions were modelled as real relations rather than free text, features like searching the medicine catalogue and linking dosages came almost for free — whereas a text field would have made all of it impossible without a migration and a rewrite.

I also learned to treat an appointment as a lifecycle rather than a row. Booked, approved, completed, and cancelled are distinct states with rules about which transitions are legal, and naming them explicitly kept the logic contained.`,

    technologies: [
      'Python',
      'JavaScript',
      'React',
      'Django',
      'Django REST Framework',
      'REST API',
      'JWT',
    ],
    features: [
      { title: 'Role-based authentication', description: 'JWT authentication with module access by role across four user types.' },
      { title: 'Appointment management', description: 'Book, approve, complete, or cancel, with filtering by doctor, patient, and date.' },
      { title: 'Prescription system', description: 'Digital prescriptions linking multiple medicines with dosage and duration.' },
      { title: 'Doctor and patient portals', description: 'Full CRUD for patient records and doctor profiles.' },
      { title: 'Doctor availability', description: 'Real-time availability toggle affecting bookings.' },
      { title: 'Billing and invoicing', description: 'Patient bills with tracked totals and payment status.' },
      { title: 'Medicine inventory', description: 'Searchable catalogue of hospital medicines and pharmacy registry.' },
    ],

    githubUrl: 'https://github.com/jhraihan/Medi-Desk',
    videoUrl: 'https://youtu.be/PQhEbOxRwpY',
    liveUrl: '',

    coverImage: medideskCover,
    coverSrcSet: srcSet(medideskCoverSm, medideskCover),
    images: [
      { src: medidesk01, srcSet: srcSet(medidesk01Sm, medidesk01), caption: 'Appointments and scheduling', alt: 'MediDesk — appointments and scheduling' },
      { src: medidesk02, srcSet: srcSet(medidesk02Sm, medidesk02), caption: 'Patient records', alt: 'MediDesk — patient records' },
      { src: medidesk03, srcSet: srcSet(medidesk03Sm, medidesk03), caption: 'Prescriptions and billing', alt: 'MediDesk — prescriptions and billing' },
    ],
  },
]

/** Looks up one project by its URL slug. */
export function getProject(slug) {
  return projects.find((project) => project.slug === slug) ?? null
}
