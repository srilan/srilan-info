import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/portfolio";
import { Reveal } from "@/components/Reveal";
import { ProjectHero } from "@/components/ProjectHero";
import { Chip } from "@/components/Chip";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected projects and personal work.",
};

const STATUS_LABELS: Record<string, string> = {
  live: "Live",
  prototype: "Prototype",
  private: "Developer only",
  sunset: "Sunset",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-8">
      <header className="mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
          Portfolio
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Things I've <span className="text-gradient-brand">shipped</span>.
        </h1>
        <p className="text-lg text-[var(--color-fg-soft)] max-w-xl leading-relaxed">
          Products, prototypes, and side projects — each card is themed after
          its app's identity.
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 80}>
            <li>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group relative block overflow-hidden rounded-2xl border bg-[var(--color-bg-elev)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={
                  {
                    "--project-accent": project.theme.accent,
                  } as React.CSSProperties
                }
              >
                <ProjectHero project={project} />
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <h2 className="text-lg font-semibold tracking-tight">
                      {project.title}
                    </h2>
                    <span className="text-xs text-[var(--color-muted)] tabular-nums">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-fg-soft)] mb-4 leading-relaxed">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Chip key={t} label={t} size="sm" />
                    ))}
                  </div>
                </div>
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: project.theme.accent }}
                />
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
