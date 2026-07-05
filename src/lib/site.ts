export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 6, suffix: " yrs", label: "Of Building" },
];

export type Service = {
  title: string;
  blurb: string;
  icon: string;
  span?: string;
  tags: string[];
};

export const services: Service[] = [
  {
    title: "Web Development",
    blurb:
      "Custom web applications engineered with modern frameworks, clean architecture, and best practices — built to scale.",
    icon: "code",
    span: "lg:col-span-2",
    tags: ["Next.js", "React", "Node.js", "TypeScript"],
  },
  {
    title: "AI & Machine Learning",
    blurb:
      "Intelligent solutions powered by ML and AI to automate processes and sharpen decision-making.",
    icon: "brain",
    tags: ["TensorFlow", "PyTorch", "LLMs"],
  },
  {
    title: "Mobile App Development",
    blurb:
      "Native and cross-platform apps for iOS and Android with smooth, native-feeling experiences.",
    icon: "smartphone",
    tags: ["React Native", "Flutter", "Swift"],
  },
  {
    title: "Cloud & DevOps",
    blurb:
      "Scalable cloud infrastructure and automated pipelines on AWS, Azure, and Google Cloud.",
    icon: "cloud",
    tags: ["AWS", "Docker", "Kubernetes"],
  },
  {
    title: "Cybersecurity",
    blurb:
      "Robust security audits, penetration testing, and threat monitoring to protect your digital assets.",
    icon: "shield",
    tags: ["Audits", "Pen-testing"],
  },
  {
    title: "Digital Transformation",
    blurb:
      "End-to-end strategy and implementation that modernizes legacy systems and unlocks new growth.",
    icon: "rocket",
    span: "lg:col-span-2",
    tags: ["Strategy", "UI/UX", "Automation"],
  },
  {
    title: "Workshops & Training",
    blurb:
      "Hands-on technical workshops covering AI, web development, cloud computing, and emerging technologies — designed for students and professionals.",
    icon: "graduationCap",
    tags: ["AI/ML", "Web Dev", "Cloud", "Bootcamps"],
  },
  {
    title: "Academic Collaborations",
    blurb:
      "Research partnerships with universities and institutions to co-develop innovative solutions, publish papers, and push the boundaries of technology.",
    icon: "handshake",
    tags: ["Research", "Universities", "Co-development"],
  },
  {
    title: "Internship Programs",
    blurb:
      "Structured internship opportunities that give aspiring developers real-world project experience, mentorship, and a pathway into the tech industry.",
    icon: "bookOpen",
    tags: ["Mentorship", "Projects", "Career Growth"],
  },
];

export const techGroups: { name: string; items: string[] }[] = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB"],
  },
  {
    name: "AI / ML",
    items: ["TensorFlow", "PyTorch", "OpenAI", "Pandas", "Spark"],
  },
  {
    name: "Cloud / DevOps",
    items: ["AWS", "Azure", "Docker", "Kubernetes", "Vercel"],
  },
  {
    name: "Mobile",
    items: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
];

export const marquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "TensorFlow",
  "PyTorch",
  "Node.js",
  "AWS",
  "Docker",
  "Kubernetes",
  "Flutter",
  "PostgreSQL",
  "Tailwind CSS",
  "MongoDB",
  "Vercel",
];

export type Project = {
  title: string;
  category: string;
  blurb: string;
  tags: string[];
  gradient: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "AI Analytics Dashboard",
    category: "AI / ML",
    blurb:
      "An intelligent dashboard surfacing business insights with real-time machine-learning predictions.",
    tags: ["Python", "TensorFlow", "React"],
    gradient: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
    image: "/images/projects/ai_dashboard.jpg",
  },
  {
    title: "E-Commerce Platform",
    category: "Web",
    blurb:
      "A modern commerce experience with advanced analytics, payments, and inventory management.",
    tags: ["Next.js", "Stripe", "Postgres"],
    gradient: "from-cyan-500/30 via-sky-500/20 to-indigo-500/30",
    image: "/images/projects/ecommerce.jpg",
  },
  {
    title: "Healthcare Management System",
    category: "Web",
    blurb:
      "A comprehensive platform for hospitals and clinics to manage patients, staff, and records.",
    tags: ["React", "Node.js", "HIPAA"],
    gradient: "from-teal-500/30 via-emerald-500/20 to-green-500/30",
    image: "/images/projects/healthcare.jpg",
  },
  {
    title: "Food Delivery App",
    category: "Mobile",
    blurb:
      "A feature-rich delivery app with real-time order tracking and integrated payments.",
    tags: ["React Native", "Maps", "Stripe"],
    gradient: "from-amber-500/30 via-orange-500/20 to-rose-500/30",
    image: "/images/projects/food_delivery.jpg",
  },
  {
    title: "Mobile Banking App",
    category: "Mobile",
    blurb:
      "A secure banking app with biometric authentication and instant, real-time transactions.",
    tags: ["Flutter", "Biometrics", "Fintech"],
    gradient: "from-indigo-500/30 via-violet-500/20 to-fuchsia-500/30",
    image: "/images/projects/mobile_banking.jpg",
  },
  {
    title: "Smart Home IoT Platform",
    category: "AI / ML",
    blurb:
      "Home automation with AI-driven energy optimization across connected devices.",
    tags: ["IoT", "AI", "Realtime"],
    gradient: "from-lime-500/30 via-emerald-500/20 to-teal-500/30",
    image: "/images/projects/smart_home.jpg",
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    blurb:
      "We dig into your requirements, define the scope, and align on a clear vision for success.",
  },
  {
    step: "02",
    title: "Design",
    blurb:
      "We craft wireframes, prototypes, and a polished user experience that feels effortless.",
  },
  {
    step: "03",
    title: "Build",
    blurb:
      "We engineer your solution with modern tech, clean code, and best practices throughout.",
  },
  {
    step: "04",
    title: "Launch & Support",
    blurb:
      "We deploy, test, and provide ongoing support so your product keeps performing at its best.",
  },
];

export const values = [
  {
    title: "Innovation with Care",
    blurb:
      "We approach every project with genuine care and inventive thinking — solutions that truly serve clients.",
    icon: "sparkles",
  },
  {
    title: "Collaborative Excellence",
    blurb:
      "The best solutions emerge from close collaboration between our team and yours.",
    icon: "users",
  },
  {
    title: "Results-Driven",
    blurb:
      "We strive for excellence in everything we do and measure ourselves by your outcomes.",
    icon: "target",
  },
  {
    title: "Trust & Reliability",
    blurb:
      "Long-term partnerships built on transparent communication and consistent delivery.",
    icon: "shield",
  },
];

export type Member = {
  name: string;
  role: string;
  blurb: string;
  initials: string;
  accent: string;
};

export const team: Member[] = [
  {
    name: "Bilal Khalid",
    role: "CEO & Co-Founder",
    blurb:
      "Visionary leader driving innovation and digital transformation, shaping the future of technology.",
    initials: "BK",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    name: "Danish Shafique",
    role: "AI/ML Engineer & Full Stack Developer",
    blurb:
      "Builds intelligent AI-powered web and mobile applications by combining modern full-stack development with scalable, user-centric solutions.",
    initials: "DS",
    accent: "from-cyan-400 to-indigo-500",
  },
  {
    name: "Dania Arshad",
    role: "AI/ML Engineer & Full Stack Developer",
    blurb:
      "Blends the power of AI with full-stack development to create intelligent, scalable, and user-centric solutions.",
    initials: "DA",
    accent: "from-cyan-400 to-sky-500",
  },
  {
    name: "Muhammad Wahaj Yasin",
    role: "AI/ML Engineer & Full Stack Developer",
    blurb:
      "Combines technical expertise with innovative problem-solving to develop intelligent systems and scalable solutions.",
    initials: "WY",
    accent: "from-indigo-400 to-violet-500",
  },
  {
    name: "Syed Moosa Ali",
    role: "AI/ML Engineer & Full Stack Developer",
    blurb:
      "Dedicated to building impactful, future-ready solutions that merge AI with end-to-end development.",
    initials: "MA",
    accent: "from-teal-400 to-emerald-500",
  },
  {
    name: "Safura Kasu",
    role: "Quantum & AI Developer",
    blurb:
      "Explores the cutting edge of quantum computing and AI to drive innovation and shape the future of technology.",
    initials: "SK",
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    name: "Muhammad Imran",
    role: "Android Developer",
    blurb:
      "Crafts seamless and user-friendly mobile experiences, ensuring high performance and reliable delivery.",
    initials: "MI",
    accent: "from-amber-400 to-orange-500",
  },
  {
    name: "Waleed Ahmed",
    role: "Full Stack Web Engineer",
    blurb:
      "Specializes in building dynamic, scalable, and efficient web applications that bring complex ideas to life.",
    initials: "WA",
    accent: "from-pink-400 to-rose-500",
  },
  {
    name: "Rida Batool",
    role: "UI/UX Designer",
    blurb:
      "Designs intuitive and visually engaging user experiences, ensuring our products are functional and beautiful.",
    initials: "RB",
    accent: "from-fuchsia-400 to-pink-500",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Working with Healora was a game-changer. They understood our vision and turned it into a powerful digital product.",
    name: "Alex Rivera",
    role: "CEO, TechStart Inc.",
    initials: "AR",
  },
  {
    quote:
      "They transformed our outdated system into a modern, efficient platform. The attention to detail exceeded our expectations.",
    name: "Priya Sharma",
    role: "Founder, GrowthCo",
    initials: "PS",
  },
  {
    quote:
      "A genuine technical partner. The team communicated clearly, delivered on time, and the quality was outstanding.",
    name: "Jordan Lee",
    role: "CTO, Innovation Labs",
    initials: "JL",
  },
];

export const faqs = [
  {
    q: "How long does a typical project take?",
    a: "It depends on scope, but most projects run 6–16 weeks. After our discovery phase we give you a clear timeline and milestones up front.",
  },
  {
    q: "Can you help with existing projects?",
    a: "Absolutely. We regularly join in-flight projects — modernizing legacy code, adding features, or scaling infrastructure.",
  },
  {
    q: "What technologies do you work with?",
    a: "We're full-stack: React, Next.js, Node, Python, TensorFlow and PyTorch, plus AWS, Azure, Docker, and Kubernetes for cloud and DevOps.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. We offer support and maintenance packages so your solution keeps performing optimally long after launch.",
  },
];

export const contact = {
  email: "info@healora.co.uk",
  phone: "+44 7445750757",
  hours: "Mon–Fri · 9:00 AM – 6:00 PM EST",
  address: "27 Russell Street, BL14BE",
  responseTime: "We reply within 24 hours",
};
