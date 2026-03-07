export const METADATA = {
  author: "Het Patel",
  title: "Portfolio | Het Patel",
  description:
    "Het Patel is a passionate Frontend Engineer, dedicated to crafting aesthetic and modern apps that captivate and engage users.",
  siteUrl: "https://www.buildbyhet.me/",
  twitterHandle: "@shubhporwal24",
  keywords: [
    "Het Patel",
    "Full-Stack Developer",
    "React Native Engineer",
    "Software Engineer",
    "Portfolio",
    "Devfolio",
    "Folio",
  ].join(", "),
  image:
    "https://res.cloudinary.com/dywdhyojt/image/upload/v1721378510/social-preview.png",
  language: "English",
  themeColor: "#000000",
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
    url: "mailto:hetpatelsk@gmail.com",
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
    name: "SmartWork 360",
    imageKey: "smartwork",
    description: "Enterprise-grade backend architecture with JWT-based RBAC, 95% test coverage & ~120ms median API latency 🚀",
    gradient: ["#2563EB", "#1E3A8A"],
    url: "https://smartwork-frontend-n8nr.vercel.app",
    tech: ["fastapi", "postgresql", "docker", "pytest", "github-actions", "jwt"],
  },
  {
    name: "NASA Space Apps Challenge",
    imageKey: "nasa",
    description: "Weather probability forecasting engine using 20+ years of NASA POWER & MERRA-2 satellite data 🌍",
    gradient: ["#0F172A", "#334155"],
    url: "https://github.com/Het161/Space-APP",
    tech: ["python", "fastapi", "pandas", "numpy", "xarray"],
  },
  {
    name: "Campus Life",
    imageKey: "campus",
    description: "Anonymous campus communication platform with real-time interaction & modern UI 💬",
    gradient: ["#7C3AED", "#4C1D95"],
    url: "https://lovable.dev/projects/62ea0abc-4005-4a58-bc1f-b59fa8cbdc54",
    tech: ["react", "typescript", "vite", "tailwindcss"],
  },
  {
    name: "OM Marketing Digital System",
    imageKey: "om-marketing",
    description: "Digitized inventory & business workflow system reducing reconciliation time by 60% 📊",
    gradient: ["#065F46", "#064E3B"],
    url: "https://www.ommarketing.co.in",
    tech: ["process-automation", "crm", "whatsapp-business", "python"],
  },
  {
    name: "Build By Het",
    imageKey: "buildbyhet",
    description: "Personal developer portfolio showcasing backend engineering & full-stack capabilities 🌐",
    gradient: ["#111827", "#2563EB"],
    url: "https://www.buildbyhet.me",
    tech: ["react", "typescript", "vite", "tailwindcss"],
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
  // AVIATE: [
  //   {
  //     title: "Aviate",
  //     description:
  //       "Aviate is a preparation and mentorship platform for job-seekers that are seeking non-technical roles across top companies",
  //     content: (
  //       <div className="h-full w-full flex items-center justify-center text-white px-4">
  //         Finding the right job isn&apos;t fate, it&apos;s navigation
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Innovation",
  //     description:
  //       "I spearheaded the development of Q-Rate, their flagship product, a voice-based applicant screening platform. Moreover, I took initiatives to enhance user engagement and drive substantial increases in daily traffic. Additionally, I implemented an error-logging and bug reporting system, significantly diminishing user-reported bugs.",
  //     content: (
  //       <div className="h-full w-full flex items-center justify-center text-white px-4">
  //         Frontend Developer Intern
  //       </div>
  //     ),
  //   },
  // ],
  // SPACENOS: [
  //   {
  //     title: "Spacenos",
  //     description:
  //       "A dynamic startup dedicated to creating innovative products that make the world a better place.",
  //     content: (
  //       <div className="h-full w-full flex items-center justify-center text-white px-4">
  //         We build apps that solve problems for the next billion people
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Trailblazing",
  //     description:
  //       "I led the comprehensive overhaul of the Admin Portal, implementing CRUD features for all services and providers. Additionally, I architected a feature enabling precise customer location tracking and delivering insightful usage statistics. Through optimized and compressed file serving, I catalyzed a remarkable Yx increase in page speed, resulting in a X% boost in customer retention.",
  //     content: (
  //       <div className="h-full w-full flex items-center justify-center text-white px-4">
  //         Web Developer Intern
  //       </div>
  //     ),
  //   },
  // ],

export const GTAG = "G-5HCTL2TJ5W";
