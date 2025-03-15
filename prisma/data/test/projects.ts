enum ProjectStatus {
  IDEA = "IDEA",
  PLANNING = "PLANNING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD",
  ABANDONED = "ABANDONED",
}

export const projects = [
  {
    title: "AI Content Generator",
    description:
      "An AI-powered tool that generates blog posts, social media content, and marketing copy based on simple prompts.",
    slug: "ai-content-generator",
    imageUrl: "/images/test/ai-generator.png",
    status: ProjectStatus.COMPLETED,
    liveDemoUrl: "https://ai-content-gen.example.com",
    githubUrl: "https://github.com/username/ai-content-gen",
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
    featured: true,
    startDate: new Date("2024-01-15"),
    endDate: new Date("2025-02-28"),
    category: "Machine Learning",
    testimonial:
      "This tool increased our content production by 300% while maintaining quality!",
  },
  {
    title: "Crypto Portfolio Tracker",
    description:
      "A cryptocurrency portfolio tracker with real-time price updates and performance analytics.",
    slug: "crypto-tracker",
    imageUrl: "/images/test/crypto.png",
    status: ProjectStatus.IN_PROGRESS,
    liveDemoUrl: null,
    githubUrl: "https://github.com/username/crypto-portfolio",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "CoinGecko API"],
    featured: false,
    startDate: new Date("2025-01-01"),
    endDate: null,
    category: "Finance",
    testimonial: null,
  },
  {
    title: "Sustainable Food Delivery App",
    description:
      "A mobile app connecting eco-conscious restaurants with customers wanting sustainable food options.",
    slug: "eco-food-delivery",
    imageUrl: "/images/test/food-app.png",
    status: ProjectStatus.PLANNING,
    liveDemoUrl: null,
    githubUrl: null,
    technologies: ["React Native", "Firebase", "Google Maps API", "Stripe"],
    featured: true,
    startDate: new Date("2025-04-01"),
    endDate: null,
    category: "Mobile App",
    testimonial: null,
  },
  {
    title: "Smart Home Dashboard",
    description:
      "A unified dashboard to control and monitor all smart home devices regardless of manufacturer.",
    slug: "smart-home-dashboard",
    imageUrl: "/images/test/smart-home.png",
    status: ProjectStatus.ON_HOLD,
    liveDemoUrl: "https://smart-dash.example.com",
    githubUrl: "https://github.com/username/smart-dash",
    technologies: ["React", "Node.js", "MQTT", "WebSockets", "Raspberry Pi"],
    featured: false,
    startDate: new Date("2024-05-15"),
    endDate: null,
    category: "IoT",
    testimonial: null,
  },
  {
    title: "Productivity Timer",
    description:
      "A Pomodoro-style timer application with task tracking and productivity analytics.",
    slug: "productivity-timer",
    imageUrl: "/images/test/pomodoro.png",
    status: ProjectStatus.COMPLETED,
    liveDemoUrl: "https://focus-timer.example.com",
    githubUrl: "https://github.com/username/focus-timer",
    technologies: ["Vue.js", "Electron", "Chart.js", "LocalStorage API"],
    featured: true,
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-01-30"),
    category: "Productivity",
    testimonial:
      "This timer helped our team increase focus time by 45% in the first month!",
  },
  {
    title: "AR Furniture Visualizer",
    description:
      "An augmented reality app that lets users visualize furniture in their space before purchasing.",
    slug: "ar-furniture",
    imageUrl: null,
    status: ProjectStatus.IDEA,
    liveDemoUrl: null,
    githubUrl: null,
    technologies: ["Unity", "ARKit", "ARCore", "3D Modeling", "C#"],
    featured: false,
    startDate: null,
    endDate: null,
    category: "Augmented Reality",
    testimonial: null,
  },
  {
    title: "Personal Budget Planner",
    description:
      "A budget planning application with visualizations and AI-powered spending insights.",
    slug: "budget-planner",
    imageUrl: "/images/test/budget.png",
    status: ProjectStatus.ABANDONED,
    liveDemoUrl: null,
    githubUrl: "https://github.com/username/budget-planner",
    technologies: ["Angular", "D3.js", "Express", "MongoDB"],
    featured: false,
    startDate: new Date("2023-06-10"),
    endDate: new Date("2023-08-15"),
    category: "Finance",
    testimonial: null,
  },
];
