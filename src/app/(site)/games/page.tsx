import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Games",
  description: "A small arcade — built for fun.",
};

const GAMES = [
  {
    slug: "snake",
    title: "Snake",
    tagline: "The classic. Eat. Grow. Don't crash.",
    accent: "#10b981",
    bg: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
    emoji: "🐍",
  },
  {
    slug: "merge",
    title: "Merge Game",
    tagline: "Drop. Combine. Ascend the corporate ladder — or summon an AI god.",
    accent: "#d946ef",
    bg: "linear-gradient(135deg, #1a0b2e 0%, #0f172a 100%)",
    emoji: "🍉",
  },
];

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-8">
      <header className="mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
          Games
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          A little <span className="text-gradient-brand">arcade</span>.
        </h1>
        <p className="text-lg text-[var(--color-fg-soft)] max-w-xl leading-relaxed">
          Built for fun in between projects. Two games, no pressure — pick your
          poison.
        </p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2">
        {GAMES.map((g, i) => (
          <Reveal key={g.slug} delay={i * 80}>
            <li>
              <Link
                href={`/games/${g.slug}`}
                className="group relative block overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: g.bg,
                  borderColor: `color-mix(in srgb, ${g.accent} 30%, var(--color-border))`,
                }}
              >
                <div className="aspect-[16/10] relative flex items-center justify-center">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 70% 30%, ${g.accent}55 0%, transparent 60%)`,
                    }}
                  />
                  <div className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <span className="relative text-7xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-110">
                    {g.emoji}
                  </span>
                </div>
                <div className="p-5 bg-black/20 backdrop-blur-sm">
                  <div className="flex items-baseline justify-between gap-3">
                    <p
                      className="font-semibold tracking-tight text-lg"
                      style={{ color: "white" }}
                    >
                      {g.title}
                    </p>
                    <span
                      className="text-xs font-mono uppercase tracking-widest"
                      style={{ color: g.accent }}
                    >
                      play →
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{g.tagline}</p>
                </div>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>

      <p className="mt-10 text-sm text-[var(--color-muted)] text-center">
        Got a game idea? <Link href="/contact" className="link">tell me</Link>.
      </p>
    </div>
  );
}
