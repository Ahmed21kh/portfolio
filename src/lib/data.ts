export const personalInfo = {
  name: "Ahmed Khaled",
  title: "Senior Frontend Developer",
  subtitle: "Angular & React",
  location: "Cairo, Egypt",
  phone1: "+201020696230",
  phone2: "+201145626326",
  email: "ah20192344@gmail.com", // replace with real email
  linkedin: "https://www.linkedin.com/in/ahmed-khaled-018ba3233/", // replace
  github: "https://github.com/Ahmed21kh", // replace
  summary:
    "Senior Frontend Developer with 4 years of experience building scalable ERP dashboards and e-commerce web applications using Angular and React. Strong expertise in frontend architecture, state management, and performance optimization. Experienced in delivering production-ready solutions for high-usage internal systems and remote teams.",
};

export const skills = [
  {
    category: "Frontend Frameworks",
    icon: "🧩",
    items: ["Angular", "React.js", "Next.js", "Vue.js"],
  },
  {
    category: "State Management",
    icon: "⚙️",
    items: ["NgRx", "Redux Toolkit"],
  },
  {
    category: "UI Libraries",
    icon: "🎨",
    items: ["Angular Material", "Ng-Zorro", "Ant Design", "MUI", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Languages",
    icon: "💻",
    items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Sass", "Python"],
  },
  {
    category: "Backend & Databases",
    icon: "🗄️",
    items: ["Node.js", "Express.js", "MongoDB", "MySQL", ".Net Core", "SQL Server", "Firebase"],
  },
  {
    category: "Tools & DevOps",
    icon: "🛠️",
    items: ["Git", "GitHub", "GitHub Actions", "WebSocket"],
  },
];

export const experiences = [
  {
    title: "Senior Frontend Developer — Angular",
    company: "MAIDS.CC",
    type: "Remote",
    period: "Jun 2024 – Jan 2026",
    current: true,
    points: [
      "Enhanced scalable ERP dashboards using Angular for complex internal business operations.",
      "Optimized frontend architecture through component refactoring and efficient state management.",
      "Implemented complex business logic, reusable components, and reactive forms.",
      "Integrated RESTful APIs and real-time data handling for dynamic application behavior.",
      "Collaborated with cross-functional remote teams to deliver maintainable, high-performance solutions.",
    ],
  },
  {
    title: "Frontend Developer — React & Angular",
    company: "MEGA DEV",
    type: "On-site",
    period: "Oct 2022 – Jun 2024",
    current: false,
    points: [
      "Built responsive web applications and dashboards using React and Angular across multiple industries.",
      "Designed and maintained scalable frontend architecture with reusable UI components.",
      "Managed complex application state using Redux Toolkit and NgRx.",
      "Integrated RESTful APIs and real-time data handling.",
      "Ensured cross-browser compatibility and consistent user experience.",
    ],
  },
];

export const projects = [
  {
    name: "Chatcc — ERP Dashboard",
    tech: ["Angular", "RxJS", "RESTful APIs"],
    period: "Jun 2024 – Jan 2026",
    description:
      "Developed scalable, high-performance Angular modules for an ERP dashboard. Integrated complex business logic and RESTful APIs with real-time updates. Collaborated with cross-functional teams to enhance usability and operational efficiency.",
    link: "https://erp.maids.cc/chatcc",
    category: "ERP",
  },
  {
    name: "Mqraaty Dashboard",
    tech: ["Angular", "CRUD", "Progress Tracking"],
    period: "Jan 2024 – May 2024",
    description:
      "Management system for educational tracks with full CRUD operations and progress tracking.",
    link: "https://maqraaty.vercel.app/",
    category: "Education",
  },
  {
    name: "Rabeh Driver Management",
    tech: ["React.js", "Redux", "Dashboard"],
    period: "Oct 2023 – Dec 2023",
    description:
      "Built a specialized dashboard for managing driver logistics and schedules using React.",
    link: "#",
    category: "Logistics",
  },
  {
    name: "Beirutmart E-commerce",
    tech: ["React.js", "Redux Toolkit", "Cart System"],
    period: "Apr 2023 – Jun 2023",
    description:
      "Fully functional shopping and delivery website with state-managed cart and checkout systems.",
    link: "https://beirutmart.com/",
    category: "E-commerce",
  },
  {
    name: "Laporex — Medication Orders",
    tech: ["React.js", "RESTful APIs", "Real-time"],
    period: "Jan 2023 – Mar 2023",
    description:
      "High-performance React app for managing medication orders with real-time updates. Integrated RESTful APIs to streamline order workflows. Built responsive, dynamic interfaces with optimized forms, tables, and notifications.",
    link: "https://laporex.vercel.app/",
    category: "Healthcare",
  },
  {
    name: "Doctor Book Web App",
    tech: ["Angular", "RxJS", "Reactive Forms"],
    period: "Oct 2022 – Dec 2022",
    description:
      "Built responsive Angular web app and admin dashboard. Implemented appointment booking, rescheduling, and cancellation workflows. Developed role-based dashboards with route guards and permissions.",
    link: "#",
    category: "Healthcare",
  },
  {
    name: "El Hamd Agricultural Crops",
    tech: ["React.js", "Corporate Website", "Product Catalog"],
    period: "Jul 2023 – Sep 2023",
    description:
      "Developed a full corporate website and product catalog for the agricultural sector. Features a modern landing page, product showcase, and responsive design built with React.js.",
    link: "https://el-hamd-front.vercel.app/home",
    category: "ERP",
  },
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  university: "Tanta University",
  graduation: "2022",
};

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Intermediate" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
