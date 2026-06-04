import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/portfolio";
import { ProjectHero } from "@/components/ProjectHero";
import { Chip } from "@/components/Chip";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

const STATUS_LABELS: Record<string, string> = {
  live: "Live",
  prototype: "Prototype",
  private: "Developer only",
  sunset: "Sunset (still up)",
};

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const themeStyle = {
    "--project-accent": project.theme.accent,
    "--project-accent-fg": project.theme.accentFg,
    "--project-tint": project.theme.tint,
  } as React.CSSProperties;

  return (
    <div style={themeStyle}>
      {/* Tinted top band */}
      <div
        className="relative"
        style={{
          background: `linear-gradient(180deg, var(--project-tint) 0%, transparent 100%)`,
        }}
      >
        <div className="mx-auto max-w-3xl px-6 pt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors mb-8"
          >
            <span aria-hidden>←</span> All projects
          </Link>

          {/* Project hero panel */}
          <div className="rounded-2xl overflow-hidden border shadow-sm">
            <ProjectHero project={project} variant="detail" />
          </div>

          <header className="mt-10 mb-2">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                {project.title}
              </h1>
              <span className="text-sm text-[var(--color-muted)] tabular-nums">
                {project.year}
              </span>
            </div>
            <p className="mt-3 text-lg text-[var(--color-fg-soft)] max-w-2xl">
              {project.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-6 text-sm">
              {project.url && project.status !== "private" && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity"
                  style={{
                    background: "var(--project-accent)",
                    color: "var(--project-accent-fg)",
                  }}
                >
                  Visit site <span aria-hidden>↗</span>
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[var(--color-border-strong)] hover:bg-[var(--color-subtle)] transition-colors"
                >
                  View source
                </a>
              )}
              <span className="pill">
                <span
                  className="pill-dot"
                  style={{
                    background: "var(--project-accent)",
                    boxShadow: `0 0 0 3px color-mix(in srgb, var(--project-accent) 25%, transparent)`,
                  }}
                />
                {STATUS_LABELS[project.status]}
              </span>
            </div>
          </header>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-12 pb-8">
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">
            About
          </h2>
          <p className="leading-relaxed text-[var(--color-fg-soft)] text-lg">
            {project.description}
          </p>
        </section>

        {project.highlights.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">
              Highlights
            </h2>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--project-accent)" }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">
            Tech
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
