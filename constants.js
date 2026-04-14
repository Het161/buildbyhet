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
    name: "SmartWork 360",
    imageKey: "smartwork",
    description: "Enterprise-grade backend architecture with JWT-based RBAC, 95% test coverage & ~120ms median API latency 🚀",
    gradient: ["#2563EB", "#1E3A8A"],
    url: "https://smartwork-frontend-n8nr.vercel.app",
    tech: ["fastapi", "postgresql", "docker", "pytest", "github-actions", "jwt"],
  },
  {
    name: "OM Marketing Solutions",
    imageKey: "ommarketingsolutions",
    description: "Modern digital agency delivering web solutions, business automation, and AI chatbots 🚀",
    gradient: ["#0F172A", "#334155"],
    url: "https://ommarketingsolutions.in",
    tech: ["nextjs", "tailwindcss", "typescript"],
  },
  {
    name: "TT Marketing",
    imageKey: "ttmarketing",
    description: "Comprehensive marketing platform and high-tech retail presence for modern business growth 📈",
    gradient: ["#1E1B4B", "#4338CA"],
    url: "https://ttmarketing.co.in",
    tech: ["react", "tailwindcss", "typescript"],
  },
  {
    name: "Stockpilot",
    imageKey: "stockpilot",
    description: "Advanced inventory management system designed for enterprise operational efficiency 📦",
    gradient: ["#312E81", "#1E3A8A"],
    url: "https://stockpilot-lake.vercel.app/login",
    tech: ["nextjs", "typescript", "tailwindcss"],
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
  {
    name: "SilverLeaf Preschool",
    imageKey: null,
    description: "Nurturing preschool for children aged 2–6 in Silvassa. Play-based holistic development blending traditional values with modern education.",
    gradient: ["#14532D", "#166534"],
    url: "https://silver-leaf-preschool.vercel.app/",
    tech: ["html", "css", "javascript"],
    tagline: "Where Young Minds Bloom and Dreams Take Flight",
    tags: ["Client Project", "Frontend", "Education"],
    location: "Silvassa, Dadra & Nagar Haveli",
    stats: [
      { label: "Years", value: "15+" },
      { label: "Students", value: "200+" },
      { label: "Programs", value: "6" },
    ],
    features: [
      "Fully responsive landing page",
      "Photo gallery with real images",
      "WhatsApp-linked contact form",
      "Smooth scroll navigation",
      "Google Maps embed",
      "Program cards & Why Us section",
    ],
    hasModal: true,
  },
  {
    name: "Priya's Training Hub",
    imageKey: null,
    description: "18-year-old professional training institute in Silvassa offering corporate training, soft skills, teacher certifications & CSR skill development.",
    gradient: ["#1E3A5F", "#1D4ED8"],
    url: "https://priyas-training-hub.vercel.app/",
    tech: ["html", "css", "javascript"],
    tagline: "Brings out the best in you",
    tags: ["Client Project", "Frontend", "Education", "Corporate"],
    location: "Silvassa, Dadra & Nagar Haveli",
    stats: [
      { label: "Years Experience", value: "18+" },
      { label: "Professionals Trained", value: "500+" },
      { label: "Corporate Clients", value: "6+" },
    ],
    features: [
      "Multi-section landing page (About, Courses, Gallery, Clients, CSR, Contact)",
      "Real photo gallery with training session images",
      "Corporate client logos section (HUL, Anchor Panasonic, RR Kabel, etc.)",
      "WhatsApp CTA buttons integrated throughout",
      "Contact form with program selection dropdown",
      "CSR section with community programs",
      "Smooth animations and responsive design",
      "Google Maps embed",
    ],
    hasModal: true,
  },
  {
    name: "FindUrTrip",
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
