// Merge game theme definitions.
// Each theme is a chain of levels (level 0 = smallest, level N = biggest).
// Adding a new theme: add an entry to THEMES with its levels array.
// Drop a PNG at /public/games/sprites/<themeId>/<level>.png to use a real
// sprite instead of the emoji fallback.

export type MergeLevel = {
  name: string;
  emoji: string;
  // Two-stop gradient that paints the ball
  gradient: [string, string];
  // Optional sprite path (PNG/SVG) — overrides the emoji+gradient look
  sprite?: string;
};

export type MergeTheme = {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  // First N levels are spawnable from the top — bigger ones only result
  // from merges. 5 is a good Suika-style default.
  spawnableLevels: number;
  // Pixel radius per level (level 0 = smallest)
  radii: number[];
  // Score awarded on each successful merge of two `level` items
  scorePerLevel: number[];
  // Background gradient for the play area
  bg: [string, string];
  // Wall / accent color
  accent: string;
  levels: MergeLevel[];
};

const RADII_DEFAULT = [
  18, 24, 30, 38, 46, 56, 68, 80, 92, 104, 118, 132,
];

const SCORE_DEFAULT = [
  1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78,
];

export const THEMES: Record<string, MergeTheme> = {
  corporate: {
    id: "corporate",
    title: "Promotion Simulator",
    subtitle: "Merge interns into billionaires.",
    blurb:
      "A corporate ladder ascension. Drop interns. Watch them merge their way up the org chart until they retire as LinkedIn influencers.",
    spawnableLevels: 5,
    radii: RADII_DEFAULT,
    scorePerLevel: SCORE_DEFAULT,
    bg: ["#0c1424", "#1e293b"],
    accent: "#38bdf8",
    levels: [
      { name: "Intern", emoji: "🧑‍💻", gradient: ["#94a3b8", "#64748b"] },
      { name: "Junior Developer", emoji: "👨‍💻", gradient: ["#7dd3fc", "#0ea5e9"] },
      { name: "Developer", emoji: "🧑‍💻", gradient: ["#34d399", "#059669"] },
      { name: "Senior Developer", emoji: "🧙‍♂️", gradient: ["#a78bfa", "#7c3aed"] },
      { name: "Tech Lead", emoji: "👨‍🏫", gradient: ["#fbbf24", "#d97706"] },
      { name: "Engineering Manager", emoji: "🧑‍💼", gradient: ["#fb7185", "#e11d48"] },
      { name: "Director", emoji: "🕴️", gradient: ["#f472b6", "#be185d"] },
      { name: "VP", emoji: "👔", gradient: ["#c084fc", "#9333ea"] },
      { name: "CTO", emoji: "🧠", gradient: ["#22d3ee", "#0891b2"] },
      { name: "CEO", emoji: "👑", gradient: ["#facc15", "#ca8a04"] },
      { name: "Billionaire Founder", emoji: "🚀", gradient: ["#fb923c", "#ea580c"] },
      { name: "Retired LinkedIn Influencer", emoji: "💼", gradient: ["#fde047", "#a16207"] },
    ],
  },

  "ai-slop": {
    id: "ai-slop",
    title: "AI Slop Merge",
    subtitle: "Merge generations of AI content.",
    blurb:
      "From stick figures to GPU overlords. Watch the AI evolution unfold in your hands. Pray you don't summon the Artificial God.",
    spawnableLevels: 5,
    radii: RADII_DEFAULT,
    scorePerLevel: SCORE_DEFAULT,
    bg: ["#1a0b2e", "#0f172a"],
    accent: "#d946ef",
    levels: [
      { name: "Stick Figure", emoji: "🚶", gradient: ["#e2e8f0", "#94a3b8"] },
      { name: "Stock Photo Human", emoji: "🧍", gradient: ["#fde68a", "#f59e0b"] },
      { name: "AI Influencer", emoji: "💁", gradient: ["#fda4af", "#f43f5e"] },
      { name: "AI VTuber", emoji: "🦊", gradient: ["#c4b5fd", "#8b5cf6"] },
      { name: "AI Guru", emoji: "🧘", gradient: ["#67e8f9", "#06b6d4"] },
      { name: "AI Startup Founder", emoji: "🦄", gradient: ["#f0abfc", "#d946ef"] },
      { name: "AI Agent", emoji: "🤖", gradient: ["#7dd3fc", "#0284c7"] },
      { name: "AI Agent Managing AI Agents", emoji: "🧠", gradient: ["#a78bfa", "#6d28d9"] },
      { name: "Artificial God", emoji: "👁️", gradient: ["#fde047", "#eab308"] },
      { name: "GPU Overlord", emoji: "💎", gradient: ["#22d3ee", "#7c3aed"] },
      { name: "Singularity", emoji: "🌌", gradient: ["#f0abfc", "#1e1b4b"] },
      { name: "Heat Death", emoji: "☠️", gradient: ["#0f172a", "#f43f5e"] },
    ],
  },
};

export const THEME_LIST = Object.values(THEMES);
export const DEFAULT_THEME_ID = "corporate";
