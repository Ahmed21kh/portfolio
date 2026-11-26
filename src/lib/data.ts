export const personalInfo = {
  name: "Ahmed Khaled",
  title: "Senior Frontend Developer",
  subtitle: "Angular, React & Next.js",
  location: "Cairo, Egypt",
  phone1: "+201020696230",
  phone2: "+201223269063",
  email: "ah20192344@gmail.com", // replace with real email
  linkedin: "https://www.linkedin.com/in/ahmed-khaled-018ba3233/", // replace
  github: "https://github.com/Ahmed21kh", // replace
  summary:
    "Senior Frontend Developer with +4 years of experience building scalable ERP dashboards and e-commerce web applications using Angular and React. Strong expertise in frontend architecture, state management, and performance optimization. Experienced in delivering production-ready solutions for high-usage internal systems and remote teams.",
};

export const skills = [
  {
    category: "Frontend & Mobile",
    icon: "🧩",
    items: [
      "Angular (14+)",
      "React.js",
      "Next.js",
      "Ionic Framework",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3 / Sass",
      "Vue.js",
    ],
  },
  {
    category: "State Management",
    icon: "⚙️",
    items: [
      "NgRx (Store & Effects)",
      "Redux Toolkit",
      "RxJS (Reactive Programming)",
      "Angular Signals",
      "Zustand",
      "Context API",
    ],
  },
  {
    category: "Architecture & Performance",
    icon: "🏗️",
    items: [
      "Scalable Frontend Architecture",
      "Micro-frontends (Module Federation)",
      "Design Systems & Reusable Components",
      "Core Web Vitals & Web Performance",
      "Code Splitting & Lazy Loading",
      "SSR / SSG Hydration",
    ],
  },
  {
    category: "UI & Styling",
    icon: "🎨",
    items: [
      "Tailwind CSS",
      "Angular Material",
      "NG-ZORRO",
      "Ant Design",
      "MUI (Material UI)",
      "Bootstrap",
      "RTL-First Design",
      "Web Accessibility (WCAG / a11y)",
    ],
  },
  {
    category: "Testing & Code Quality",
    icon: "🧪",
    items: [
      "Unit Testing",
      "Jest",
      "Cypress",
      "Frontend Security (JWT, OAuth, XSS/CSRF)",
      "Code Reviews & Standards",
      "Cross-Browser Compatibility",
    ],
  },
  {
    category: "DevOps & CI/CD",
    icon: "🛠️",
    items: [
      "CI/CD Pipelines",
      "GitHub Actions",
      "Git & Git Flow",
      "Vercel Deployment",
      "Docker Basics",
      "Vite & Webpack",
    ],
  },
  {
    category: "Backend & APIs",
    icon: "🔌",
    items: [
      "RESTful APIs Integration",
      "WebSocket (Real-time updates)",
      "HTTP Interceptors",
      "Node.js",
      "Express.js",
    ],
  },
  {
    category: "Databases & Cloud",
    icon: "🗄️",
    items: ["MongoDB", "MySQL", "SQL Server", "Firebase"],
  },
  {
    category: "Methodology & Agile",
    icon: "🚀",
    items: [
      "Agile & Scrum Methodologies",
      "Sprint Planning & Jira",
      "Cross-functional Remote Teams",
      "Technical Mentorship",
      "Performance Auditing (Lighthouse)",
    ],
  },
];

export const experiences = [
  {
    title: "Senior Frontend Developer — Angular",
    company: "ALASI Real Estate",
    type: "Hybrid",
    period: "Jan 2026 – Present",
    current: true,
    points: [
      "Building a multi-tenant SaaS platform for recruitment & labor-leasing offices in Saudi Arabia (Arabic RTL / English).",
      "Back-office with role-based access, a configurable workflow engine, real-time notifications and dashboards — plus a branded website per office (CMS, 7 templates) and an external agents portal.",
      "50+ feature modules across recruitment, labor leasing, worker housing, logistics, finance and HR.",
    ],
  },
  {
    title: "Senior Frontend Developer — Angular",
    company: "MAIDS.CC",
    type: "Remote",
    period: "Jun 2024 – Jan 2026",
    current: false,
    points: [
      "Enhanced scalable ERP dashboards and optimized architecture, state management, reusable components, and reactive forms.",
      "Integrated RESTful APIs and real-time data while collaborating with remote teams to deliver maintainable, high-performance applications.",
    ],
  },
  {
    title: "Frontend Developer — React, Angular & Node.js",
    company: "MEGA DEV",
    type: "",
    period: "Oct 2022 – Jun 2024",
    current: false,
    points: [
      "Built responsive React and Angular web applications and dashboards with scalable, reusable frontend architecture.",
      "Integrated RESTful APIs and real-time data, ensuring cross-browser compatibility and a consistent user experience.",
    ],
  },
];

export interface Project {
  id: string;
  name: string;
  tech: string[];
  period: string;
  description: string;
  link: string;
  /** Extra live URLs (e.g. frontend + admin dashboard). First entry is the default view. */
  links?: { label: string; url: string }[];
  category: string;
  featured?: boolean;
  hasLiveDemo?: boolean;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "shatib-finishes",
    name: "Shatib (شطب) — Invoicing & Accounting",
    tech: ["React.js", "Tailwind CSS", "Accounting", "RTL", "Vite"],
    period: "2024",
    description:
      "Comprehensive financial accounting and invoicing web application tailored for contractor management, expense tracking, invoices, and client billing with an RTL interface.",
    link: "https://finishes-app.vercel.app/",
    category: "ERP",
    featured: true,
    hasLiveDemo: true,
    highlights: ["Invoicing & ledger calculations", "Interactive financial dashboard", "Full RTL & mobile-responsive design"],
  },
  {
    id: "pdf-to-word",
    name: "Arabic PDF to Word Converter",
    tech: ["React.js", "TypeScript", "PDF Processing", "Document Parser", "Tailwind"],
    period: "2024",
    description:
      "Specialized document conversion platform converting complex Arabic PDFs to Word (.docx) with Quranic verse verification, zero letter-reversal, and support for 600+ pages.",
    link: "https://pdf-to-word-converter-tool.vercel.app/",
    category: "Tools",
    featured: true,
    hasLiveDemo: true,
    highlights: ["High-precision Arabic OCR & parsing", "Layout, table & image preservation", "Multi-page large document engine"],
  },
  {
    id: "chatcc-erp",
    name: "Chatcc — ERP Dashboard",
    tech: ["Angular", "RxJS", "RESTful APIs", "WebSocket"],
    period: "Jun 2024 – Jan 2026",
    description:
      "Enterprise-grade, high-performance Angular modules for an ERP dashboard. Integrated complex business logic, reactive state, and RESTful APIs with real-time updates.",
    link: "https://erp.maids.cc/chatcc",
    category: "ERP",
    featured: true,
    hasLiveDemo: true,
    highlights: ["Real-time synchronization", "Enterprise RBAC architecture", "High-throughput tables"],
  },
  {
    id: "maqraaty",
    name: "Mqraaty Dashboard",
    tech: ["Angular", "CRUD", "Progress Tracking", "Tailwind CSS"],
    period: "Jan 2024 – May 2024",
    description:
      "Interactive management platform for educational tracks with full CRUD operations, student progress analytics, and responsive student/mentor dashboards.",
    link: "https://maqraaty.vercel.app/",
    category: "Education",
    featured: true,
    hasLiveDemo: true,
    highlights: ["Full CRUD workflows", "Progress analytics charts", "Mobile-optimized responsive UI"],
  },
  {
    id: "beirutmart",
    name: "Beirutmart E-commerce",
    tech: ["React.js", "Redux Toolkit", "Cart System", "Tailwind"],
    period: "Apr 2023 – Jun 2023",
    description:
      "Fully functional shopping and delivery web application with persistent state-managed cart, checkout systems, order tracking, and product search.",
    link: "https://beirutmart.com/",
    category: "E-commerce",
    featured: true,
    hasLiveDemo: true,
    highlights: ["Redux Toolkit state store", "Instant filter & search", "Seamless checkout flow"],
  },
  {
    id: "laporex",
    name: "Laporex — Medication Orders",
    tech: ["React.js", "RESTful APIs", "Real-time", "Vite"],
    period: "Jan 2023 – Mar 2023",
    description:
      "High-performance React application for managing pharmaceutical and medication orders with instant status updates and optimized reactive forms.",
    link: "https://laporex.vercel.app/",
    category: "Healthcare",
    featured: true,
    hasLiveDemo: true,
    highlights: ["Real-time order statuses", "Dynamic reactive forms", "High-volume data tables"],
  },
  {
    id: "el-hamd",
    name: "El Hamd Agricultural Crops",
    tech: ["React.js", "Corporate Showcase", "Product Catalog"],
    period: "Jul 2023 – Sep 2023",
    description:
      "Full corporate website and bilingual product catalog for the agricultural sector. Features modern landing animations, product showcases, and fast response times.",
    link: "https://el-hamd-front.vercel.app/home",
    category: "ERP",
    featured: false,
    hasLiveDemo: true,
    highlights: ["Interactive product catalog", "Responsive modern design", "Optimized image delivery"],
  },
  {
    id: "rabeh-driver",
    name: "Rabeh Driver Management",
    tech: ["React.js", "Redux", "Logistics Dashboard"],
    period: "Oct 2023 – Dec 2023",
    description:
      "Specialized internal enterprise dashboard for managing driver logistics, schedules, routing, and fleet analytics using React and Redux.",
    link: "#",
    category: "Logistics",
    featured: false,
    hasLiveDemo: false,
    highlights: ["Fleet scheduling engine", "Internal driver tracking", "Enterprise dashboard UI"],
  },
  {
    id: "doctor-book",
    name: "Doctor Book Web App",
    tech: ["Angular", "RxJS", "Reactive Forms", "Guards"],
    period: "Oct 2022 – Dec 2022",
    description:
      "Responsive Angular medical appointment platform with a patient-facing app and an admin dashboard. Implemented appointment scheduling, patient histories, cancellation workflows, and role-based route guards.",
    link: "https://docbook-user.vercel.app/",
    links: [
      { label: "Frontend", url: "https://docbook-user.vercel.app/" },
      { label: "Dashboard", url: "https://dockbook-dashboard.vercel.app/" },
    ],
    category: "Healthcare",
    featured: false,
    hasLiveDemo: true,
    highlights: ["Appointment calendar engine", "Route guards & security", "Reactive patient records"],
  },
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  university: "Tanta University",
  graduation: "2022",
};

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Advanced" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
