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
  "A pragmatic Frontend Engineer",
  "I build things for the web",
  "I create aesthetic and modern apps",
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
  GRAPEVINE: [
    {
      title: "Grapevine",
      description:
        "Grapevine is your anonymous office chat, letting coworkers speak openly, share gossip and connect without filters. Building on that same belief, Round1 AI brings it to hiring using AI-driven interviews to replace guesswork with genuine and meaningful conversations.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Connect anonymously. Share freely.
        </div>
      ),
    },
    {
      title: "Pioneering",
      description:
        "Hiring was broken — manual, biased, and slow. We launched Round1 AI to fix that: authentic voice interviews, built-in bias checks and real-time insights. Today, it powers thousands of interviews each week, letting teams hire smarter, faster and fairer.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Senior Frontend Engineer
        </div>
      ),
    },
    {
      title: "Elevate",
      description:
        "The early web app struggled with slow performance and zero retention. I rebuilt it from the ground up with a sleek UI, faster load times and SEO-optimized. Then seeded a rich content layer to spark discovery. The payoff? 6x more impressions and 10x the organic installs all without ads, just momentum.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Engineer
        </div>
      ),
    },
  ],
  DUKAAN: [
    {
      title: "Dukaan",
      description:
        "Dukaan is a platform that enables businesses to launch their online stores at ease.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Revolutionizing commerce, one click at a time
        </div>
      ),
    },
    {
      title: "Transformation",
      description:
        "Since 2023, the Dukaan Seller Dashboard struggled with technical issues and a broken user experience due to accumulated technical debt. Leading a team of two junior developers, we migrated the dashboard from CSR to SSR, redesigned the UI, and overhauled the codebase in the process. This resolved the technical debt and vastly improved the user experience, making it Dukaan's largest and most impactful migration.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Senior Frontend Engineer
        </div>
      ),
    },
    {
      title: "Evolution",
      description:
        "Recognizing the need for improved performance and user engagement, I spearheaded the migration of the Dukaan App from native to React-Native for iOS and Android platforms. This strategic move led to a X% enhancement in app performance and a Y% boost in user engagement, representing a significant milestone in the app's evolution.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Engineer
        </div>
      ),
    },
    {
      title: "Optimization",
      description:
        "Leveraging user feedback and analytics, I improved the seller web dashboard design, reducing bounce rates. Simultaneously, I overhauled the build process, slashing bundle size and boosting overall performance.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Engineer Intern
        </div>
      ),
    },
  ],
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
};

export const GTAG = "G-5HCTL2TJ5W";
