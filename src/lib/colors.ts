// Deterministic skill -> chip color class.
// Same skill name always renders in the same color across the site.

const COLORS = [
  "chip-indigo",
  "chip-violet",
  "chip-fuchsia",
  "chip-rose",
  "chip-amber",
  "chip-emerald",
  "chip-cyan",
] as const;

// Hand-picked overrides for well-known stacks
const OVERRIDES: Record<string, (typeof COLORS)[number] | "chip-slate"> = {
  // languages
  typescript: "chip-indigo",
  javascript: "chip-amber",
  python: "chip-cyan",
  java: "chip-rose",
  "c#": "chip-violet",
  "c# .net": "chip-violet",
  php: "chip-violet",
  "php / laravel": "chip-violet",

  // frameworks
  react: "chip-cyan",
  reactjs: "chip-cyan",
  "react native": "chip-cyan",
  "next.js": "chip-slate",
  nextjs: "chip-slate",
  "tailwind css": "chip-cyan",
  "node.js": "chip-emerald",
  nodejs: "chip-emerald",
  express: "chip-slate",
  nativescript: "chip-rose",
  "single spa": "chip-fuchsia",
  microfrontends: "chip-fuchsia",
  microservices: "chip-emerald",

  // cloud & ai
  aws: "chip-amber",
  "aws bedrock": "chip-amber",
  llms: "chip-fuchsia",
  "llms & agentic systems": "chip-fuchsia",
  "agentic systems": "chip-fuchsia",
  "ai-assisted engineering": "chip-fuchsia",
  "cloud computing": "chip-amber",
  stripe: "chip-violet",
  postgresql: "chip-indigo",
  oracle: "chip-rose",
  jira: "chip-indigo",

  // people / soft
  "engineering management": "chip-rose",
  "people management": "chip-rose",
  "resource allocation": "chip-rose",
  mentorship: "chip-rose",
  teaching: "chip-rose",
  "curriculum design": "chip-rose",

  // misc
  "java ee": "chip-rose",
  spring: "chip-emerald",
  hibernate: "chip-emerald",
  struts2: "chip-rose",
  jquery: "chip-cyan",
  bootstrap: "chip-violet",
};

export function chipColorFor(skill: string): string {
  const key = skill.toLowerCase().trim();
  if (OVERRIDES[key]) return OVERRIDES[key];

  // Hash the string to a stable color
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}
