// AskHet knowledge base — exported as TypeScript constants so it is bundled at
// build time. The API route runs on the Edge runtime where `fs` is unavailable,
// so we cannot read this from disk; everything must live in source.

export const ABOUT = `
Het Patel is a full-stack developer and AI automation builder from Ahmedabad, Gujarat, India.
He is pursuing a B.Tech in Computer Engineering at Gandhinagar University (graduating 2028).
Alongside his degree he runs OM Marketing Solutions — a digital agency delivering websites,
SEO, and AI automation for clients — and he works as a full-stack developer on SportsWalla /
FirstBookit, a production sports venue booking SaaS. He builds with MERN + Next.js / TypeScript
and ships fast: multiple production client projects are already live.

Note on the OM brand (three distinct things — disambiguate carefully):
1. OM Marketing Solutions — the DIGITAL AGENCY Het founded (https://ommarketingsolutions.in).
2. OM Marketing — Het's family HARDWARE BUSINESS (weighing scales / cash-handling, see Experience).
   He also built its website at https://ommarketing.co.in.
3. OM AI — a chatbot product his agency builds for clients.
`.trim();

export const PROJECTS = `
- **HireLoop** — AI mock interview platform with a terminal-style UI. 21 tech roles (engineering,
  data, product, design), junior to senior levels, voice or text mode. The AI adapts questions to
  your answers in real time and ends every session with an honest scored debrief: per-question
  feedback plus an improvement plan. Stack: Next.js, TypeScript, Groq (Llama 3.3 70B), real-time
  speech engine. Open source (MIT). Live: [HireLoop](https://hireloop-tau.vercel.app).
- **GitStory** — Type any GitHub username and AI turns the commits into a magazine-style developer
  story. Analyzes repos, commits, and languages to write an editorial profile. Stack: Next.js 15,
  MongoDB, Anthropic API. Live: [GitStory](https://git-story-gold.vercel.app).
- **CiteMind** — AI Citation Memory Agent, built as the final-round submission at HackBaroda 2026.
  Stack: Next.js, Groq, Hindsight Cloud.
- **SmartWork 360** — Enterprise-grade backend architecture with JWT-based RBAC, 95% test
  coverage, and ~120 ms median API latency.
- **Triggered** — Email automation SaaS with three subscription tiers. Stack: Node.js, Express,
  MongoDB, Razorpay. Deployed on Render.
- **TalkToLead** — AI sales qualification chatbot SaaS (hackathon build).
- **SportsWalla / FirstBookit** (work) — production booking SaaS: analytics dashboards, peak
  pricing calendar, Razorpay payments, multi-slot booking, email OTP guest auth, PWA, 269+
  documented API endpoints.
- **OM Marketing (family business)** — Het built [ommarketing.co.in](https://ommarketing.co.in),
  an e-commerce-style catalog site with a FastAPI backend, for his family's hardware business.
- **Client work** — [FindUrTrip](https://findurtrip.org) (travel platform),
  [Shri Har Packaging](https://shreeharpackaging.in) (industrial), SilverLeaf Preschool,
  Priya's Training Hub, and KBC Business Consultancy. Also a LinkedIn auto-apply agent
  (Python / Playwright), a school management app (React Native / Expo), and an Android voice
  assistant (Kotlin).
- **AskHet** — this chatbot itself: built from scratch (custom React UI + streaming Edge API
  route + structured knowledge base + guardrails), powered by Groq Llama 3.3 70B. If someone asks
  how this bot works, explain this architecture proudly.
`.trim();

export const EXPERIENCE = `
- **Founder, OM Marketing Solutions** — web development and digital marketing agency
  ([ommarketingsolutions.in](https://ommarketingsolutions.in)).
- **Full-Stack Developer, SportsWalla / FirstBookit** — sports venue booking SaaS (see Projects).
- **Business owner, OM Marketing** — weighing scales and cash-handling hardware supply for
  retailers and wholesalers. Handles sourcing, sales, and customer relationships. Taught him
  real-world business operations.
- **Hackathons** — HackBaroda 2026 finalist (CiteMind).
`.trim();

export const SKILLS = `
React, Next.js (Pages + App Router), TypeScript, JavaScript, Node.js, Express, MongoDB, MySQL,
Tailwind CSS, Python, FastAPI, React Native / Expo, REST API design, Razorpay integration,
technical SEO, AI integration (Groq, Anthropic / Claude API, RAG patterns), Git / GitHub,
Vercel / Render deployment.
`.trim();

export const CONTACT = `
- Email: [hetpatelsk@gmail.com](mailto:hetpatelsk@gmail.com)
- GitHub: [github.com/Het161](https://github.com/Het161)
- Portfolio: [buildbyhet.me](https://buildbyhet.me)
- Agency: [ommarketingsolutions.in](https://ommarketingsolutions.in)
- Location: Ahmedabad, Gujarat, India

Open to internships, placement opportunities, freelance projects, and collaborations. For hiring
or project inquiries, the contact form on this site or email works best.
`.trim();

export const FAQ = `
- **Available for work?** Yes — internships, freelance, and collaborations. Route to the contact
  form or [hetpatelsk@gmail.com](mailto:hetpatelsk@gmail.com).
- **Strongest skills?** Full-stack product building end-to-end — Next.js / TypeScript frontends,
  Node / Express APIs, MongoDB, payments, SEO, and AI features.
- **What makes him different?** He doesn't just code — he runs a real business and ships
  production software for paying clients while still in college.
`.trim();

export const KNOWLEDGE = [
  `## ABOUT\n${ABOUT}`,
  `## PROJECTS\n${PROJECTS}`,
  `## EXPERIENCE\n${EXPERIENCE}`,
  `## SKILLS\n${SKILLS}`,
  `## CONTACT\n${CONTACT}`,
  `## FAQ\n${FAQ}`,
].join("\n\n");
