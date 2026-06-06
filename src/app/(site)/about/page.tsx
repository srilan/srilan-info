import Link from "next/link";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/portfolio";
import { Reveal } from "@/components/Reveal";
import { ProjectHero } from "@/components/ProjectHero";
import { Chip } from "@/components/Chip";

const STATS = [
  {
    value: "15+",
    label: "Years engineering",
    tint: "color-mix(in srgb, var(--color-indigo) 14%, transparent)",
    color: "var(--color-indigo)",
  },
  {
    value: "5+",
    label: "Years leading teams",
    tint: "color-mix(in srgb, var(--color-fuchsia) 14%, transparent)",
    color: "var(--color-fuchsia)",
  },
  {
    value: "20+",
    label: "Team members led",
    tint: "color-mix(in srgb, var(--color-amber) 14%, transparent)",
    color: "var(--color-amber)",
  },
  {
    value: "6+",
    label: "Generations of Interns mentored",
    tint: "color-mix(in srgb, var(--color-emerald) 14%, transparent)",
    color: "var(--color-emerald)",
  },
];

export default function HomePage() {
  const featured = projects.slice(0, 4);
  const recentRole = experience[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid pointer-events-none" />
        {/* color blobs */}
        <div
          aria-hidden
          className="blob animate-float"
          style={{
            top: "-80px",
            left: "-60px",
            width: "360px",
            height: "360px",
            background: "var(--color-indigo)",
          }}
        />
        <div
          aria-hidden
          className="blob animate-float"
          style={{
            top: "40px",
            right: "-100px",
            width: "320px",
            height: "320px",
            background: "var(--color-fuchsia)",
            animationDelay: "-4s",
          }}
        />
        <div
          aria-hidden
          className="blob animate-float"
          style={{
            top: "260px",
            left: "30%",
            width: "260px",
            height: "260px",
            background: "var(--color-amber)",
            animationDelay: "-8s",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-16">
          <div className="animate-fade-up">
            <span className="pill">
              <span className="pill-dot" />
              Open to leadership opportunities
            </span>
            <h1 className="mt-6 text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.02]">
              <span className="text-gradient-brand">{profile.name}</span>
            </h1>
            <p className="mt-5 text-xl sm:text-2xl text-[var(--color-fg)] font-medium tracking-tight max-w-2xl">
              {profile.headline}
            </p>
            <p className="mt-2 text-base text-[var(--color-muted)]">
              {profile.location}
            </p>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--color-fg-soft)] max-w-2xl">
              {profile.about}
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <Link href="/portfolio" className="btn-primary">
                View portfolio
                <span aria-hidden>→</span>
              </Link>
              <Link href="/experience" className="btn-ghost">
                Experience
              </Link>
              <a
                href="/api/resume"
                download="Catalinio-CV.pdf"
                className="btn-ghost"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M12 18v-6" />
                  <path d="m9 15 3 3 3-3" />
                </svg>
                Download resume
              </a>
              <a href={`mailto:${profile.email}`} className="btn-ghost">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                Email me
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        {/* Stats */}
        <Reveal>
          <section className="pb-14">
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <li
                  key={s.label}
                  className="stat-card"
                  style={{ "--card-tint": s.tint } as React.CSSProperties}
                >
                  <p
                    className="text-3xl font-semibold tracking-tight"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-muted)] leading-snug">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section className="py-14 divider-soft">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Currently
              </h2>
              <Link href="/experience" className="text-sm link">
                Full timeline →
              </Link>
            </div>
            {recentRole && (
              <div
                className="surface p-6 relative overflow-hidden"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--color-indigo) 30%, var(--color-border))",
                }}
              >
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 h-56 w-56 rounded-full"
                  style={{
                    background: "var(--color-indigo)",
                    opacity: 0.08,
                    filter: "blur(40px)",
                  }}
                />
                <div className="relative flex items-baseline justify-between gap-4 flex-wrap">
                  <p className="text-base">
                    <span className="font-semibold">{recentRole.role}</span>
                    <span className="text-[var(--color-muted)]"> · </span>
                    <span className="font-medium">{recentRole.company}</span>
                  </p>
                  <p className="text-sm text-[var(--color-muted)] tabular-nums">
                    {recentRole.start} — {recentRole.end}
                  </p>
                </div>
                <p className="relative mt-3 leading-relaxed text-[var(--color-fg-soft)]">
                  {recentRole.summary}
                </p>
                {recentRole.stack && (
                  <div className="relative mt-4 flex flex-wrap gap-2">
                    {recentRole.stack.map((s) => (
                      <Chip key={s} label={s} size="sm" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </Reveal>

        <Reveal>
          <section className="py-14 divider-soft">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Selected work
              </h2>
              <Link href="/portfolio" className="text-sm link">
                All projects →
              </Link>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {featured.map((project, i) => (
                <Reveal key={project.slug} delay={i * 60}>
                  <li>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="group block overflow-hidden rounded-xl border bg-[var(--color-bg-elev)] hover:-translate-y-0.5 transition-all duration-300"
                      style={
                        {
                          "--project-accent": project.theme.accent,
                        } as React.CSSProperties
                      }
                    >
                      <ProjectHero project={project} />
                      <div className="p-5">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="font-semibold tracking-tight">
                            {project.title}
                          </p>
                          <span className="text-xs text-[var(--color-muted)] tabular-nums">
                            {project.year}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-[var(--color-muted)] line-clamp-2">
                          {project.tagline}
                        </p>
                      </div>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section className="py-14 divider-soft">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6">
              Skills & focus areas
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Chip key={skill} label={skill} />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="py-14 divider-soft grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6">
                Education
              </h2>
              <ul className="space-y-4">
                {profile.education.map((edu) => (
                  <li key={edu.school} className="surface p-5">
                    <p className="font-semibold tracking-tight">{edu.degree}</p>
                    <p className="text-sm text-[var(--color-fg-soft)] mt-1">
                      {edu.school}
                    </p>
                    <p className="text-sm text-[var(--color-muted)] tabular-nums mt-1">
                      {edu.start} — {edu.end}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6">
                Languages
              </h2>
              <ul className="space-y-3">
                {profile.languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-baseline justify-between border-b border-dashed pb-3 last:border-0"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-sm text-[var(--color-muted)]">
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Bored? play a game */}
        <Reveal>
          <section className="pt-14">
            <Link
              href="/games"
              className="group relative block overflow-hidden rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--color-emerald) 12%, var(--color-bg-elev)), color-mix(in srgb, var(--color-fuchsia) 12%, var(--color-bg-elev)))",
                borderColor:
                  "color-mix(in srgb, var(--color-fuchsia) 40%, var(--color-border))",
              }}
            >
              <div
                aria-hidden
                className="absolute -top-12 -right-12 h-40 w-40 rounded-full"
                style={{
                  background: "var(--color-fuchsia)",
                  opacity: 0.18,
                  filter: "blur(40px)",
                }}
              />
              <div className="relative flex items-center justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                  >
                    🎮
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] font-mono mb-1">
                      Aside
                    </p>
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                      Bored?{" "}
                      <span className="text-gradient-brand">
                        Play a game instead.
                      </span>
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-fg-soft)]">
                      Snake, or a Suika-style merge with two stupid themes.
                    </p>
                  </div>
                </div>
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors group-hover:bg-[var(--color-bg-elev)]"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--color-fuchsia) 40%, var(--color-border))",
                  }}
                >
                  enter the arcade
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </section>
        </Reveal>

        {/* CTA card */}
        <Reveal>
          <section className="py-14">
            <div
              className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-white"
              style={{ background: "var(--hero-gradient)" }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.45) 0%, transparent 50%)",
                }}
              />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  Let's build something together.
                </h2>
                <p className="mt-3 text-white/80 max-w-xl leading-relaxed">
                  I'm always open to interesting engineering leadership roles,
                  collaborations, and conversations about AI-assisted
                  development.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-[var(--color-violet)] font-semibold hover:bg-white/90 transition-colors"
                  >
                    {profile.email}
                  </a>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors"
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
