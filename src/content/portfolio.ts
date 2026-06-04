export type ProjectTheme = {
  // CSS color values — used as inline style vars on the project's pages/cards
  accent: string; // primary brand
  accentFg: string; // foreground text on accent
  tint: string; // soft tinted background for cards / hero
  glow: string; // radial glow used in hero panels
  ink: string; // ink color used inside the hero panel
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  url?: string;
  repo?: string;
  status: "live" | "prototype" | "private" | "sunset";
  tech: string[];
  highlights: string[];
  year: string;
  theme: ProjectTheme;
  // Optional override: drop a PNG/JPG at /public/portfolio/<slug>.png
  // and set this to the same path to use a real screenshot instead of
  // the generated branded hero panel.
  screenshot?: string;
};

export const projects: Project[] = [
  {
    slug: "lotto-ph-info",
    title: "Lotto PH Info",
    tagline: "Philippine lottery results, fast.",
    description:
      "A clean, fast reference for Philippine Charity Sweepstakes Office (PCSO) lottery results — built so visitors can check the latest draw without ads or noise.",
    url: "https://lottoph.info",
    repo: "https://github.com/srilan/lotto",
    status: "live",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Live results for major PCSO draws",
      "Mobile-first, ad-free reading experience",
      "Static-first delivery for fast loads",
    ],
    year: "2025",
    theme: {
      accent: "#dc2626",
      accentFg: "#ffffff",
      tint: "rgba(220, 38, 38, 0.08)",
      glow: "rgba(251, 191, 36, 0.35)",
      ink: "#fef2f2",
    },
  },
  {
    slug: "buhay-pinoy",
    title: "Buhay Pinoy",
    tagline: "Stories and resources for life in the Philippines.",
    description:
      "A content-driven site celebrating Filipino life — stories, guides, and resources crafted with a focus on readability and an authentic voice.",
    url: "https://buhaypinoy.online",
    repo: "https://github.com/srilan/buhaypinoy",
    status: "live",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Editorial-grade typography",
      "SEO-optimized content structure",
      "Responsive across devices",
    ],
    year: "2026",
    theme: {
      accent: "#0ea5e9",
      accentFg: "#ffffff",
      tint: "rgba(14, 165, 233, 0.08)",
      glow: "rgba(56, 189, 248, 0.35)",
      ink: "#f0f9ff",
    },
  },
  {
    slug: "tcg-overdrive",
    title: "TCG Overdrive",
    tagline: "An e-commerce store for trading card collectors.",
    description:
      "A full-featured e-commerce platform for trading card games — product catalog, search, cart, and checkout. Built end-to-end as a developer-first project.",
    url: "https://tcgoverdrive.com",
    repo: "https://github.com/srilan/mana-market-magic",
    status: "private",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    highlights: [
      "Product catalog with search & filters",
      "Cart & checkout flow",
      "Inventory management",
    ],
    year: "2025",
    theme: {
      accent: "#7c3aed",
      accentFg: "#ffffff",
      tint: "rgba(124, 58, 237, 0.08)",
      glow: "rgba(167, 139, 250, 0.35)",
      ink: "#f5f3ff",
    },
  },
  {
    slug: "paykita",
    title: "PayKita",
    tagline: "A prototype for a new payment platform.",
    description:
      "An experimental prototype exploring what a modern, locally-aware payment platform could look like — focused on UX, account flows, and money movement primitives.",
    url: "https://paykita.online",
    repo: "https://github.com/srilan/kita-ph",
    status: "prototype",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Onboarding & KYC flow design",
      "Send/receive UX prototype",
      "Local-first design language",
    ],
    year: "2025",
    theme: {
      accent: "#10b981",
      accentFg: "#022c22",
      tint: "rgba(16, 185, 129, 0.08)",
      glow: "rgba(52, 211, 153, 0.35)",
      ink: "#ecfdf5",
    },
  },
  {
    slug: "url-shortener",
    title: "URL Shortener",
    tagline: "A custom URL shortener built on Vercel.",
    description:
      "A self-hosted URL shortener as an experiment in low-latency redirects and short-link UX. Originally hosted on a custom domain — sunset when the domain renewal got too expensive, but the app still runs on the default Vercel URL.",
    url: "https://my-shortener.vercel.app/",
    status: "sunset",
    tech: ["Next.js", "TypeScript", "Vercel"],
    highlights: [
      "Custom slug generation and redirect handling",
      "Edge-deployed for fast redirects",
      "Sunset due to domain renewal cost — service still functional",
    ],
    year: "2024",
    theme: {
      accent: "#f59e0b",
      accentFg: "#1c1917",
      tint: "rgba(245, 158, 11, 0.08)",
      glow: "rgba(252, 211, 77, 0.35)",
      ink: "#fffbeb",
    },
  },
  {
    slug: "football-manager",
    title: "Football Manager",
    tagline: "A browser-based football management game.",
    description:
      "A web-based football management game prototype — squad management, match simulation, and progression. Currently in a broken state while the game logic is being reworked, but the UI shell remains live.",
    url: "https://foot-manager-mocha.vercel.app/",
    status: "sunset",
    tech: ["Next.js", "TypeScript", "Vercel"],
    highlights: [
      "Squad management and lineup configuration",
      "Match simulation logic prototype",
      "Currently broken — preserved as a learning artifact",
    ],
    year: "2024",
    theme: {
      accent: "#16a34a",
      accentFg: "#ffffff",
      tint: "rgba(22, 163, 74, 0.08)",
      glow: "rgba(74, 222, 128, 0.4)",
      ink: "#f0fdf4",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
