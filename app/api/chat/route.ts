// ============================================
// MOCK AI CHAT API (NO OPENAI NEEDED - FREE!)
// ============================================
// This is a local AI that uses pattern matching
// to answer questions about your portfolio
//
// BENEFITS:
// ✅ Completely FREE (no API costs)
// ✅ Instant responses (no latency)
// ✅ No quota limits
// ✅ Privacy-friendly (no external API calls)
// ✅ Works offline
// ✅ 100% reliable
//
// HOW IT WORKS:
// 1. User sends message
// 2. generateResponse() uses pattern matching (regex)
// 3. Matches keywords to response templates
// 4. Inserts your actual portfolio data
// 5. Returns personalized response
// ============================================

import { catalogue } from '@react-three/fiber/dist/declarations/src/core/renderer';
import { NextRequest, NextResponse } from 'next/server';

// ========== HET PATEL'S ACTUAL PORTFOLIO DATA ==========
// All information pulled from your resume, GitHub, and LinkedIn
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
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
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
    {
    name: "OM Marketing - Digital Catalog",
    fullName: "OM Marketing Business Website & Catalog",
    description: "ISO 9001:2008 certified weighing scale and note counting machine business. Built digital catalog and inventory management system for B2B and retail customers.",
    role: "Owner & Full-Stack Developer",
    tech: ["WhatsApp Business", "Digital Catalog", "Inventory Management", "CRM"],
    features: [
      "WhatsApp digital catalog for product showcase",
      "Inventory tracking system",
      "Customer relationship management",
      "Order processing automation",
      "Reduced reconciliation time by 60%",
      "90% reduction in order errors"
    ],
    status: "Active",
    year: "2022-Present",
    type: "Business Project",
    website: "https://wa.me/c/919825247312",
    products: [
      "Precision Weighing Scales",
      "Platform Scales", 
      "Note Counting Machines",
      "Analytical Balances",
      "Industrial Scales"
    ],
    location: "Naroda, Ahmedabad, Gujarat",
    contact: {
      phone: "98252 47312",
      email: "ommarketing.weighingscale1@gmail.com",
      instagram: "@ommarketing_scales"
    }
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
       catalogue: "https://wa.me/c/919825247312",
       products: ["Weighing Scales", "Note Counting Machines", "Platform Scales", "Analytical Balances"],
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

// ========== SIMPLE RATE LIMITING ==========
// Prevents abuse by limiting requests per IP address
const requestCounts = new Map<string, number[]>();
const RATE_LIMIT = 20; // Max 20 requests per hour
const RATE_WINDOW = 3600000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  const recentRequests = userRequests.filter((timestamp: number) => now - timestamp < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) return false;
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  return true;
}

// ========== MOCK AI RESPONSE GENERATOR ==========
// Pattern matching to generate intelligent responses
function generateResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  // ========== GREETING PATTERNS ==========
  if (msg.match(/^(hi|hello|hey|greetings|yo|sup)/)) {
    return `Hey there! 👋 I'm Het Patel's AI assistant. I can tell you about his backend development skills, projects at SIH and NASA Space Apps, or his experience with FastAPI and PostgreSQL. What would you like to know?`;
  }
  
  // ========== PROJECTS QUESTIONS ==========
  if (msg.match(/(project|work|built|created|portfolio)/)) {
    // SIH specific
    if (msg.match(/sih|smart.*india|smartwork/i)) {
      const p = portfolioData.projects[0];
      return `${p.name} - ${p.description}\n\nPerformance:\n${p.metrics?.map(m => `• ${m}`).join('\n')}\n\nTech: ${p.tech.join(', ')}\n\nFeatures:\n${p.features?.slice(0, 4).map(f => `• ${f}`).join('\n')}\n\nGitHub: ${p.github}`;
    }
    
    // NASA specific
    if (msg.match(/nasa|space|weather/i)) {
      const p = portfolioData.projects[1];
      return `${p.fullName} 🚀\n\n${p.description}\n\nTech: ${p.tech.join(', ')}\n\nKey Features:\n${p.features?.slice(0, 4).map(f => `• ${f}`).join('\n')}\n\nGitHub: ${p.github}`;
    }
    
    // Best project
    if (msg.match(/best|favorite|top|main|flagship/)) {
      const bestProject = portfolioData.projects[0];
      return `Het's flagship project is ${bestProject.name}! 🚀\n\n${bestProject.description}\n\nTech Stack: ${bestProject.tech.join(', ')}\n\nKey Metrics:\n${bestProject.metrics?.map(m => `• ${m}`).join('\n')}\n\nWant to know about other projects?`;
    }
    
    // General projects list
    const projectList = portfolioData.projects.slice(0, 3).map(p => 
      `• ${p.name}: ${p.description.substring(0, 80)}...`
    ).join('\n');
    return `Het has built impressive backend projects:\n\n${projectList}\n\nWhich one interests you? (Try asking about "SIH" or "NASA")`;
  }
  
  // ========== SKILLS QUESTIONS ==========
  if (msg.match(/(skill|tech|technology|stack|know|language)/)) {
    // Backend specific
    if (msg.match(/backend|server|api|python|fastapi|rest/)) {
      return `Het specializes in backend development! 💻\n\nBackend Expertise:\n${portfolioData.skills.backend.slice(0, 5).map(s => `• ${s}`).join('\n')}\n\nDatabases: ${portfolioData.skills.databases.slice(0, 3).join(', ')}\n\nPerformance: Optimized APIs to ~120ms median latency with 95% test coverage!`;
    }
    
    // Frontend specific
    if (msg.match(/frontend|react|next|ui|design/)) {
      return `Het is proficient in modern frontend development! ⚛️\n\nFrontend Stack:\n${portfolioData.skills.frontend.map(s => `• ${s}`).join('\n')}\n\nHe builds responsive, animated UIs with glassmorphism effects!`;
    }
    
    // Database specific
    if (msg.match(/database|postgres|sql/i)) {
      return `Het is strong with PostgreSQL! 🗄️\n\nDatabase Skills:\n${portfolioData.skills.databases.map(d => `• ${d}`).join('\n')}\n\nHe optimizes queries, designs schemas, and manages migrations with Alembic.`;
    }
    
    // General skills
    return `Het is a full-stack developer with backend focus:\n\nLanguages: ${portfolioData.skills.languages.join(', ')}\nFrameworks: ${portfolioData.skills.frameworks.slice(0, 4).join(', ')}\nDatabases: ${portfolioData.skills.databases.slice(0, 3).join(', ')}\nTools: ${portfolioData.skills.tools.slice(0, 4).join(', ')}\n\nWhat area interests you most?`;
  }
  
  // ========== EDUCATION QUESTIONS ==========
  if (msg.match(/(education|university|college|degree|student|studying|cgpa|gpa)/)) {
    const edu = portfolioData.education[0];
    return `Het is studying at ${edu.institution}! 🎓\n\nDegree: ${edu.degree}\nCGPA: ${edu.cgpa}\nYear: ${portfolioData.personal.year}\n\nAlso:\n• IELTS: 6.5 Bands\n• Class 12th: 68%\n• Class 10th: 70%\n\nBalancing academics with hackathons and backend projects!`;
  }
  
  // ========== EXPERIENCE QUESTIONS ==========
  if (msg.match(/(experience|background|work|job|intern|om.*market|business)/)) {
    const exp = portfolioData.experience[0];
    return `${exp.company} - ${exp.role}\n\n${exp.responsibilities.slice(0, 4).map(r => `• ${r}`).join('\n')}\n\nImpact: 60% faster reconciliation, 90% fewer errors!\n\nAlso: ${portfolioData.experience.length - 1} more experience${portfolioData.experience.length > 2 ? 's' : ''}`;
  }
  
  // ========== AVAILABILITY QUESTIONS ==========
  if (msg.match(/(available|hire|work|opportunity|intern|job|freelance)/)) {
    return `Yes! Het is actively seeking opportunities! 🎯\n\nLooking for: ${portfolioData.availability.types.join(', ')}\nPreferred roles: ${portfolioData.availability.preferred_roles.join(', ')}\nWork mode: ${portfolioData.availability.work_mode}\nAvailability: ${portfolioData.availability.notice_period}\n\nInterested in backend expertise? Use the contact form! 📧`;
  }
  
  // ========== ABOUT/BIO QUESTIONS ==========
  if (msg.match(/(about|bio|story|background|summary)/)) {
    return `${portfolioData.personal.bio}\n\nHighlights:\n${portfolioData.achievements.slice(0, 5).join('\n')}\n\nCurrently learning: ${portfolioData.skills.currently_learning.slice(0, 3).join(', ')}\n\nWhat else would you like to know?`;
  }
  
  // ========== CONTACT QUESTIONS ==========
  if (msg.match(/(contact|email|reach|phone|message|talk|connect)/)) {
    return `Reach Het here! 📬\n\nEmail: ${portfolioData.personal.email}\nPhone: ${portfolioData.personal.phone} \nGitHub: ${portfolioData.personal.github}LinkedIn: ${portfolioData.personal.linkedin}\n\nOr use the contact form at the bottom of this page!`;
  }
  
  // ========== ACHIEVEMENTS ==========
  if (msg.match(/(achievement|award|hackathon|competition|win)/)) {
    return `Het's achievements! 🏆\n\n${portfolioData.achievements.join('\n')}\n\nActive in hackathons and building production-ready systems!`;
  }
  
  // ========== PERFORMANCE/METRICS ==========
  if (msg.match(/(performance|fast|speed|latency|optimiz)/)) {
    return `Het builds high-performance backends! ⚡\n\nSIH Backend Metrics:\n• ~120ms median API latency\n• p95 latency under 220ms\n• 95% test coverage\n• Optimized PostgreSQL queries\n\nAll with proper indexing, caching, and query optimization!`;
  }
  
  // ========== GITHUB ==========
  if (msg.match(/(github|repo|code|source)/)) {
    return `Check out Het's GitHub! 💻\n\nProfile: ${portfolioData.personal.github}\n\nKey Repositories:\n${portfolioData.projects.filter(p => p.github).slice(0, 3).map(p => `• ${p.name}: ${p.github}`).join('\n')}\n\n14 followers • Active contributor`;
  }
  
  // ========== LEARNING ==========
  if (msg.match(/(learning|study|current|now)/)) {
    return `Het is constantly expanding his skillset! 📚\n\nCurrently learning:\n${portfolioData.skills.currently_learning.map(l => `• ${l}`).join('\n')}\n\nHe believes in continuous learning and staying updated with the latest tech!`;
  }
  
  // ========== INTERESTS ==========
  if (msg.match(/(interest|passion|like|love|enjoy)/)) {
    return `Het is passionate about cutting-edge technology! ✨\n\nInterests:\n${portfolioData.interests.slice(0, 5).map(i => `• ${i}`).join('\n')}\n\nHe loves building products that push the boundaries!`;
  }
  
  // ========== LOCATION ==========
  if (msg.match(/(where|location|from|based)/)) {
    return `Het is based in ${portfolioData.personal.location}! 🇮🇳\n\nCurrently studying at ${portfolioData.personal.university} and open to remote work opportunities worldwide! 🌍`;
  }
  
  // ========== DEFAULT RESPONSE ==========
  return `Great question! 🤔 I can help you learn about:\n\n• Het's projects (SIH, NASA Space Apps)\n• His backend skills (FastAPI, PostgreSQL)\n• Education & achievements\n• Work availability & roles\n• How to contact him\n\nWhat interests you?`;
}

// ========== POST HANDLER ==========
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour. 🕐' },
        { status: 429 }
      );
    }
    
    // Parse request
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    // Get last user message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user' },
        { status: 400 }
      );
    }
    
    // Generate response using local AI
    const response = generateResponse(lastMessage.content);
    
    // Simulate thinking delay (makes it feel more realistic)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ message: response });
    
  } catch (error: any) {
    console.error('Chat Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try the contact form! 🔧' },
      { status: 500 }
    );
  }
}

// ============================================
// ADVANTAGES OVER OPENAI:
// ============================================
// ✅ FREE - No API costs
// ✅ FAST - Instant responses (~500ms delay)
// ✅ RELIABLE - No quota limits
// ✅ CUSTOMIZABLE - Full control over responses
// ✅ PRIVACY - No external API calls
// ✅ PREDICTABLE - Consistent answers
// ✅ OFFLINE - Works without internet
//
// LIMITATIONS:
// - Not as flexible as real AI
// - Can't understand complex questions
// - Requires manual pattern updates
//
// FUTURE ENHANCEMENTS:
// - Add more patterns
// - Implement fuzzy matching
// - Add conversation context
// - Use local LLM (Ollama, llama.cpp)

