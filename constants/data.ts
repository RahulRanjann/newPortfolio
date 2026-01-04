// ============================================
// PORTFOLIO DATA CONSTANTS
// ============================================

import { 
  Github, 
  Linkedin, 
  Instagram, 
  GraduationCap, 
  BookOpen, 
  Code,
  LucideIcon 
} from "lucide-react"

// ============ TYPES ============
export interface Experience {
  title: string
  company: string
  period: string
  location: string
  status?: string
  description: string[]
  skills: string[]
  isActive?: boolean
}

export interface Project {
  id: string | number
  title: string
  description: string
  image: string
  tags: string[]
  status?: string
  category: "all" | "full-stack" | "automation" | "ui-ux"
  links?: {
    source?: string
    demo?: string
  }
}

export interface Skill {
  name: string
  percentage: number
}

export interface SkillCategory {
  title: string
  status: string
  skills: Skill[]
  icon?: string
}

export interface Education {
  icon: LucideIcon
  title: string
  institution: string
  period: string
  details: string
  tags: string[]
}

export interface SocialLink {
  icon: LucideIcon
  title: string
  desc: string
  link: string
}

export interface Stats {
  experience: {
    years: number
    label: string
  }
  projects: {
    count: string
    label: string
  }
  contributions: {
    default: string
    label: string
  }
  skillMatrix: {
    name: string
    percent: number
  }[]
}

// ============ IMAGE URLS ============
export const IMAGES = {
  profile: "/developer-profile-photo-cyber-aesthetic.jpg",
  projects: {
    cybersecurity: "/cybersecurity-scan-interface.jpg",
    crypto: "/crypto-dashboard.jpg",
    messaging: "/secure-messaging-app.jpg",
    ai: "/ai-sentiment-analysis.jpg",
    portfolio: "/minimalist-portfolio-design.jpg",
    management: "/project-management-interface.jpg",
  },
  placeholder: "/placeholder.svg",
} as const

// ============ EXPERIENCE DATA ============
export const EXPERIENCES: Experience[] = [
  {
    title: "SDE",
    company: "Lets Transport",
    period: "[2025.05 :: PRESENT]",
    location: "Bangalore",
    status: "ACTIVE_PROCESS",
    description: [
      "Built ad-optimization automations using Google Ads API.",
      "Created scraping pipelines and upload workflows.",
      "Improved digital ad revenue through automation.",
    ],
    skills: ["React", "Node.js", "Google Ads API", "Automation"],
    isActive: true,
  },
  {
    title: "QA Engineer",
    company: "Zinc",
    period: "[2025.01 :: 2025.05]",
    location: "Bangalore",
    description: [
      "Automated testing for ADA platform.",
      "Created AI 'talk to ADA' parent interface.",
      "Focused on quality assurance and automation testing.",
    ],
    skills: ["Testing", "Automation", "QA"],
    isActive: true,
  },
  {
    title: "Full Stack Developer",
    company: "Lets Transport",
    period: "[2024.05 :: 2024.08]",
    location: "Bangalore",
    description: [
      "Built website that boosted traffic by 40% and profit by 7%.",
      "Automated scraping and upload workflows.",
      "Implemented responsive design and performance optimization.",
    ],
    skills: ["React", "Next.js", "MongoDB", "Node.js"],
  },
  {
    title: "Full Stack Developer",
    company: "Pine&Lime",
    period: "[2024.03 :: 2024.05]",
    location: "Gurgaon",
    description: [
      "Delivered full-featured e-commerce application.",
      "Implemented authentication and product management systems.",
      "Built responsive UI with Tailwind CSS.",
    ],
    skills: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
  },
  {
    title: "Full Stack Developer",
    company: "GoMilestone",
    period: "[2023.12 :: 2024.01]",
    location: "Gurgaon",
    description: [
      "Developed responsive, scalable company website.",
      "Used HTML, CSS, JavaScript and Bootstrap 5.",
      "Optimized for cross-browser compatibility.",
    ],
    skills: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
  },
]

// ============ PROJECTS DATA ============
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "GitHub Profile Finder",
    description:
      "React app using GitHub API to surface profiles with bio, repos, and followers. Features dynamic fetching with clean, intuitive UI for discovering developers.",
    image: IMAGES.projects.cybersecurity,
    tags: ["React", "GitHub API", "JavaScript"],
    category: "full-stack",
    links: {
      source: "https://github.com/rahulranjann",
      demo: "#",
    },
  },
  {
    id: 2,
    title: "Go Milestone",
    description:
      "Official company site with Google Maps integration and phone country codes. Hosted on GitHub Pages with responsive design and optimization.",
    image: IMAGES.projects.crypto,
    tags: ["HTML5", "CSS3", "JavaScript", "Maps API"],
    category: "ui-ux",
    links: {
      source: "https://github.com/rahulranjann",
      demo: "#",
    },
  },
  {
    id: 3,
    title: "TourTravel",
    description:
      "Travel booking site with authentication and ticketing via Firebase. Real-time chat support integrated with Tawk.to for customer assistance.",
    image: IMAGES.projects.messaging,
    tags: ["React", "Firebase", "Tawk.to"],
    category: "full-stack",
    links: {
      source: "https://github.com/rahulranjann",
      demo: "#",
    },
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce application with product management, authentication, and shopping cart. Built with modern React and Firebase.",
    image: IMAGES.projects.ai,
    tags: ["React", "Firebase", "Tailwind CSS"],
    category: "full-stack",
    links: {
      source: "https://github.com/rahulranjann",
      demo: "#",
    },
  },
  {
    id: 5,
    title: "Digital Ads Automation",
    description:
      "Automation system for Google Ads optimization using Google Ads API. Improved digital ad revenue through intelligent workflow automation.",
    image: IMAGES.projects.portfolio,
    tags: ["Node.js", "Google Ads API", "Python"],
    category: "automation",
    links: {
      source: "https://github.com/rahulranjann",
      demo: "#",
    },
  },
  {
    id: 6,
    title: "Web Scraping Pipeline",
    description:
      "Automated scraping and data upload workflows for Lets Transport. Streamlined data processing with efficient pipeline architecture.",
    image: IMAGES.projects.management,
    tags: ["Python", "Web Scraping", "Automation"],
    category: "automation",
    links: {
      source: "https://github.com/rahulranjann",
      demo: "#",
    },
  },
]

// ============ PROJECT FILTERS ============
export const PROJECT_FILTERS = [
  { id: "all", label: "ALL" },
  { id: "full-stack", label: "FULL_STACK" },
  { id: "automation", label: "AUTOMATION" },
  { id: "ui-ux", label: "UI/UX" },
] as const

// ============ SKILLS DATA ============
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "FRONTEND_MODULE",
    status: "OPTIMIZED",
    skills: [
      { name: "React", percentage: 95 },
      { name: "Next.js", percentage: 90 },
      { name: "TypeScript", percentage: 92 },
      { name: "Tailwind CSS", percentage: 95 },
    ],
  },
  {
    title: "BACKEND_SYSTEMS",
    status: "OPERATIONAL",
    skills: [
      { name: "Node.js / Express", percentage: 85 },
      { name: "Python / Django", percentage: 75 },
      { name: "Firebase", percentage: 85 },
      { name: "REST APIs", percentage: 90 },
    ],
  },
  {
    title: "DATA_PERSISTENCE",
    status: "CONNECTED",
    skills: [
      { name: "MongoDB", percentage: 85 },
      { name: "PostgreSQL", percentage: 80 },
      { name: "MySQL", percentage: 75 },
      { name: "Firebase DB", percentage: 85 },
    ],
    icon: "circular",
  },
  {
    title: "DEVOPS_PROTOCOL",
    status: "DEPLOYING",
    skills: [
      { name: "AWS", percentage: 80 },
      { name: "Docker", percentage: 75 },
      { name: "Vercel", percentage: 90 },
      { name: "Nginx", percentage: 70 },
    ],
  },
  {
    title: "LANGUAGES",
    status: "READY",
    skills: [
      { name: "JavaScript", percentage: 95 },
      { name: "TypeScript", percentage: 92 },
      { name: "Python", percentage: 80 },
      { name: "Java", percentage: 75 },
      { name: "Dart", percentage: 70 },
      { name: "Bash", percentage: 80 },
    ],
  },
]

// ============ ABOUT PAGE SKILLS ============
export const ABOUT_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Firebase",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Tailwind CSS",
] as const

// ============ EDUCATION DATA ============
export const EDUCATION_ITEMS: Education[] = [
  {
    icon: GraduationCap,
    title: "B.Tech. in Computer Science",
    institution: "Manipal Institute of Technology, Manipal",
    period: "2022 - 2025",
    details: `First Class. Focus on Full Stack Development and Machine Learning. Studying advanced algorithms, web technologies, and distributed systems.`,
    tags: ["Full Stack Development", "ML", "Web Technologies"],
  },
  {
    icon: BookOpen,
    title: "Diploma in ITEMS",
    institution: "Rajokari Institute of Technology, Delhi",
    period: "2019 - 2022",
    details:
      "Strong foundation in mathematics and computer science. Prepared for advanced technical studies with focus on programming fundamentals.",
    tags: ["Programming", "Math", "CS Fundamentals"],
  },
  {
    icon: Code,
    title: "Full Stack Development",
    institution: "Self-Taught & Industry Experience",
    period: "2023 - Present",
    details:
      "Continuous learning through real-world projects, open-source contributions, and hands-on experience with modern web technologies.",
    tags: ["React", "Node.js", "Cloud Technologies"],
  },
]

// ============ EDUCATION STATS ============
export const EDUCATION_STATS = [
  { label: "Degrees", value: "1", suffix: "" },
  { label: "Years Learning", value: "5", suffix: "+" },
  { label: "Certifications", value: "10", suffix: "+" },
  { label: "Skills Acquired", value: "20", suffix: "+" },
] as const

// ============ SOCIAL LINKS ============
export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Github,
    title: "GitHub",
    desc: "github.com/rahulranjann",
    link: "https://github.com/rahulranjann",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    desc: "in/rahulranjann",
    link: "https://www.linkedin.com/in/rahul-ranjan-591321277/",
  },
  {
    icon: Instagram,
    title: "Instagram",
    desc: "@rahulranjann",
    link: "https://www.instagram.com/rahulranjan257/",
  },
]

// ============ ABOUT PAGE DATA ============
export const ABOUT_DATA = {
  profileImage: IMAGES.profile,
  systemInfo: "< System.Rahul > v1.0.0",
  stats: {
    experience: {
      value: "5+",
      label: "Years Exp",
    },
    projects: {
      value: "42",
      label: "Projects",
    },
  },
  bio: {
    title: "Full Stack Developer & Product Builder",
    paragraphs: [
      "Full Stack Developer focused on user-centered, impactful products. Blending tech and design to solve real problems. Born in 2000 in India with a mission-driven approach to using code and tech for positive change and innovation.",
      "Currently building scalable web apps, automating digital workflows, and exploring AI-driven tooling. Passionate about product design, automation, and continuous learning. My favorite quote: \"There is nothing so useless as doing efficiently that which should not be done at all.\" — Peter Drucker.",
    ],
  },
  cta: {
    downloadCV: {
      text: "Download_CV.exe",
      href: "/contact",
    },
    viewSource: {
      text: "View_Source",
      href: "/projects",
    },
  },
} as const

// ============ HOME PAGE DATA ============
export const HOME_DATA = {
  name: "Hi, I'm Rahul",
  role: "> Full Stack Developer | Problem Solver_",
  description:
    "Blending tech and design to solve real problems. Building scalable web apps, automating workflows, and driving digital innovation. Let's turn lines of code into impactful solutions.",
  typingSpeed: {
    name: 50,
    role: 50,
    description: 30,
  },
  typingDelay: {
    name: 0,
    role: 1000,
    description: 2000,
  },
} as const

// ============ STATS DATA (Experience Sidebar) ============
export const STATS: Stats = {
  experience: {
    years: 2,
    label: "years",
  },
  projects: {
    count: "7+",
    label: "deployed",
  },
  contributions: {
    default: "20+",
    label: "approx",
  },
  skillMatrix: [
    { name: "TypeScript / React", percent: 98 },
    { name: "Python / Django", percent: 85 },
    { name: "System Architecture", percent: 90 },
  ],
}

// ============ PAGE HEADINGS ============
export const PAGE_HEADINGS = {
  home: {
    prefix: "",
    title: "",
  },
  about: {
    prefix: "< System.Rahul > v1.0.0",
    title: "Dev_Access // Granted",
  },
  projects: {
    prefix: "• SYSTEM_MODULES",
    title: "SELECTED_WORKS_",
  },
  skills: {
    prefix: "• SYSTEM_LOG",
    title: "SYSTEM_CAPABILITIES // SKILLS",
  },
  experience: {
    prefix: "> SYSTEM_EXECUTION",
    title: "run experience.exe _",
  },
  education: {
    prefix: "",
    title: "//EDUCATION",
  },
  contact: {
    prefix: "",
    title: "ESTABLISH_CONNECTION_",
  },
} as const

// ============ GITHUB USERNAME ============
export const GITHUB_USERNAME = "rahulranjann" as const

