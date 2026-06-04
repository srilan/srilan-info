export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string | "Present";
  location?: string;
  summary: string;
  highlights: string[];
  stack?: string[];
};

export const experience: Experience[] = [
  {
    company: "GlobalTek BPO Inc.",
    role: "Senior Software Engineering Manager",
    start: "Jul 2025",
    end: "Present",
    location: "Makati, Philippines",
    summary:
      "Lead multiple engineering, R&D, and support teams responsible for internal platforms, AI-driven automation, operational tooling, technical support, and engineering enablement across the organization.",
    highlights: [
      "Manage and mentor cross-functional engineering and support teams, aligning technical execution with business goals while improving delivery efficiency, collaboration, and operational visibility.",
      "Direct development of internal platforms, dashboards, automations, integrations, exporters, and migration initiatives that improved productivity, reduced operational costs, and streamlined workflows.",
      "Lead AI-driven engineering initiatives utilizing AWS Bedrock, LLMs, and agentic systems to automate repetitive processes, improve knowledge accessibility, and accelerate engineering and support operations.",
      "Oversee R&D efforts evaluating and implementing emerging technologies, AI-assisted workflows, and greenfield engineering solutions.",
      "Spearheaded internal projects including AI-assisted testing tools, onboarding systems, UAT tooling, transcription platforms, project management dashboards, and AI-powered ticket management integrations.",
      "Promote a culture of continuous improvement, technical ownership, innovation, and AI-assisted engineering adoption across teams.",
      "Contribute to hiring, organizational growth, resource planning, and the continued expansion of the Philippine engineering organization.",
    ],
    stack: ["AWS Bedrock", "LLMs", "Agentic Systems", "ReactJS", "TypeScript", "Node.js"],
  },
  {
    company: "GlobalTek BPO Inc.",
    role: "Software Engineering Manager",
    start: "Oct 2023",
    end: "Jul 2025",
    location: "Makati, Philippines",
    summary:
      "Managed and led a team of software engineers and interns based in the Philippines, providing technical guidance, mentorship, and career development while collaborating with global cross-functional teams.",
    highlights: [
      "Collaborated with global teams (Applications Engineering, Product Management, QA) to define project requirements and timelines.",
      "Spearheaded recruitment and selection of new team members, aligning hires with company values and culture.",
      "IT-Academy: ran bootcamps to upskill interns, led recruitment from multiple universities, designed training programs, and expanded partnerships with new academic institutions.",
      "Led an AI-integrated multi-purpose testing suite, a governance project to streamline internal processes, and an internal app plugin.",
      "Led a large-scale migration spanning 20 projects and 28,000+ tickets into Jira.",
      "Built a high-performing tech team focused on innovation and impactful project delivery.",
    ],
    stack: ["ReactJS", "TypeScript", "Node.js", "AWS", "Jira"],
  },
  {
    company: "Comfac Technology Options",
    role: "Software Development Manager",
    start: "Apr 2022",
    end: "Aug 2023",
    location: "Philippines",
    summary:
      "Led training, mobile and microfrontend development, and performance management for the engineering team.",
    highlights: [
      "Conducted training on React JS and React Native.",
      "Built starter apps to serve as templates for future React JS and React Native projects.",
      "Developed mobile applications from scratch and maintained existing CRM apps using React Native and NativeScript.",
      "Migrated mobile apps from NativeScript to React Native.",
      "Developed microfrontends with React + Single SPA, plus custom middlewares.",
      "Ran performance appraisals and Scrum delivery cadence.",
    ],
    stack: ["ReactJS", "React Native", "NativeScript", "Express", "TypeScript", "Single SPA"],
  },
  {
    company: "Comfac Technology Options",
    role: "Senior Full Stack Engineer",
    start: "Nov 2021",
    end: "May 2022",
    location: "Philippines",
    summary:
      "Built microfrontends and microservices, ran integration spikes, and led a small team of developers.",
    highlights: [
      "Developed MFEs and microservices.",
      "Ran spikes for ArcGIS and OpenWeatherMaps API integration.",
      "Led a team of 3 developers.",
    ],
    stack: ["React", "Microfrontends", "Microservices", "TypeScript"],
  },
  {
    company: "Central Philippine University",
    role: "Part-time Professor",
    start: "Jul 2021",
    end: "May 2023",
    location: "Iloilo, Philippines",
    summary:
      "Taught software engineering and web application courses to undergraduate students alongside industry work.",
    highlights: [
      "Software Component Design, Design Patterns, OOP, Software Design Principles.",
      "Web Applications Development, HTML, CSS, JavaScript.",
      "API Development, Node.js, React.",
    ],
    stack: ["Teaching", "Mentorship", "Curriculum Design"],
  },
  {
    company: "AXIS Co. LTD.",
    role: "Software Engineer",
    start: "Jul 2017",
    end: "Jan 2022",
    location: "Osaka & Tottori, Japan",
    summary:
      "Worked on a wide range of client projects, mostly with pharmaceutical firms, deployed on-site to gather requirements and deliver systems end-to-end.",
    highlights: [
      "Sales Management System — C# .NET (MVC), PostgreSQL, JavaScript.",
      "Reporting System — PHP (Laravel), ReactJS, MySQL.",
      "AI Development for Health Science — Python 3, scikit-learn, SageMaker.",
      "Mobile prototypes and an e-commerce app in React Native, used as base code for future projects.",
      "Manufacturing project — Java EE / Spring Boot; worked directly with the Japanese client on requirements, change requests, unit tests, and staging/production deployments.",
    ],
    stack: ["ReactJS", "React Native", "TypeScript", "C#", "PHP", "Java", "Python", "Oracle"],
  },
  {
    company: "AXIS Software Development PHL., Inc. / AXIS Co. LTD.",
    role: "Senior Software Engineer / Team Leader",
    start: "Apr 2016",
    end: "Jan 2022",
    location: "Osaka, Japan",
    summary:
      "Led a team of software engineers building enterprise systems with the Java ecosystem; established architecture and CI/CD practices.",
    highlights: [
      "Delivered Appraisal System, Translation App, and Project Management System projects.",
      "Established the architecture and enabled the team to adopt new technologies.",
      "Set up CI/CD to automate builds and deployments to staging and production.",
    ],
    stack: ["Java EE", "Struts2", "Spring", "Hibernate", "jQuery", "Bootstrap"],
  },
  {
    company: "Oracle",
    role: "Applications Engineer",
    start: "Feb 2013",
    end: "Apr 2016",
    location: "BGC, Philippines",
    summary:
      "Part of the development team for WAM versions 1 and 2.",
    highlights: [
      "Contributed to feature delivery across two major versions of the WAM product.",
    ],
  },
  {
    company: "Smart Communications, Inc.",
    role: "Software Development Analyst",
    start: "Mar 2011",
    end: "Feb 2013",
    location: "Makati, Philippines",
    summary:
      "Software development analyst working on telecommunications systems and internal applications.",
    highlights: [],
  },
  {
    company: "1150 Technologies, Inc.",
    role: "Jr. Java Developer",
    start: "Sep 2010",
    end: "Mar 2011",
    location: "Mandaluyong, Philippines",
    summary: "Junior Java developer — first professional engineering role.",
    highlights: [],
  },
];
