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

export const GTAG = "G-5HCTL2TJ5W";
