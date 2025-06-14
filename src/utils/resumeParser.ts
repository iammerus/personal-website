export interface Experience {
  position: string
  company: string
  location: string
  duration: string
  techStack?: string[]
  achievements: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  duration: string
}

export interface PersonalInfo {
  name: string
  title: string
  location: string
  phone: string
  email: string
  links: {
    github: string
    portfolio: string
  }
}

export interface Skills {
  frontend: string[]
  backend: string[]
  databases: string[]
  cloudAndDevOps: string[]
  testing: string[]
  other: string[]
}

export interface Language {
  language: string
  proficiency: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  profile: string
  experience: Experience[]
  education: Education[]
  skills: Skills
  languages: Language[]
}

export interface Skill {
  name: string
  level: number
  category: string
}

export interface LinksData {
  links: {
    [key: string]: {
      url: string
      display: string
      type: string
    }
  }
}

// Function to load resume data from JSON (fallback data for build time)
export function loadResumeData(): ResumeData {
  // This is fallback data that matches the JSON structure
  const resumeData: ResumeData = {
    personalInfo: {
      name: "Melvin Mupondori",
      title: "Senior Full Stack Engineer",
      location: "Harare, Zimbabwe",
      phone: "+263(0)783-944-585",
      email: "melvin.rufetu@proton.me",
      links: {
        github: "GitHub",
        portfolio: "Portfolio"
      }
    },
    profile: "Senior Full-stack Engineer with 5+ years of experience building end-to-end web solutions across healthcare, e-sports, and enterprise sectors. Proficient across the entire technology stack: frontend (React, Vue.js, TypeScript), backend (Node.js, Laravel, GraphQL, RESTful APIs), and DevOps (Docker, Kubernetes, CI/CD). Architected scalable microservices handling 1M+ daily requests and optimized database performance achieving 75% faster read times. Experienced with modern web approaches including SSR, JAMstack architecture, and progressive web applications. Integrates machine learning capabilities into web applications using TensorFlow.js and Python-based ML services. Implements robust security practices, accessibility standards (WCAG), and real-time features (WebSockets) while leveraging cutting-edge tools like Next.js, Nuxt.js, and serverless functions alongside cloud platforms (AWS, GCP). Proven technical mentor who translates business requirements into robust technical solutions while elevating team capabilities.",
    experience: [
      {
        position: "Senior Full-stack Engineer",
        company: "Community Dental Partners",
        location: "Denton",
        duration: "Nov 2022 — Present",
        techStack: ["React", "shadcn/ui", "Redux", "Node.js", "Laravel", "ASP.NET Core", "AWS RDS", "Lambda", "Playwright"],
        achievements: [
          "Architected and led frontend development of an enterprise-grade intranet application managing the complete patient journey including scheduling, insurance verification, and billing systems using React and shadcn/ui",
          "Enhanced application performance by 50% through implementing advanced techniques including tree shaking, bundle size reduction, strategic caching (both browser and in-memory), and server-side rendering",
          "Designed and maintained 20+ internal healthcare applications handling practice management, synchronized data from distributed OpenDental instances to centralized AWS RDS infrastructure, processing TBs of data monthly",
          "Engineered microservices architecture integrating with external healthcare systems including Medicare, insurance providers, and SwellCX while building secure data pipelines",
          "Established robust CI/CD pipelines incorporating end-to-end testing with Playwright as part of the automated build process",
          "Mentored 3 junior developers through structured code reviews, pair programming sessions, and technical guidance, resulting in their promotion to mid-level roles"
        ]
      },
      {
        position: "Software Engineer",
        company: "OperateBeyond",
        location: "Grand Rapids",
        duration: "Aug 2022 — Oct 2022",
        techStack: ["Vue.js", "NaiveUI", "Laravel", "Zend", "Elasticsearch", "Redis"],
        achievements: [
          "Optimized Elasticsearch implementation for multi-industry dealership platform through strategic tuning of indexing parameters, refined shard management, explicit data type mappings, and query optimization, reducing index times by 40% and search latency by 50%",
          "Developed a responsive dealership management system using Vue.js and NaiveUI that integrated with diverse legacy Dealer Management Systems across powersports, marine, and RV industries",
          "Created a fault-tolerant inventory data ingestion and syndication system capable of normalizing disparate data formats from hundreds of dealers to multiple third-party classified sites",
          "Constructed modular integration framework with queuing systems and automated recovery processes to handle the complexity of diverse data sources and ensure system resilience"
        ]
      },
      {
        position: "Software Engineer",
        company: "Gfinity PLC",
        location: "London",
        duration: "Jul 2021 — Jul 2022",
        techStack: ["Vue 3", "Nuxt", "Vite", "NaiveUI", "WebSocket", "Zend/PHP", "Redis"],
        achievements: [
          "Developed key components for the F1 Esports platform using Vue 3, Nuxt, and NaiveUI, including dynamic results ingestion, real-time standings updates, and comprehensive race control admin dashboards",
          "Reduced application loading time by 80% through implementing route-based code splitting, component-level lazy loading, vendor chunk separation, and optimized build configurations in Vite",
          "Architected real-time tournament system handling 100K+ concurrent users through dedicated WebSocket server integration with backend event publishing via Redis Pub/Sub",
          "Designed bracket generation and seeding logic for complex tournament progressions while building specialized team management interfaces for official F1 teams",
          "Enhanced NVIDIA's GeForce Forums (Angular) performance by 25% through optimization of frontend components"
        ]
      },
      {
        position: "Software Engineering Consultant",
        company: "Community Dental Partners",
        location: "Denton",
        duration: "Oct 2020 — May 2021",
        achievements: [
          "Architected and maintained 10+ microservices using Node.js and GraphQL",
          "Improved database read performance by 75% through query optimization and caching strategies",
          "Developed RESTful API service for patient data integration, implementing comprehensive error handling and data validation",
          "Built a comprehensive testing suite using Jest and Playwright, achieving 90% test coverage"
        ]
      },
      {
        position: "Software Engineering Consultant",
        company: "American Sign Language Communication",
        location: "Henderson",
        duration: "Sep 2019 — Sep 2020",
        techStack: ["Node.js", "React", ".NET Core", "AWS (ECR, EKS)", "Docker", "Kubernetes", "ArgoCD", "Bitbucket Pipelines", "Jest", "Cypress"],
        achievements: [
          "Modernized critical legacy Node.js application (Node 6 to Node 18) for ASL interpreter scheduling platform connecting healthcare providers with interpreters",
          "Established comprehensive CI/CD pipeline using Bitbucket Pipelines, AWS ECR, and ArgoCD for GitOps-based deployments to EKS cluster, increasing feature delivery speed by 40%",
          "Reduced build time by 60% through Node.js version upgrade, webpack configuration optimization, and implementation of parallel build processes",
          "Designed robust Kubernetes deployment strategy with health/readiness probes enabling zero-downtime deployments and improved system reliability",
          "Established comprehensive frontend and backend testing framework using Jest for unit/integration tests and Cypress for E2E testing, achieving 80% test coverage on critical application paths",
          "Deployed regression testing suite for legacy codebase, preventing regressions during modernization efforts and ensuring business continuity"
        ]
      },
      {
        position: "Full-stack Developer",
        company: "AM Agency",
        location: "Hurst",
        duration: "Jan 2019 — Aug 2019",
        achievements: []
      },
      {
        position: "Full-stack Developer",
        company: "Webdev Zimbabwe",
        location: "Harare",
        duration: "Jan 2018 — Dec 2018",
        achievements: []
      }
    ],
    education: [
      {
        degree: "Higher National Diploma In Information Technology",
        institution: "Mutare Polytechnic College",
        location: "Harare",
        duration: "Jan 2014 — Jan 2017"
      }
    ],
    skills: {
      frontend: ["React", "Vue", "Next.js", "Nuxt.js", "TypeScript", "Tailwind"],
      backend: ["Node.js", "Express.js", "PHP (Laravel, Symfony)", "HAPI", "GraphQL", "REST API"],
      databases: ["PostgreSQL", "MySQL", "MongoDB", "Elasticsearch"],
      cloudAndDevOps: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD"],
      testing: ["Jest", "Playwright", "Cypress", "PHPUnit", "Pest"],
      other: ["Git", "WebSocket", "JAMstack"]
    },
    languages: [
      { language: "English", proficiency: "Highly proficient" },
      { language: "Shona", proficiency: "Native speaker" }
    ]
  };
  
  return resumeData;
}

// Function to load links data from JSON (fallback data for build time)
export function loadLinksData(): LinksData {
  const linksData: LinksData = {
    links: {
      github: {
        url: "https://github.com/iammerus",
        display: "GitHub",
        type: "code_repository"
      },
      portfolio: {
        url: "https://mups.co.zw",
        display: "Personal Website",
        type: "portfolio"
      },
      linkedin: {
        url: "https://www.linkedin.com/in/melvin-mupondori-815318210/",
        display: "LinkedIn",
        type: "professional_network"
      }
    }
  };
  
  return linksData;
}

// Convert skills object to flat skill array with levels
export function skillsToSkillArray(skills: Skills): Skill[] {
  const skillArray: Skill[] = [];
  
  // Define skill levels based on expertise
  const frontendLevels: Record<string, number> = {
    'React': 95,
    'Vue': 90,
    'Next.js': 85,
    'Nuxt.js': 85,
    'TypeScript': 90,
    'Tailwind': 85
  };
  
  const backendLevels: Record<string, number> = {
    'Node.js': 90,
    'Express.js': 85,
    'PHP (Laravel, Symfony)': 85,
    'HAPI': 80,
    'GraphQL': 80,
    'REST API': 95
  };
  
  const databaseLevels: Record<string, number> = {
    'PostgreSQL': 85,
    'MySQL': 85,
    'MongoDB': 80,
    'Elasticsearch': 75
  };
  
  const devOpsLevels: Record<string, number> = {
    'AWS': 85,
    'GCP': 80,
    'Docker': 80,
    'Kubernetes': 70,
    'CI/CD': 75
  };
  
  const testingLevels: Record<string, number> = {
    'Jest': 85,
    'Playwright': 80,
    'Cypress': 80,
    'PHPUnit': 75,
    'Pest': 70
  };
  
  const otherLevels: Record<string, number> = {
    'Git': 90,
    'WebSocket': 80,
    'JAMstack': 85
  };
  
  // Add frontend skills
  skills.frontend.forEach(skill => {
    skillArray.push({
      name: skill,
      level: frontendLevels[skill] || 75,
      category: 'Frontend'
    });
  });
  
  // Add backend skills
  skills.backend.forEach(skill => {
    skillArray.push({
      name: skill,
      level: backendLevels[skill] || 75,
      category: 'Backend'
    });
  });
  
  // Add database skills
  skills.databases.forEach(skill => {
    skillArray.push({
      name: skill,
      level: databaseLevels[skill] || 75,
      category: 'Database'
    });
  });
  
  // Add DevOps skills
  skills.cloudAndDevOps.forEach(skill => {
    skillArray.push({
      name: skill,
      level: devOpsLevels[skill] || 75,
      category: 'DevOps'
    });
  });
  
  // Add testing skills
  skills.testing.forEach(skill => {
    skillArray.push({
      name: skill,
      level: testingLevels[skill] || 75,
      category: 'Testing'
    });
  });
  
  // Add other skills
  skills.other.forEach(skill => {
    skillArray.push({
      name: skill,
      level: otherLevels[skill] || 75,
      category: 'Other'
    });
  });
  
  return skillArray;
}

// Utility function to get years of experience
export function getYearsOfExperience(experiences: Experience[]): number {
  if (experiences.length === 0) return 5; // Default based on profile
  
  const currentYear = new Date().getFullYear();
  let earliestYear = currentYear;
  
  experiences.forEach(exp => {
    const match = exp.duration.match(/(\w+ \d{4})/);
    if (match) {
      const yearMatch = match[1].match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        if (year < earliestYear) {
          earliestYear = year;
        }
      }
    }
  });
  
  return currentYear - earliestYear;
}

// Utility to group skills by category
export function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

// Legacy compatibility function - converts new structure to old expected format
export function parseResumeMarkdown(markdownContent: string): any {
  const resumeData = loadResumeData();
  const linksData = loadLinksData();
  
  return {
    contact: {
      name: resumeData.personalInfo.name,
      title: resumeData.personalInfo.title,
      location: resumeData.personalInfo.location,
      phone: resumeData.personalInfo.phone,
      email: resumeData.personalInfo.email,
      github: linksData.links.github?.url || 'https://github.com/iammerus',
      linkedin: linksData.links.linkedin?.url || 'https://www.linkedin.com/in/melvin-mupondori-815318210/'
    },
    profile: resumeData.profile,
    experience: resumeData.experience.map(exp => ({
      period: exp.duration,
      role: exp.position,
      company: exp.company,
      location: exp.location,
      description: '',
      achievements: exp.achievements,
      technologies: exp.techStack || []
    })),
    education: resumeData.education.map(edu => ({
      period: edu.duration,
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location
    })),
    skills: skillsToSkillArray(resumeData.skills),
    technologies: Object.values(resumeData.skills).flat()
  };
}
