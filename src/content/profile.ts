export const profile = {
  name: "Srilan Catalinio",
  shortName: "Srilan",
  headline: "Senior Software Engineering Manager",
  tagline:
    "Building engineering teams, AI-driven platforms, and the systems that make them run.",
  about:
    "I'm a Senior Software Engineering Manager at GlobalTek PH, leading engineering, R&D, and support teams focused on internal platforms, AI-driven automation, operational efficiency, and technical enablement. With 15+ years in software engineering and 5+ in engineering management, I specialize in scaling teams, driving cross-functional initiatives, and leveraging AI and automation to improve delivery and operational visibility. I also served as a part-time professor at Central Philippine University, teaching software component design and web application development.",
  location: "Metro Manila, Philippines",
  email: "scatalinio@gmail.com",
  phone: "+63 918 967 4550",
  resumeHeadline:
    "Senior Software Engineering Manager @ GlobalTek PH | ReactJS, TypeScript, NodeJS, AWS | AI, LLMs, Agentic Systems | People Management, Resource Allocation, Software Engineering | Engineering Management",
  resumeLocation: "National Capital Region",
  website: "https://www.srilan.info",
  socials: {
    linkedin: "https://www.linkedin.com/in/srilan-catalinio",
    github: "https://github.com/srilan",
  },
  skills: [
    "Engineering Management",
    "People Management",
    "Resource Allocation",
    "ReactJS",
    "React Native",
    "TypeScript",
    "Node.js",
    "Next.js",
    "AWS",
    "AWS Bedrock",
    "LLMs & Agentic Systems",
    "AI-assisted Engineering",
    "Cloud Computing",
    "Microfrontends",
    "Microservices",
    "Java",
    "C# .NET",
    "PHP / Laravel",
    "Python",
    "Mentorship",
  ],
  skillGroups: [
    {
      title: "Engineering Leadership",
      items: [
        "Engineering Management",
        "People Management",
        "Technical Leadership",
        "Team Building",
        "Mentorship",
        "Resource Allocation",
        "Cross-Functional Leadership",
        "Stakeholder Management",
        "Agile Methodologies",
        "Recruitment & Hiring",
      ],
    },
    {
      title: "Frontend & Mobile",
      items: [
        "ReactJS",
        "React Native",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Microfrontends",
      ],
    },
    {
      title: "Backend & Cloud",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "AWS",
        "Cloud Computing",
        "Microservices",
        "Java",
        "C# .NET",
        "PHP / Laravel",
        "Python",
      ],
    },
    {
      title: "AI & Automation",
      items: [
        "AWS Bedrock",
        "LLMs & Agentic Systems",
        "AI-assisted Engineering",
        "Prompt Engineering",
        "Claude Code",
        "Cursor AI",
      ],
    },
  ],
  languages: [
    { name: "English", level: "Full Professional" },
    { name: "Filipino", level: "Native or Bilingual" },
    { name: "Japanese", level: "Limited Working" },
  ],
  education: [
    {
      school: "Central Philippine University",
      degree: "Bachelor of Science in Software Engineering",
      start: "2005",
      end: "2009",
    },
  ],
  mentorship: [
    {
      title: "IT-Academy — Internship & Bootcamp Program",
      org: "GlobalTek BPO Inc.",
      period: "2023 — Present",
      bullets: [
        "Founded and run an internship + bootcamp program that has trained 6+ generations of interns into production-ready engineers.",
        "Designed the curriculum (React, Node.js, TypeScript, AWS, AI-assisted engineering) and the assessment rubric used for intern progression.",
        "Recruit from multiple Philippine universities and partner with academic institutions to expand the talent pipeline.",
      ],
    },
    {
      title: "Part-time Professor — Software Engineering",
      org: "Central Philippine University",
      period: "Jul 2021 — May 2023",
      bullets: [
        "Taught Software Component Design, OOP, Design Patterns, and Software Design Principles to undergraduate students.",
        "Taught Web Application Development (HTML, CSS, JavaScript) and API Development with Node.js and React.",
        "Mentored students on capstone projects bridging classroom theory and industry practice.",
      ],
    },
    {
      title: "1:1 Mentorship & Career Coaching",
      org: "Across roles",
      period: "Ongoing",
      bullets: [
        "Mentor engineers across all levels — from interns to senior ICs stepping into tech-lead and management tracks.",
        "Run regular 1:1s focused on technical growth, career planning, and navigating cross-functional collaboration.",
        "Coach team leads on people management, performance conversations, and resource allocation.",
      ],
    },
  ],
} as const;

export type Profile = typeof profile;
