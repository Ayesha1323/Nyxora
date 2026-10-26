import { Project, SkillCategory, ExperienceItem, EducationItem, StatItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Ayesha Sahani',
  title: 'Full Stack Developer',
  email: 'ayeshasahani1303@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayesha-sahani-4932b1256/',
  github: 'https://github.com',
  location: 'Chennai, India',
  availability: 'Open for Full-Stack & Engineering Roles',
  tagline: 'Crafting resilient, high-performance web applications with modern architectures and clean user experiences.',
  bio: "Full Stack Developer with hands-on experience building and deploying web applications using React.js, Node.js, Express.js, and PostgreSQL. I build responsive interfaces, integrate REST APIs, design relational databases, and support cloud deployments. I'm also exploring generative AI API integration, TypeScript, and cybersecurity.",
  typingRoles: [
    'Full Stack Developer',
    'React & Node.js Engineer',
    'Cloud Deployment Specialist',
    'Database & API Architect'
  ]
};

export const STATS: StatItem[] = [
  {
    value: 95,
    suffix: '%',
    label: 'Component Reusability',
    description: 'Modular React & UI architecture designed across client production platforms',
    icon: 'Layers'
  },
  {
    value: 40,
    suffix: '%',
    label: 'PostgreSQL Query Boost',
    description: 'Optimization through structured indexing, connection pooling & schema normalization',
    icon: 'Zap'
  },
  {
    value: 99.2,
    suffix: '%',
    label: 'Production Uptime',
    description: 'Maintained across robust AWS EC2, Cloudflare, and CI/CD automated deployments',
    icon: 'ShieldCheck'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#facc15', // Electric Yellow
    skills: [
      { name: 'React.js', level: 95, category: 'Frontend' },
      { name: 'Next.js', level: 88, category: 'Frontend' },
      { name: 'HTML5', level: 98, category: 'Frontend' },
      { name: 'CSS3', level: 94, category: 'Frontend' },
      { name: 'Tailwind CSS', level: 96, category: 'Frontend' },
      { name: 'Responsive Design', level: 96, category: 'Frontend' },
      { name: 'UI/UX Implementation', level: 90, category: 'Frontend' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#ef4444', // Crimson Red
    skills: [
      { name: 'Node.js', level: 92, category: 'Backend' },
      { name: 'Express.js', level: 94, category: 'Backend' },
      { name: 'REST APIs', level: 96, category: 'Backend' },
      { name: 'Authentication', level: 90, category: 'Backend' }
    ]
  },
  {
    id: 'database',
    name: 'Database',
    color: '#f97316', // Flame Orange
    skills: [
      { name: 'PostgreSQL', level: 92, category: 'Database' },
      { name: 'SQL', level: 94, category: 'Database' },
      { name: 'Database Design', level: 90, category: 'Database' },
      { name: 'Query Optimization', level: 88, category: 'Database' }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    color: '#dc2626', // Scarlet Red
    skills: [
      { name: 'AWS EC2', level: 86, category: 'Cloud & DevOps' },
      { name: 'Cloudflare', level: 90, category: 'Cloud & DevOps' },
      { name: 'Vercel', level: 94, category: 'Cloud & DevOps' },
      { name: 'Docker', level: 80, category: 'Cloud & DevOps' },
      { name: 'CI/CD', level: 85, category: 'Cloud & DevOps' },
      { name: 'GitHub Actions', level: 86, category: 'Cloud & DevOps' }
    ]
  },
  {
    id: 'ai-genai',
    name: 'AI & Generative AI',
    color: '#fbbf24', // Amber Gold
    skills: [
      { name: 'Google Gemini API', level: 94, category: 'AI & Generative AI' },
      { name: 'Generative AI Integration', level: 90, category: 'AI & Generative AI' },
      { name: 'Python', level: 86, category: 'AI & Generative AI' },
      { name: 'Scikit-learn', level: 84, category: 'AI & Generative AI' }
    ]
  },
  {
    id: 'tools',
    name: 'Tools & Frameworks',
    color: '#f43f5e', // Rose Red
    skills: [
      { name: 'TypeScript', level: 90, category: 'Tools & Frameworks' },
      { name: 'Three.js / WebGL', level: 85, category: 'Tools & Frameworks' },
      { name: 'Git & GitHub', level: 94, category: 'Tools & Frameworks' },
      { name: 'Wireshark', level: 86, category: 'Tools & Frameworks' },
      { name: 'Vite & Bundlers', level: 92, category: 'Tools & Frameworks' },
      { name: 'Postman & API Testing', level: 92, category: 'Tools & Frameworks' }
    ]
  }
];

export const ALL_SKILLS = SKILL_CATEGORIES.flatMap(c => c.skills);

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'cloudnex',
    company: 'CloudNex, Chennai',
    role: 'Full Stack Developer',
    location: 'Chennai, India',
    period: 'Nov 2025 – Oct 2026',
    type: 'Full-time',
    points: [
      'Built and deployed full-stack web apps from scratch for diverse clients across retail, enterprise, and creative sectors.',
      'Designed resilient Node.js backends with REST APIs, secure token-based authentication, and seamless database integration.',
      'Architected PostgreSQL relational databases and configured automated CI/CD deployment pipelines.',
      'Deployed production services on AWS EC2, Cloudflare, and Netlify with zero-downtime rolling updates.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'AWS EC2', 'Cloudflare', 'REST APIs', 'CI/CD']
  },
  {
    id: 'intrust',
    company: 'Intrust Innovation Labs',
    role: 'Network Security Intern',
    location: 'Chennai, India',
    period: 'Feb 2024 – Jul 2025',
    type: 'Internship',
    points: [
      'Assisted in network security assessments and vulnerability identification across client web applications.',
      'Monitored network traffic and analyzed telemetry security events using packet inspection tooling.',
      'Performed basic penetration testing on web and network environments, reporting mitigations to engineering teams.'
    ],
    technologies: ['Network Security', 'Wireshark', 'Vulnerability Assessment', 'Penetration Testing', 'Traffic Analysis']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'srilakshmi-jewels',
    title: 'Srilakshmi Jewels',
    description: 'High-performance e-commerce platform built for an exquisite jewelry brand with inventory management and secure checkout.',
    longDescription: 'Engineered a full-featured e-commerce platform from scratch. Features an interactive product catalog with high-resolution zooming, dynamic pricing, relational cart & order tables in PostgreSQL, and automated inventory sync. Scaled on AWS EC2 with Cloudflare CDN caching.',
    role: 'Lead Full Stack Developer',
    technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'AWS EC2', 'Cloudflare'],
    liveUrl: 'https://srilakshmijewels.in/',
    category: 'Client Work',
    metrics: '99.5% Uptime • Sub-second page load times',
    highlights: [
      'Relational cart and transactional order state machine in PostgreSQL',
      'Automated order invoicing and email notifications via REST endpoints',
      'Deployed on AWS EC2 with reverse proxy and SSL configuration'
    ]
  },
  {
    id: 'taratech',
    title: 'TaraTech',
    description: 'Corporate business website with dynamic inquiry handling and contact management APIs.',
    longDescription: 'Corporate platform designed for high conversion. Includes dynamic service showcases, interactive client inquiry workflows, automated email alerts, and administrative lead tracking backed by PostgreSQL.',
    role: 'Full Stack Engineer',
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'REST APIs', 'Vercel'],
    liveUrl: 'https://taratech.vercel.app/index.html',
    category: 'Client Work',
    metrics: 'Real-time contact sync • 98+ Google Lighthouse score',
    highlights: [
      'Validated client submission pipeline with sanitization and spam detection',
      'PostgreSQL lead tracking and notification dispatch service',
      'Ultra-fast asset delivery with optimized bundle splitting'
    ]
  },
  {
    id: 'dubai-client',
    title: 'Dubai Client Business Website',
    description: 'Custom branded international corporate site with high-availability backend APIs, SSL, and production deployment.',
    longDescription: 'Crafted a bespoke corporate digital presence tailored for UAE and international enterprise clientele. Integrated SSL certificates, custom DNS routing, RESTful inquiry pipelines, and responsive bilingual layouts.',
    role: 'Full Stack Engineer & Cloud Architect',
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Cloudflare SSL', 'Vercel'],
    liveUrl: 'https://dubai-clientnew.vercel.app/',
    category: 'Client Work',
    metrics: 'Global multi-region CDN • Enterprise branding',
    highlights: [
      'Custom DNS, Cloudflare edge SSL, and DDoS mitigation',
      'Structured database logging for corporate leads and event analytics',
      'Flawless responsive layouts for ultra-wide monitors down to mobile'
    ]
  },
  {
    id: 'zeropixel-studio',
    title: 'ZeroPixel Studio',
    description: 'Modern, highly responsive studio website featuring modular, reusable UI sections and interactive showcases.',
    longDescription: 'A showcase of modern frontend craftsmanship. Built with atomic design principles, featuring fluid typography, dark mode aesthetics, and highly modular React components that achieved 95% reusability across future client platforms.',
    role: 'Frontend Architect',
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://zeropixelstudio.vercel.app/',
    category: 'Full Stack',
    metrics: '95% reusable UI design system',
    highlights: [
      'Component-driven architecture with customizable color themes',
      'Smooth scroll transitions and responsive design patterns',
      'Optimized performance with zero layout shifts'
    ]
  },
  {
    id: 'nyxora-ai',
    title: 'Nyxora AI',
    description: 'Cutting-edge AI-focused web application leveraging Google Gemini API and Three.js 3D visualizations.',
    longDescription: 'Flagship artificial intelligence application blending real-time generative AI reasoning with an immersive 3D spatial interface. Features multi-turn conversational agents, prompt templates, structured output parsing, and dynamic 3D visualizations rendered via Three.js.',
    role: 'Creator & Lead Architect',
    technologies: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Three.js', 'Gemini API'],
    liveUrl: 'https://nyxora-ai.vercel.app',
    featured: true,
    category: 'AI / GenAI',
    metrics: 'Featured 3D & GenAI Highlight • Sub-800ms streaming responses',
    highlights: [
      'Gemini API integration with streaming token rendering and system instructions',
      'Interactive 3D particle nodes that pulse with AI thought streams',
      'Clean TypeScript typing with robust error recovery and rate limiting'
    ]
  },
  {
    id: 'wireless-network-vulnerability',
    title: 'Wireless Network Vulnerability Prediction',
    description: 'Machine learning model predicting vulnerable network traffic patterns with 87% accuracy using packet telemetry.',
    longDescription: 'Research and engineering project analyzing wireless packet streams captured via Wireshark to identify suspicious patterns, denial of service attempts, and unauthorized access probes before intrusion escalation.',
    role: 'Data Scientist & ML Engineer',
    technologies: ['Python', 'Scikit-learn', 'Wireshark', 'Pandas', 'NumPy', 'Data Mining'],
    isCaseStudy: true,
    category: 'Data Science / ML',
    metrics: '87% Prediction Accuracy • 0.89 ROC-AUC Score',
    highlights: [
      'Extracted 32 distinctive packet flow features from 100K+ PCAP network packets',
      'Trained Random Forest and Gradient Boosting ensembles against labeled attack data',
      'Evaluated feature importances, demonstrating payload entropy & inter-arrival time as top predictors'
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'msc-ds',
    degree: 'M.Sc. Data Science',
    institution: 'Sri Sarada College for Women (Autonomous)',
    location: 'Salem, Tamil Nadu',
    period: 'Completed May 2025',
    highlights: [
      'Specialized in Machine Learning, Big Data Architectures, Predictive Modeling, and Distributed Systems',
      'Academic project lead for Network Security & Traffic Telemetry analysis models',
      'Graduated with First Class Distinction'
    ]
  },
  {
    id: 'bsc-cs',
    degree: 'B.Sc. Computer Science',
    institution: 'Sri Sarada College for Women (Autonomous)',
    location: 'Salem, Tamil Nadu',
    period: 'Completed May 2023',
    highlights: [
      'Core foundations in Data Structures, Relational Database Management Systems (RDBMS), OOP, and Web Technologies',
      'Active participant in technical symposiums and coding hackathons',
      'Consistently ranked top tier in collegiate academic standing'
    ]
  }
];

export const RESUME_DETAILS = {
  summary: "Results-driven Full Stack Developer with hands-on experience building, testing, and deploying production web applications using React.js, Node.js, Express.js, and PostgreSQL. Proven track record of delivering 5+ deployed client web applications on AWS EC2 and Cloudflare with 99.2% uptime. Strong background in Data Science and ML (M.Sc. Data Science) with exploration in Google Gemini API integrations and cybersecurity.",
  technicalSkills: {
    languages: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
    frameworksAndLibs: ['React.js', 'Next.js', 'Express.js', 'Node.js', 'Three.js / React Three Fiber', 'Tailwind CSS', 'Framer Motion'],
    databases: ['PostgreSQL', 'SQL Optimization', 'Database Schema Design', 'ORM / Query Building'],
    cloudAndDevOps: ['AWS EC2', 'Cloudflare (DNS, SSL, Workers)', 'Vercel', 'Netlify', 'Docker', 'CI/CD Pipelines', 'GitHub Actions'],
    securityAndAi: ['Network Vulnerability Assessment', 'Wireshark Telemetry', 'Google Gemini AI API', 'Scikit-learn', 'Pandas']
  }
};
