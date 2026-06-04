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
} as const;

export type Profile = typeof profile;
