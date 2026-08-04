export const METADATA = {
  title:
    "Het Patel — Full-Stack Web Developer & AI Automation Builder | Ahmedabad",
  description:
    "Het Patel is a full-stack web developer in Ahmedabad, India building Next.js, MERN, and AI-automated SaaS products. Hire a freelance Next.js & React developer for startups and SMBs.",
  keywords: [
    "Het Patel",
    "Het Patel developer",
    "buildbyhet",
    "Het Patel Ahmedabad",
    "web developer Ahmedabad",
    "freelance web developer Ahmedabad",
    "Next.js developer India",
    "MERN stack developer Gujarat",
    "full stack developer Ahmedabad",
    "freelance developer India",
    "Next.js developer",
    "React developer",
    "Node.js developer",
    "MongoDB developer",
    "PostgreSQL Prisma developer",
    "Razorpay integration freelancer",
    "SaaS developer India",
    "AI automation developer",
    "Tailwind CSS developer",
    "TypeScript developer",
  ].join(", "),
  siteUrl: "https://buildbyhet.me",
  ogImage: "/og-image.png",
  author: "Het Patel",
  authorEmail: "hetpatelsk@gmail.com",
  authorPhone: "+91 98252 47312",
  authorLocation: "Ahmedabad, Gujarat, India",
};

export const MENULINKS = [
  {
    name: "Home",
    ref: "home",
  },
  {
    name: "Skills",
    ref: "skills",
  },
  {
    name: "Projects",
    ref: "projects",
  },
  {
    name: "Work",
    ref: "work",
  },
  {
    name: "Contact",
    ref: "contact",
  },
];

export const TYPED_STRINGS = [
  "Web Developer and AI Automation Builder",
  "I build websites, AI chatbots, and automation tools for businesses",
  "I create fast, modern, and digital products",
];

export const SOCIAL_LINKS = [
  {
    name: "mail",
    url: "mailto:het@buildbyhet.me",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/hetkumar-sanjaykumar-patel-54730933b/",
  },
  {
    name: "github",
    url: "https://github.com/Het161",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/hetpatel0812/",
  },
  {
    name: "whatsapp",
    url: "https://wa.me/919825247312?text=Hi%20Het!%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you.",
  },
  {
    name: "fiverr",
    url: "https://www.fiverr.com/s/GzeDg7a",
  },
  {
    name: "unjob",
    url: "https://unjob.ai/profile/69cbfccf183dce7cb251b98b",
  },
];

export const SKILLS = {
  languagesAndTools: [
    "html",
    "css",
    "javascript",
    "typescript",
    "sass",
    "nodejs",
    "webpack",
    "vite",
    "firebase",
    "figma",
    "tanstack",
  ],
  librariesAndFrameworks: [
    "expo",
    "react",
    "redux",
    "nextjs",
    "tailwindcss",
    "styledcomponents",
    "antdesign",
    "chakra-ui",
  ],
  databases: ["mysql", "mongodb"],
  other: ["git", "cursor", "sanity"],
};

export const PROJECTS = [
  {
    name: "HireLoop",
    slug: "hireloop",
    imageKey: "hireloop",
    image: "/projects/hireloop.webp",
    imageAlt: "HireLoop AI mock interview platform interface",
    description: "AI mock interview platform with voice & text modes — 21 tech roles, adaptive questioning, and honest scored debriefs powered by Groq Llama 3.3 🎯",
    gradient: ["#581C87", "#7C3AED"],
    url: "https://hireloop-tau.vercel.app/",
    tech: ["nextjs", "react", "typescript", "tailwindcss", "groq", "llama"],
  },
  {
    name: "GitStory",
    slug: "gitstory",
    imageKey: "gitstory",
    image: "/projects/gitstory.webp",
    imageAlt: "GitStory AI-generated developer story from GitHub commits",
    description: "Type any GitHub username and AI turns their commits into a shareable, magazine-style developer story — generated in seconds ✨",
    gradient: ["#0F172A", "#1E40AF"],
    url: "https://git-story-gold.vercel.app/",
    tech: ["nextjs", "react", "typescript", "tailwindcss", "github-api", "openai"],
  },
  {
    name: "TT Marketing",
    slug: "tt-marketing",
    imageKey: "ttmarketing",
    image: "/projects/tt-marketing.webp",
    imageAlt: "TT Marketing platform landing page",
    description: "Comprehensive marketing platform and high-tech retail presence for modern business growth 📈",
    gradient: ["#1E1B4B", "#4338CA"],
    url: "https://ttmarketing.co.in",
    tech: ["react", "tailwindcss", "typescript"],
  },
  {
    name: "OM Marketing Digital System",
    slug: "om-marketing",
    imageKey: "om-marketing",
    image: "/projects/om-marketing.webp",
    imageAlt: "OM Marketing digital inventory and workflow system",
    description: "Digitized inventory & business workflow system reducing reconciliation time by 60% 📊",
    gradient: ["#065F46", "#064E3B"],
    url: "https://www.ommarketing.co.in",
    tech: ["process-automation", "crm", "whatsapp-business", "python"],
  },
  {
    name: "FindUrTrip",
    slug: "findurtrip",
    image: "/projects/findurtrip.webp",
    imageAlt: "FindUrTrip travel booking website",
    imageKey: null,
    description: "Travel company offering customised trips across India and internationally. Budget to premium travelers with personalised itineraries & zero hidden charges.",
    gradient: ["#7C2D12", "#C2410C"],
    url: "https://findurtrip.org",
    tech: ["html", "css", "javascript"],
    tagline: "Find Your Perfect Trip",
    tags: ["Client Project", "Frontend", "Travel", "Business"],
    stats: [
      { label: "Happy Travelers", value: "10K+" },
      { label: "Trips Organized", value: "500+" },
      { label: "Destinations", value: "25+" },
    ],
    features: [
      "Hero section with WhatsApp CTA",
      "Trip cards with pricing, badges & season tags",
      "3-step booking process section",
      "Trip category filter grid",
      "Comparison table (FindUrTrip vs Others)",
      "Testimonials section",
      "FAQ accordion",
      "Founder story section",
      "Fully responsive, WhatsApp-first booking flow",
    ],
    hasModal: true,
  },
  {
    name: "Shri Har Packaging",
    slug: "shri-har-packaging",
    image: "/projects/shri-har-packaging.webp",
    imageAlt: "Shri Har Packaging industrial machinery website",
    imageKey: null,
    description:
      "Ahmedabad-based industrial machinery dealer selling LPI, REVO & Smart Stitch bag closing machines, threads and spares. Built a complete professional website from scratch for a 30+ year old business that had zero digital presence — only a shop and a business card.",
    gradient: ["#18181B", "#EA580C"],
    url: "https://shreeharpackaging.in",
    tech: ["html", "css", "javascript", "vercel", "seo"],
    tagline: "From business card to Google-ready website in 1 day",
    tags: ["Client Project", "Frontend", "Industrial", "SEO"],
    location: "Isanpur, Ahmedabad, Gujarat",
    stats: [
      { label: "Years in Business", value: "30+" },
      { label: "Products Listed", value: "11" },
      { label: "Build Time", value: "1 Day" },
    ],
    features: [
      "Single-page site with 9 sections + animated stats counter",
      "Filterable product catalogue (11 SKUs across 4 categories)",
      "Individual product detail pages with full specs, image gallery & related products",
      "Direct WhatsApp enquiry buttons pre-filled per product",
      "Brand showcase for LPI / REVO / Smart Stitch",
      "Custom dark industrial theme with safety orange accents & Bebas Neue typography",
      "Full SEO: LocalBusiness, FAQPage & Product schema, sitemap.xml, robots.txt",
      "Geo-targeting meta tags & Core Web Vitals optimization",
      "Contact section with WhatsApp enquiry form & Google Maps embed",
      "Mobile-first build, no frameworks — deployed on Vercel with custom domain",
    ],
    hasModal: true,
  },
  {
    name: "DriftLock",
    slug: "driftlock",
    // Placeholder until the ablation-trio cover is dropped in.
    image: "/projects/driftlock.webp",
    imageAlt: "DriftLock wafer-inspection localization",
    imageKey: null,
    description:
      "SEM stage drift means a wafer-inspection tool never lands on the exact same site twice — and every die repeats the identical layout, so there is nothing unique to lock onto. No public dataset of this problem exists, so we generated our own.",
    gradient: ["#3B0764", "#7C3AED"],
    url: null,
    tech: ["Python", "NumPy", "OpenCV", "SciPy", "Matplotlib"],
    tagline: "Finding one site in a sea of identical patterns",
    tags: ["Hackathon", "Computer Vision", "Applied Materials"],
    stats: [
      { label: "within 5 px", value: "91%" },
      { label: "median error", value: "0.08 px" },
      { label: "per pair · CPU", value: "0.66 s" },
      { label: "across 180 pairs", value: "94%" },
    ],
    features: [
      "Physics data generator — synthetic SEM images from 13 cited constants (DRAM 6F² geometry, edge-brightening, Poisson–Gaussian + scan-line noise)",
      "Classical ZNCC localizer — multi-scale × multi-rotation matching, lattice-aware peak analysis, parabolic sub-pixel refinement, PSR confidence",
      "Evaluation harness — 180 pairs with an intentional failure case to prove the method's limits",
    ],
    note: "We proved our own synthetic data was broken — twice — before trusting it.",
    links: [
      { label: "GitHub ↗", url: "https://github.com/Het161/driftlock" },
      { label: "Demo Video ↗", url: "https://youtu.be/UR5ryk2oOdo" },
      { label: "Full story →", url: "/hackathons#driftlock", internal: true },
    ],
    hasModal: true,
  },
];

export const WORK_CONTENTS = {
  OM_MARKETING: [
    {
      title: "OM Marketing",
      description:
        "OM Marketing is a business focused on supplying weighing scales and note counting machines to retailers, wholesalers, and businesses. The goal is to provide reliable hardware solutions that help businesses manage accurate billing and cash handling.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Business Owner
        </div>
      ),
    },
    {
      title: "Operations & Sales",
      description:
        "As the owner, I manage product sourcing, sales, and customer relationships. I work directly with shops and distributors to understand their requirements and provide the right weighing and cash handling solutions. This hands-on experience has helped me understand real business operations, logistics, and customer service.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Hardware Solutions for Retail Businesses
        </div>
      ),
    },
  ],

  OM_MARKETING_SOLUTIONS: [
    {
      title: "OM Marketing Solutions",
      description:
        "OM Marketing Solutions is a digital services company where I build websites, business automation systems, and AI chatbots to help businesses digitize their operations and generate more leads online.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Founder & Developer
        </div>
      ),
    },
    {
      title: "Web Development & Automation",
      description:
        "I design and develop modern websites, custom web applications, and automation systems tailored to business needs. My work includes lead generation systems, WhatsApp automation, and AI-powered chatbots like OM AI that answer customer queries automatically.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Websites • Automations • AI Chatbots
        </div>
      ),
    },
  ],

  HACKATHONS: [
    {
      title: "Hackathon Participation",
      description:
        "I have participated in multiple hackathons where I collaborated with developers and designers to build innovative solutions within limited timeframes. These experiences helped me improve problem-solving, rapid prototyping, and teamwork skills.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Builder & Problem Solver
        </div>
      ),
    },
    {
      title: "Innovation & Learning",
      description:
        "Hackathons pushed me to experiment with new technologies, build MVPs quickly, and validate ideas under pressure. They played a key role in sharpening my development and entrepreneurial mindset.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Building Fast. Learning Faster.
        </div>
      ),
    },
  ],
};

export const CERTIFICATIONS = [
  {
    slug: "hackbaroda-2026",
    name: "HackBaroda 2026 — Finalist",
    issuer: "Coder's Corner",
    date: "June 2026",
    year: 2026,
    category: "Hackathon",
    highlight: "Finalist",
    description:
      "Selected with Team Society for the Final Round of HackBaroda 2026, Gujarat's largest hackathon, held in Vadodara.",
    image: "/certifications/hackbaroda-2026.webp",
    gradient: ["#7C2D12", "#C2410C"],
  },
  {
    slug: "nasa-space-apps-2025",
    name: "Galactic Problem Solver",
    issuer: "NASA International Space Apps Challenge",
    date: "October 2025",
    year: 2025,
    category: "Hackathon",
    highlight: "Global",
    description:
      "Awarded for outstanding participation in the 2025 NASA International Space Apps Challenge, the world's largest global hackathon.",
    image: "/certifications/nasa-space-apps-2025.webp",
    gradient: ["#0F172A", "#1E40AF"],
  },
  {
    slug: "adobe-india-hackathon",
    name: "Adobe India Hackathon — Round 1",
    issuer: "Adobe · Unstop",
    date: "2025",
    year: 2025,
    category: "Hackathon",
    description:
      "Cleared Round 1 (Online MCQ Assessment + Coding) of the Adobe India Hackathon, representing Gandhinagar University.",
    image: "/certifications/adobe-india-hackathon.webp",
    gradient: ["#7F1D1D", "#DC2626"],
  },
  {
    slug: "iit-madras-road-safety-hackathon",
    name: "National Road Safety Hackathon 2025",
    issuer: "IIT Madras · Unstop",
    date: "2025",
    year: 2025,
    category: "Hackathon",
    description:
      "Participated in the National Road Safety Hackathon 2025 organised by the Indian Institute of Technology (IIT), Madras.",
    image: "/certifications/iit-madras-road-safety-hackathon.webp",
    gradient: ["#1E3A8A", "#2563EB"],
  },
  {
    slug: "techstars-startup-weekend",
    name: "Techstars Startup Weekend Gandhinagar",
    issuer: "PDEU Innovation & Incubation Centre",
    date: "August 2025",
    year: 2025,
    category: "Startup",
    description:
      "Certificate of Appreciation for participating in the 54-hour Techstars Startup Weekend hosted by PDEU IIC, backed by Google for Startups.",
    image: "/certifications/techstars-startup-weekend.webp",
    gradient: ["#831843", "#BE185D"],
  },
  {
    slug: "murf-ai-agents",
    name: "30 Days of AI Agents",
    issuer: "Murf AI",
    date: "August 2025",
    year: 2025,
    category: "AI",
    description:
      "Completed Murf's 30 Days of AI Agents challenge — building voice-enabled AI agents on the Murf API.",
    image: "/certifications/murf-ai-agents.webp",
    gradient: ["#581C87", "#7C3AED"],
  },
  {
    slug: "royal-technosoft-bootcamp",
    name: "Bootcamp Lead",
    issuer: "Royal Technosoft Pvt. Ltd.",
    date: "June 2025",
    year: 2025,
    category: "Leadership",
    highlight: "Led",
    description:
      "Recognised for successfully heading the developer bootcamps held at Royal Technosoft Pvt. Ltd.",
    image: "/certifications/royal-technosoft-bootcamp.webp",
    gradient: ["#064E3B", "#059669"],
  },
];

// Hackathon journey — station order = array order (chronological). Empty
// strings / missing fields render gracefully (element omitted, never "undefined").
// image resolves to /hackathons/<slug>.webp if present, else a gradient
// placeholder is generated at runtime.
// Optimized media path helper (outputs from `npm run media:hackathon`).
const hkMedia = (folder, slug, size = 1600) =>
  `/hackathon/_opt/${folder}/${slug}-${size}.webp`;
const hkGallery = (folder, slugs, alt) =>
  slugs.map((s) => ({ src: hkMedia(folder, s, 1600), alt }));

export const HACKATHONS = [
  {
    slug: "simguard",
    project: "SimGuard",
    event: "HackBaroda — Virtual Round",
    date: "",
    tagline: "",
    stack: [],
    liveUrl: "https://sim-guard.vercel.app/login",
    image: "/hackathons/simguard.webp",
    result: { label: "Virtual Round", status: "neutral" },
    accent: "#8b31ff",
  },
  {
    slug: "citemind",
    project: "CiteMind",
    event: "HackBaroda 2026",
    date: "",
    tagline: "GEO / AI-search citation-memory agent",
    stack: ["Groq", "MongoDB"],
    liveUrl: "https://cite-mind-six.vercel.app/",
    image: "/hackathons/citemind.webp",
    certSlug: "",
    result: { label: "Finalist", status: "highlight" },
    accent: "#9f55ff",
    media: { cover: hkMedia("covers", "citemind", 800) },
  },
  {
    slug: "aegis",
    project: "AEGIS",
    event: "ISRO Bharatiya Antariksh Hackathon 2026",
    date: "",
    tagline: "Air-gapped offline AI copilot",
    stack: [
      "FastAPI",
      "Ollama/Qwen3",
      "ChromaDB",
      "LightGBM",
      "TimescaleDB",
      "React",
    ],
    liveUrl: "https://aegis-vert-chi.vercel.app/",
    image: "/hackathons/aegis.webp",
    result: { label: "", status: "neutral" },
    accent: "#7000ff",
    media: { cover: hkMedia("covers", "isro", 800) },
  },
  {
    slug: "transitops",
    project: "TransitOps",
    event: "Odoo × Adani University Hackathon '26",
    date: "",
    tagline: "Fleet dispatch platform — single dispatch engine, API-first",
    stack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL"],
    liveUrl: null,
    repoUrl: "https://github.com/Het161/transitops-fleet-management",
    postUrl:
      "https://www.linkedin.com/posts/hetkumar-sanjaykumar-patel-54730933b_transitops-ugcPost-7488913031876362240-D3Uc/",
    image: "/hackathons/transitops.webp",
    result: { label: "Finale Selected", status: "highlight" },
    accent: "#b985ff",
    media: {
      cover: hkMedia(
        "transitops-hackathon",
        "screenshot-2026-07-12-at-5-17-45-pm",
        800
      ),
      gallery: hkGallery(
        "transitops-hackathon",
        [
          "screenshot-2026-07-12-at-5-17-45-pm",
          "screenshot-2026-07-12-at-5-17-52-pm",
          "screenshot-2026-07-12-at-5-17-59-pm",
          "screenshot-2026-07-12-at-5-18-09-pm",
          "screenshot-2026-07-12-at-5-18-16-pm",
          "screenshot-2026-07-12-at-5-18-24-pm",
          "screenshot-2026-07-12-at-5-18-32-pm",
          "screenshot-2026-07-12-at-5-18-38-pm",
          "screenshot-2026-07-12-at-5-18-47-pm",
          "screenshot-2026-07-12-at-5-18-55-pm",
        ],
        "TransitOps fleet dispatch platform screenshot"
      ),
    },
  },
  {
    // Scaffolded from the ADANI/ media (a separate edge computer-vision project
    // at the Adani University hackathon). TODO(Het): confirm event/date/result.
    slug: "adani-edge",
    project: "Real-Time Edge Restoration",
    event: "Adani University Hackathon",
    date: "",
    tagline:
      "Real-time GAN video deblurring & low-light enhancement on Jetson AGX",
    stack: ["GAN", "Jetson AGX", "TensorRT", "Computer Vision"],
    liveUrl: null,
    image: null,
    result: { label: "", status: "neutral" },
    accent: "#7000ff",
    media: {
      cover: hkMedia("adani", "real-time-restoration-at-the-edge", 800),
      gallery: hkGallery(
        "adani",
        [
          "real-time-restoration-at-the-edge",
          "the-speed-vs-clarity-trade-off",
          "key-innovation-motion-deblurring",
          "technical-architecture",
          "edge-optimisation",
          "built-for-performance",
          "the-dashboard-actionable-insights",
          "business-impact",
          "ready-for-deployment",
        ],
        "Real-Time Edge Restoration pitch slide"
      ),
    },
  },
  {
    slug: "smartwork360",
    project: "SMARTWORK 360",
    event: "Smart India Hackathon (SIH)",
    date: "",
    tagline:
      "AI task & performance management — sentiment, fraud detection, burnout prediction, blockchain audit",
    stack: [
      "DistilBERT",
      "IsolationForest",
      "PostgreSQL",
      "Railway",
      "Blockchain/SHA-256",
    ],
    liveUrl: "https://smartwork360.vercel.app",
    repoUrl: "https://github.com/Het161/smartwork360",
    image: "/hackathons/smartwork360.webp",
    result: { label: "Cleared Round 1", status: "neutral" },
    accent: "#8b31ff",
    media: {
      cover: hkMedia("sih", "whatsapp-image-2026-07-22-at-19-22-48-1", 800),
      gallery: hkGallery(
        "sih",
        [
          "whatsapp-image-2026-07-22-at-19-22-48",
          "whatsapp-image-2026-07-22-at-19-22-48-1",
          "whatsapp-image-2026-07-22-at-19-22-48-2",
        ],
        "SMARTWORK 360 team at Smart India Hackathon"
      ),
      deck: "/hackathon/SIH/SMARTWORK360_SIH_2025.pdf",
    },
  },
  {
    slug: "agentic-pharma",
    project: "Agentic Pharma Insights",
    event: "EY Techathon 6.0",
    date: "",
    tagline: "Master + worker agents for citation-first pharma briefs",
    stack: ["Django REST", "Flutter", "Celery", "PostgreSQL", "Docker", "RAG"],
    liveUrl: null,
    image: "/hackathons/agentic-pharma.webp",
    result: { label: "Result Awaited", status: "pending" },
    accent: "#9f55ff",
    media: {
      deck: "/hackathon/TeamCoders_Pharmaceuticals.pdf",
    },
  },
  {
    slug: "shecarex",
    project: "SheCareX",
    event: "PDEU Hackathon",
    date: "",
    tagline:
      "Offline-first personal safety — SOS, guardian escalation, ERSS-aligned",
    stack: [],
    liveUrl: "https://shecarex.netlify.app/",
    repoUrl: "https://github.com/Het161/SheCareX",
    image: "/hackathons/shecarex.webp",
    result: null,
    accent: "#cf0000",
    media: {
      cover: hkMedia("pdeu", "whatsapp-image-2026-07-24-at-12-25-26", 800),
      gallery: hkGallery(
        "pdeu",
        [
          "whatsapp-image-2026-07-24-at-12-25-26",
          "whatsapp-image-2026-07-24-at-12-25-27",
          "whatsapp-image-2026-07-24-at-12-25-27-1",
          "whatsapp-image-2026-07-24-at-12-25-28",
          "whatsapp-image-2026-07-24-at-12-25-28-1",
          "whatsapp-image-2026-07-24-at-12-25-29",
          "whatsapp-image-2026-07-24-at-12-25-29-1",
          "whatsapp-image-2026-07-24-at-12-25-30",
          "whatsapp-image-2026-07-24-at-12-25-30-1",
          "whatsapp-image-2026-07-24-at-12-25-30-2",
        ],
        "SheCareX team at PDEU Hackathon"
      ),
    },
  },
  {
    slug: "dhanrakshak",
    project: "DhanRakshak AI",
    event: "Maverick AI Hackathon",
    date: "",
    tagline: "",
    stack: [],
    liveUrl: "https://dhanrakshakai.netlify.app/",
    repoUrl: "https://github.com/Het161/DHANRAKSHAK",
    image: "/hackathons/dhanrakshak.webp",
    result: { label: "Finale Selected", status: "highlight" },
    accent: "#00ac56",
    media: {
      cover: hkMedia("covers", "mavrick", 800),
      video: "/hackathon/_opt/dhanrakshak/demo-720p.mp4",
      videoPoster: "/hackathon/_opt/dhanrakshak/demo-poster-800.webp",
      deck: "/hackathon/DHANRAKSHAK/dhanrakshak-deck.pdf",
    },
  },
  {
    slug: "talk-to-lead",
    project: "Talk-to-Lead",
    event: "",
    date: "",
    tagline: "",
    stack: [],
    liveUrl: "https://talk-to-lead.vercel.app/",
    image: "/hackathons/talk-to-lead.webp",
    result: { label: "Top 100 · Won 5K credits", status: "highlight" },
    accent: "#b985ff",
    media: { cover: hkMedia("covers", "talktolead", 800) },
  },
  {
    // From the PARUL/ media (AgriScan AI at PU Code Hackathon 3.0).
    // TODO(Het): confirm date/result and refine tagline/stack.
    slug: "agriscan",
    project: "AgriScan AI",
    event: "PU Code Hackathon 3.0 — Parul University",
    date: "",
    tagline: "Multilingual AI crop nutrient detector (EN / हिंदी / ગુજરાતી)",
    stack: [],
    liveUrl: null,
    image: null,
    result: null,
    accent: "#00ac56",
    media: {
      cover: hkMedia("parul", "agriscan", 800),
      gallery: [
        { src: hkMedia("parul", "agriscan", 1600), alt: "AgriScan AI app" },
        ...hkGallery(
          "parul",
          [
            "whatsapp-image-2026-07-24-at-12-25-25",
            "whatsapp-image-2026-07-24-at-12-25-31",
          ],
          "AgriScan AI at PU Code Hackathon 3.0"
        ),
      ],
      deck: "/hackathon/PARUL/ParulHackathon.pdf",
    },
  },
  {
    // Most recent (Aug 2026). Imagery TODO(Het): drop figures into
    // public/hackathon/SEMICON/ (ablation trio = cover; geometry / success /
    // failure / robustness = gallery); until then the placeholder covers it.
    slug: "driftlock",
    project: "DriftLock",
    event: "SEMICON India Hackathon 2026 — Applied Materials track",
    eventUrl: "https://i4c.in/hackathon-2026/",
    date: "Aug 2026",
    tagline:
      "Physics-based synthetic SEM data + classical multi-scale localization for wafer inspection. 91% within 5 px, median error 0.08 px, 0.66 s per pair on a plain CPU.",
    description:
      "DriftLock — finding one site in a sea of identical patterns. A wafer inspection tool must return to the exact same site thousands of times a day while every die repeats the same layout. DriftLock pairs a physics-grounded synthetic SEM data generator (13 cited constants: DRAM 6F² geometry, SEM edge-brightening, Poisson–Gaussian + scan-line noise) with a classical localizer: multi-scale × multi-rotation ZNCC, lattice-aware peak analysis, ambiguity-gated fallback, parabolic sub-pixel refinement, PSR confidence. 94% within 5 px across 180 pairs, median error 0.08 px, 0.66 s per pair, CPU-only — no deep learning, no GPU.",
    stack: ["Python", "NumPy", "OpenCV", "SciPy", "Matplotlib"],
    liveUrl: null,
    repoUrl: "https://github.com/Het161/driftlock",
    videoUrl: "https://youtu.be/UR5ryk2oOdo",
    result: { label: "Submitted · Results Pending", status: "pending" },
    accent: "#b985ff",
    team: "Het Patel — algorithm, data generator, architecture · Eklavya Jha — evaluation, visualization, presentation",
  },
];

// My Journey — narrative chapters (Class 9 → now). Copy is final prose,
// rendered verbatim. Dates marked "verify" are Het's best reconstruction.
// Optional per-chapter artifact: { src, alt, caption } (TODO(Het) to supply).
export const JOURNEY = [
  {
    id: "ch1",
    chapter: "01",
    title: "Last bench, last section",
    period: "Class 9 · 2020–21", // verify
    body: `I sat at the back of the last section. Maths and science didn't make sense, so I memorised questions and answers and hoped the exam asked them the same way. I was good at one thing — cricket. I got picked for the inter-school team, got injured in practice, and didn't play. Then COVID closed the school. Class became a Zoom window; the rest was BGMI, outdoor games, and time at home.`,
    pull: "Memorised the answers. Didn't understand one of them.",
  },
  {
    id: "ch2",
    chapter: "02",
    title: "Manoj sir and Pradeep sir",
    period: "Class 10 · 2021–22", // verify
    body: `Boards were the year students could have coasted — marks were being carried across. I studied anyway. Manoj sir took maths, Pradeep sir took science, and both started from the base: not the chapter, the thing underneath the chapter. It was the first time those subjects made sense instead of needing to be memorised. I scored well in both. The bigger change wasn't on the marksheet — I could walk into a new place and talk to the people in it.`,
    pull: "They taught from the base. Everything after that is downstream of it.",
  },
  {
    id: "ch3",
    chapter: "03",
    title: "No tuition",
    period: "Class 11 · 2022–23", // verify
    body: `The day class 10 ended I started class 11 physics, chemistry and maths — months before the syllabus did. I was preparing for the NDA exam, so I pushed further: by the end of class 11 I had finished both class 11 and class 12 maths. No tuition that year, in any subject. I didn't sit the NDA exam in the end — family reasons. The maths stayed.`,
    pull: "Two years of maths in one. Taught to myself.",
  },
  {
    id: "ch4",
    chapter: "04",
    title: "Two educations",
    period: "Class 12 · 2023–24", // verify
    body: `Mornings and nights were board prep — the same tuition as class 10, paper after paper. In between I went with my father to the weighing-scale business and sold scales myself. That taught what school doesn't: how to open a conversation with a customer, how to move them to yes, how money actually moves through a business. After Diwali the market got interesting — MoneyControl, TradingView, drawing charts, paper trades off my own research. Fake money. The profit taught me something real.`,
    pull: "School in the morning. The shop floor in the afternoon.",
  },
  {
    id: "ch5",
    chapter: "05",
    title: "Gandhinagar University",
    period: "Year 1 · 2024", // verify
    // TODO(Het): trim the last two sentences to taste — your call on how much to say here
    body: `B.Tech, Computer Engineering. Six months of IELTS preparation, 6.5 band — the plan was to study abroad. The plan changed. I turned toward code instead.`,
    pull: null,
  },
  {
    id: "ch6",
    chapter: "06",
    title: "I couldn't write a program from a blank file",
    period: "Sem 1–2 · 2024–25", // verify
    body: `For most of first year I wasn't really a programmer. Free ChatGPT, free Gemini — paste the prompt, paste the answer back, ship something that ran. I went to hackathons with friends and understood almost nothing we submitted. The grades were fine, good CGPA across every subject, which made the gap easy to ignore. I started 100 Days of Code and the Apna College track, and still couldn't write a program from an empty file.`,
    pull: "The grades were fine. That was the problem.",
  },
  {
    id: "ch7",
    chapter: "07",
    title: "Blank page, then build it cold",
    period: "Sem 3–4 · 2025–26", // verify
    body: `Fourth semester is where it turned. The MERN course, then DSA in Java, with one rule: solve it on paper first, write it from a blank page, then rebuild it cold the next day. Projects stopped being prompts and started being code. SMARTWORK 360 went to Smart India Hackathon. TransitOps went to Odoo. CiteMind reached the HackBaroda finals. Clients started paying for websites.`,
    pull: "Paper first. Blank page. Cold rebuild.",
  },
  {
    id: "ch8",
    chapter: "08",
    title: "Now",
    period: "2026",
    body: `OM Marketing Solutions runs alongside my father's weighing-scale business and my degree. I ship production features on a live sports-booking SaaS. Ten hackathons in, with a national finalist, an Odoo finale, and a top-100 win. DriftLock — sub-pixel wafer localization, no deep learning — is with the SEMICON India judges now.`,
    pull: "Six years ago I memorised answers because understanding them felt out of reach. The pattern since has been the same every time: show up short, close the gap, repeat.",
  },
];

// Per-chapter visual state for the 3D layer — interpolated continuously by
// scroll progress (never stepped). cameraY rises, fog thins, saturation warms
// toward full brand purple as the Δ assembles (convergence 0 → 1). Chapter 6
// deliberately dips (the honest low point) before chapter 7 lifts.
export const JOURNEY_STATE = [
  { cameraY: 0.0, fog: 0.05, saturation: 0.1, convergence: 0.0, accent: "#3a3a42" },
  { cameraY: 0.14, fog: 0.044, saturation: 0.25, convergence: 0.12, accent: "#4a4458" },
  { cameraY: 0.28, fog: 0.04, saturation: 0.35, convergence: 0.25, accent: "#5b4a7a" },
  { cameraY: 0.43, fog: 0.032, saturation: 0.5, convergence: 0.4, accent: "#6b4a9a" },
  { cameraY: 0.58, fog: 0.028, saturation: 0.6, convergence: 0.52, accent: "#7000ff" },
  { cameraY: 0.68, fog: 0.03, saturation: 0.55, convergence: 0.62, accent: "#5f5a7a" },
  { cameraY: 0.84, fog: 0.02, saturation: 0.85, convergence: 0.82, accent: "#8b31ff" },
  { cameraY: 1.0, fog: 0.014, saturation: 1.0, convergence: 1.0, accent: "#9f55ff" },
];

// The ending trio, shown once the Δ has assembled.
//  • dedication — the one personal line. Absent until you write it: null renders
//    NOTHING (never a gap). { text, gloss } — gloss is the quieter second line.
//  • signature — drop a stroke-drawable SVG (potrace your scan) at this path; it
//    draws itself on, then the CTAs follow. Missing file = silently skipped.
//  • recap is assembled from the chapter titles at render time (not stored).
export const JOURNEY_ENDING = {
  // TODO(Het): your dedication, e.g. { text: "For …", gloss: "…" }.
  dedication: null,
  signature: "/journey/signature.svg",
};

// A journey-only ambient bed, separate from the global SoundBar and OFF by
// default. The toggle only appears when `pad` points at a real file — drop a
// CC0 pad (≤1.5MB, seamless loop) at the path and set it here to light it up.
// A lowpass opens 400Hz→8kHz and the level lifts −18→−10dB across the scroll;
// a single chime marks ch6→ch7 (synthesised if `chime` is null). Absent = no
// toggle, no gap.
export const JOURNEY_AUDIO = {
  // TODO(Het): e.g. "/journey/pad.webm" (a CC0 ambient drone).
  pad: null,
  chime: null,
};

export const GTAG = "G-5HCTL2TJ5W";
