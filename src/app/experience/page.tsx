import type { Metadata } from "next";
import { experience } from "@/content/experience";
import { Reveal } from "@/components/Reveal";
import { Chip } from "@/components/Chip";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and roles.",
};

const DOT_COLORS = [
  "var(--color-indigo)",
  "var(--color-fuchsia)",
  "var(--color-amber)",
  "var(--color-emerald)",
  "var(--color-rose)",
  "var(--color-cyan)",
  "var(--color-violet)",
];

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-8">
      <header className="mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
          Experience
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          <span className="text-gradient-brand">15+ years</span> building
          software.
          <br />
          <span
            className="block mt-2 text-3xl sm:text-4xl"
            style={{ color: "var(--color-fg-soft)" }}
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--color-fuchsia), var(--color-amber))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              3+ years
            </span>{" "}
            messing with AI.
          </span>
        </h1>
        <p className="text-lg text-[var(--color-fg-soft)] max-w-xl leading-relaxed">
          A timeline of where I've worked, what I built, and what I learned —
          from Java EE in Osaka to AWS Bedrock and agentic systems today.
        </p>
      </header>

      <ol className="relative border-l ml-2">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${i}`} delay={i * 60}>
            <li className="ml-6 pb-12 last:pb-0">
              <span
                className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full ring-4 ring-[var(--color-bg)]"
                style={{
                  background: DOT_COLORS[i % DOT_COLORS.length],
                  boxShadow: `0 0 0 6px color-mix(in srgb, ${DOT_COLORS[i % DOT_COLORS.length]} 18%, transparent)`,
                }}
              />
              <div className="surface p-6">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {job.role}
                    <span className="text-[var(--color-muted)] font-normal">
                      {" · "}
                      {job.company}
                    </span>
                  </h2>
                  <p className="text-sm text-[var(--color-muted)] tabular-nums whitespace-nowrap">
                    {job.start} — {job.end}
                  </p>
                </div>
                {job.location && (
                  <p className="text-sm text-[var(--color-muted)] mt-1">
                    {job.location}
                  </p>
                )}
                <p className="mt-4 leading-relaxed text-[var(--color-fg-soft)]">
                  {job.summary}
                </p>
                {job.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 leading-relaxed text-[var(--color-fg-soft)]"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 rounded-full bg-[var(--color-muted)] flex-shrink-0"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {job.stack && job.stack.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <Chip key={s} label={s} size="sm" />
                    ))}
                  </div>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
