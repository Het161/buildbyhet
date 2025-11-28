// ============================================
// MOCK AI CHAT API (NO OPENAI NEEDED - FREE!)
// ============================================

import { NextRequest, NextResponse } from 'next/server';

// ========== HET'S ACTUAL PORTFOLIO DATA ==========
const portfolioData = {
  personal: {
    name: "Het Sanjaybhai Patel",
    shortName: "Het Patel",
    title: "Backend Developer",
    subtitle: "Python & FastAPI Specialist | Building Scalable REST APIs",
    location: "Ahmedabad, Gujarat, India",
    university: "Gandhinagar University",
    degree: "BTech Computer Engineering",
    year: "2nd Year (Expected Graduation: 2028)",
    cgpa: "8.36 SGPA",
    bio: "Backend developer specializing in Python, FastAPI and PostgreSQL. Building secure, well-tested REST APIs with JWT/OAuth and CI on GitHub Actions. Delivered Dockerized services and demo-ready products at hackathons (SIH 2024, NASA Space Apps Challenge). Targeting backend/intern roles to ship quickly and measure impact.",
    email: "hetpatelsk@gmail.com",
    phone: "9825247312",
    github: "https://github.com/Het161",
    linkedin: "https://www.linkedin.com/in/hetkumar-sanjaykumar-patel-54730933b",
  },
  
  skills: {
    languages: ["Python", "SQL", "JavaScript", "TypeScript", "Java"],
    frameworks: ["FastAPI", "Next.js", "Spring Boot (basics)", "React", "Node.js"],
    databases: ["PostgreSQL", "SQLAlchemy", "Alembic migrations", "Database indexing & optimization"],
    backend: [
      "REST API design",
      "JWT/OAuth authentication",
      "Role-based access control",
      "API rate limiting",
      "Pagination & filtering",
      "Docker containerization",
      "CI/CD with GitHub Actions"
    ],
    tools: ["Docker", "Git/GitHub", "Postman", "Pytest", "GitHub Actions", "Makefile", "Uvicorn"],
    concepts: ["RESTful APIs", "Test-Driven Development (95% coverage)", "API optimization (~120ms latency)", "Microservices", "OpenAPI documentation"],
    other: ["Artificial Intelligence", "Team Work", "Communication", "Leadership", "SEO", "Digital Marketing"],
    currently_learning: ["Advanced PostgreSQL", "System Design", "Kubernetes", "Redis caching", "GraphQL"],
  },
  
  projects: [
    {
      name: "SIH Backend",
      fullName: "Smart India Hackathon 2024 - SmartWork 360 Backend",
      description: "Enterprise-grade backend for productivity platform. Designed modular REST APIs with role-based auth (JWT), Alembic migrations, and typed Pydantic models.",
      role: "Backend Developer",
      tech: ["FastAPI", "PostgreSQL", "Uvicorn", "SQLAlchemy", "Pytest", "Docker", "GitHub Actions"],
      features: [
        "Role-based authentication with JWT",
        "Optimized queries: ~120ms median latency, p95 ~220ms",
        "95% test coverage with Pytest",
        "Pagination, filtering, and rate limiting",
        "Dockerized dev environment",
        "CI/CD pipeline with GitHub Actions",
        "OpenAPI docs + Postman collection"
      ],
      metrics: [
        "~120ms median API latency",
        "95% test coverage",
        "p95 latency under 220ms"
      ],
      status: "Completed",
      year: 2024,
      type: "Hackathon Project",
      github: "https://github.com/Het161/SIH-Backend",
    },
    {
      name: "NASA Space Apps Challenge",
      fullName: "ProbablePlan - Weather Prediction Microservices",
      description: "FastAPI microservices computing day-of-year, coordinate-specific probabilities for extreme weather conditions using NASA POWER and MERRA-2 datasets.",
      role: "Backend Developer",
      tech: ["FastAPI", "xarray", "pandas", "NumPy", "NASA POWER API", "MERRA-2"],
      features: [
        "Spatiotemporal data pipeline with xarray/pandas",
        "Multi-decadal weather analysis",
        "Threshold-exceedance statistics",
        "JSON summaries + CSV exports",
        "NASA POWER & MERRA-2 integration",
        "Real-time weather risk assessment"
      ],
      status: "Completed",
      year: 2024,
      type: "Hackathon Project",
      github: "https://github.com/Het161/Space-APP",
    },
    {
      name: "Campus Whisper Connect",
      description: "Anonymous social platform for campus communication",
      role: "Full-Stack Developer",
      tech: ["React", "Node.js", "PostgreSQL"],
      status: "In Progress",
      year: 2024,
      type: "Personal Project",
      github: "https://github.com/Het161/campus-whisper-connect",
    },
    {
      name: "Startup Weekend PDEU IIC",
      fullName: "Social Media Platform MVP",
      description: "Designed and developed social media platform MVP. Earned Top 13 finish (26th percentile) among 50 teams.",
      role: "Backend Developer",
      tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      features: [
        "Full-stack MVP development",
        "Rapid prototyping and delivery",
        "Team collaboration",
        "Demo-ready product"
      ],
      status: "Completed",
      year: 2024,
      type: "Competition",
      achievement: "Top 13 / 50 teams (26th percentile)",
    },
  ],
  
  experience: [
    {
      company: "OM Marketing",
      role: "Owner & Developer",
      period: "2022 - Present",
      location: "Ahmedabad, Gujarat",
      type: "Business & Development",
      responsibilities: [
        "Operate retail/industrial weighing scale business",
        "Built lightweight inventory + invoicing workflow",
        "Reduced reconciliation time by 60%",
        "Reduced returns due to errors by 90%",
        "Implemented CRM tracking and WhatsApp outreach",
        "Increased repeat orders and shortened response SLAs"
      ],
      technologies: ["Python scripts", "Spreadsheets", "CRM", "WhatsApp API"],
    },
    {
      company: "Succesguru",
      role: "Freelance Affiliate Marketer",
      period: "2024",
      type: "Freelance",
      responsibilities: [
        "Digital marketing strategies for affiliate networks",
        "Campaign performance tracking and optimization",
        "Content creation across social media, blogs, email",
        "SEO and data analysis",
        "Marketing automation tools"
      ],
      technologies: ["SEO", "Analytics", "Social Media", "Email Marketing"],
    },
  ],
  
  education: [
    {
      institution: "Gandhinagar University",
      degree: "BTech Computer Engineering",
      period: "2024 - 2028 (Expected)",
      cgpa: "8.36 SGPA",
      status: "Currently pursuing (2nd year)",
    },
    {
      institution: "Maharshi Sandipani School",
      degree: "Class 12th Science (A Group)",
      period: "2024",
      score: "68%",
    },
    {
      institution: "Maharishi Sandipani School",
      degree: "Class 10th",
      period: "2022",
      score: "70%",
    },
  ],
  
  certifications: [
    {
      name: "IELTS",
      score: "6.5 Bands",
      year: 2024,
    },
  ],
  
  achievements: [
    "🏆 Smart India Hackathon 2024 Participant",
    "🚀 NASA Space Apps Challenge 2024 Participant",
    "🥉 Startup Weekend PDEU IIC - Top 13 / 50 teams",
    "💼 Built production-ready backends with 95% test coverage",
    "⚡ Optimized APIs to ~120ms median latency",
    "🎓 8.36 SGPA in BTech Computer Engineering",
    "🌐 IELTS 6.5 Bands",
    "📈 Reduced business reconciliation time by 60%",
  ],
  
  interests: [
    "Backend Architecture & API Design",
    "Database Optimization",
    "System Design & Scalability",
    "Open Source Contribution",
    "Hackathons & Competitive Coding",
    "DevOps & CI/CD",
    "Cloud Technologies",
    "Building SaaS Products",
  ],
  
  availability: {
    status: "Open to opportunities",
    types: ["Backend Internships", "Full-Stack Roles", "Freelance Projects", "Part-time Remote Work"],
    preferred_roles: ["Backend Developer", "Python Developer", "API Developer", "FastAPI Specialist"],
    work_mode: "Remote or Hybrid in Ahmedabad/Gandhinagar",
    notice_period: "Immediate (Student availability)",
    targetCompanies: "Startups, Product companies, Tech-driven organizations",
  },
};

// ========== RATE LIMITING ==========
const requestCounts = new Map<string, number[]>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 3600000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  const recentRequests = userRequests.filter((t: number) => now - t < RATE_WINDOW);
  if (recentRequests.length >= RATE_LIMIT) return false;
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  return true;
}

// ========== AI RESPONSE GENERATOR ==========
function generateResponse(msg: string): string {
  const text = msg.toLowerCase();
  
  // Greetings
  if (text.match(/^(hi|hello|hey)/)) {
    return `Hey there! 👋 I'm Het Patel's AI assistant. I can tell you about his backend development skills, projects at SIH and NASA Space Apps, or his experience with FastAPI and PostgreSQL. What would you like to know?`;
  }
  
  // Projects
  if (text.match(/(project|work|built|portfolio|sih|nasa)/)) {
    if (text.match(/sih|smart.*india|smartwork/i)) {
      const p = portfolioData.projects[0];
      return `**${p.name}** - ${p.description}\n\n**Performance**:\n${p.metrics?.map(m => `• ${m}`).join('\n')}\n\n**Tech**: ${p.tech.join(', ')}\n\n**Features**:\n${p.features?.slice(0, 4).map(f => `• ${f}`).join('\n')}\n\nGitHub: ${p.github}`;
    }
    if (text.match(/nasa|space|weather/i)) {
      const p = portfolioData.projects[1];
      return `**${p.fullName}** 🚀\n\n${p.description}\n\n**Tech**: ${p.tech.join(', ')}\n\n**Key Features**:\n${p.features?.slice(0, 4).map(f => `• ${f}`).join('\n')}\n\nGitHub: ${p.github}`;
    }
    const list = portfolioData.projects.slice(0, 3).map(p => 
      `• **${p.name}**: ${p.description.substring(0, 80)}...`
    ).join('\n');
    return `Het has built impressive backend projects:\n\n${list}\n\nWhich one interests you? (Try asking about "SIH" or "NASA")`;
  }
  
  // Skills
  if (text.match(/(skill|tech|stack|know|language|api|backend)/)) {
    if (text.match(/backend|api|fastapi|rest/i)) {
      return `Het specializes in **backend development**! 💻\n\n**Backend Expertise**:\n${portfolioData.skills.backend.slice(0, 5).map(s => `• ${s}`).join('\n')}\n\n**Databases**: ${portfolioData.skills.databases.slice(0, 3).join(', ')}\n\n**Performance**: Optimized APIs to ~120ms median latency with 95% test coverage!`;
    }
    if (text.match(/database|postgres|sql/i)) {
      return `Het is strong with **PostgreSQL**! 🗄️\n\n**Database Skills**:\n${portfolioData.skills.databases.map(d => `• ${d}`).join('\n')}\n\nHe optimizes queries, designs schemas, and manages migrations with Alembic.`;
    }
    return `Het is a **backend specialist**:\n\n**Languages**: ${portfolioData.skills.languages.join(', ')}\n**Frameworks**: ${portfolioData.skills.frameworks.slice(0, 4).join(', ')}\n**Databases**: ${portfolioData.skills.databases.slice(0, 2).join(', ')}\n**Tools**: ${portfolioData.skills.tools.slice(0, 4).join(', ')}\n\nWhat area interests you?`;
  }
  
  // Education
  if (text.match(/(education|university|college|degree|student|studying|cgpa|gpa)/)) {
    const edu = portfolioData.education[0];
    return `Het is studying at **${edu.institution}**! 🎓\n\n**Degree**: ${edu.degree}\n**CGPA**: ${edu.cgpa}\n**Year**: ${portfolioData.personal.year}\n\n**Also**:\n• IELTS: 6.5 Bands\n• Class 12th: 68%\n• Class 10th: 70%\n\nBalancing academics with hackathons and backend projects!`;
  }
  
  // Experience
  if (text.match(/(experience|work|job|intern|om.*market|business)/)) {
    const exp = portfolioData.experience[0];
    return `**${exp.company}** - ${exp.role}\n\n${exp.responsibilities.slice(0, 4).map(r => `• ${r}`).join('\n')}\n\n**Impact**: 60% faster reconciliation, 90% fewer errors!\n\nAlso: ${portfolioData.experience.length - 1} more experience${portfolioData.experience.length > 2 ? 's' : ''}`;
  }
  
  // Availability
  if (text.match(/(available|hire|work|opportunity|intern|job|freelance)/)) {
    return `Yes! Het is **actively seeking opportunities**! 🎯\n\n**Looking for**: ${portfolioData.availability.types.join(', ')}\n**Preferred roles**: ${portfolioData.availability.preferred_roles.join(', ')}\n**Work mode**: ${portfolioData.availability.work_mode}\n**Availability**: ${portfolioData.availability.notice_period}\n\nInterested in backend expertise? Use the contact form! 📧`;
  }
  
  // About/Bio
  if (text.match(/(about|bio|background|summary)/)) {
    return `${portfolioData.personal.bio}\n\n**Achievements**:\n${portfolioData.achievements.slice(0, 5).join('\n')}\n\n**Currently learning**: ${portfolioData.skills.currently_learning.slice(0, 3).join(', ')}\n\nWhat else would you like to know?`;
  }
  
  // Contact
  if (text.match(/(contact|email|reach|phone|message)/)) {
    return `Reach Het here! 📬\n\n**Email**: ${portfolioData.personal.email}\n**Phone**: ${portfolioData.personal.phone}\n**GitHub**: ${portfolioData.personal.github}\n**LinkedIn**: ${portfolioData.personal.linkedin}\n\nOr use the contact form below!`;
  }
  
  // Achievements
  if (text.match(/(achievement|award|hackathon|competition|win)/)) {
    return `Het's achievements! 🏆\n\n${portfolioData.achievements.join('\n')}\n\nActive in hackathons and building production-ready systems!`;
  }
  
  // Performance/Metrics
  if (text.match(/(performance|fast|speed|latency|optimiz)/)) {
    return `Het builds **high-performance backends**! ⚡\n\n**SIH Backend Metrics**:\n• ~120ms median API latency\n• p95 latency under 220ms\n• 95% test coverage\n• Optimized PostgreSQL queries\n\nAll with proper indexing, caching, and query optimization!`;
  }
  
  // GitHub
  if (text.match(/(github|repo|code|source)/)) {
    return `Check out Het's GitHub! 💻\n\n**Profile**: ${portfolioData.personal.github}\n\n**Key Repositories**:\n${portfolioData.projects.filter(p => p.github).slice(0, 3).map(p => `• ${p.name}: ${p.github}`).join('\n')}\n\n14 followers • Active contributor`;
  }
  
  // Default
  return `Great question! 🤔 I can help with:\n\n• Het's **projects** (SIH, NASA Space Apps)\n• His **backend skills** (FastAPI, PostgreSQL)\n• **Education** & achievements\n• **Work availability** & roles\n• How to **contact** him\n\nWhat interests you?`;
}

// ========== POST HANDLER ==========
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests 🕐' }, { status: 429 });
    }
    
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    
    const lastMessage = messages[messages.length - 1];
    const response = generateResponse(lastMessage.content);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ message: response });
    
  } catch (error) {
    console.error('Chat Error:', error);
    return NextResponse.json({ error: 'Something went wrong 🔧' }, { status: 500 });
  }
}

