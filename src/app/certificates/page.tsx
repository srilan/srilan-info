import type { Metadata } from "next";
import {
  certificates,
  GROUP_META,
  type CertificateGroup,
} from "@/content/certificates";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Professional certifications and credentials.",
};

export default function CertificatesPage() {
  // Preserve insertion order of groups as they first appear
  const groupOrder: CertificateGroup[] = [];
  for (const cert of certificates) {
    if (!groupOrder.includes(cert.group)) groupOrder.push(cert.group);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-8">
      <header className="mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
          Certificates
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          <span className="text-gradient-brand">Always</span> learning.
        </h1>
        <p className="text-lg text-[var(--color-fg-soft)] max-w-xl leading-relaxed">
          Professional certifications and credentials, grouped by issuer.
        </p>
      </header>

      {certificates.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-[var(--color-muted)]">
            Certificates coming soon. Add entries in{" "}
            <code className="font-mono text-sm">
              src/content/certificates.ts
            </code>
            .
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {groupOrder.map((group, gi) => {
            const meta = GROUP_META[group];
            const items = certificates.filter((c) => c.group === group);
            return (
              <Reveal key={group} delay={gi * 80}>
                <section
                  className="relative rounded-2xl border overflow-hidden"
                  style={{
                    borderColor: `color-mix(in srgb, ${meta.color} 30%, var(--color-border))`,
                    background: meta.tint,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute -top-20 -right-20 h-56 w-56 rounded-full"
                    style={{
                      background: meta.color,
                      opacity: 0.18,
                      filter: "blur(40px)",
                    }}
                  />

                  <header
                    className="relative px-6 sm:px-8 pt-6 pb-5 border-b flex items-baseline justify-between gap-4 flex-wrap"
                    style={{
                      borderColor: `color-mix(in srgb, ${meta.color} 20%, var(--color-border))`,
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg font-bold text-sm tracking-tight"
                          style={{
                            background: meta.color,
                            color: "white",
                          }}
                        >
                          {meta.label}
                        </span>
                        <h2 className="text-xl font-semibold tracking-tight">
                          {meta.fullName}
                        </h2>
                      </div>
                      <p className="mt-2 text-sm text-[var(--color-fg-soft)]">
                        {meta.description}
                      </p>
                    </div>
                    <span
                      className="text-xs font-medium tabular-nums px-2.5 py-1 rounded-full"
                      style={{
                        background: meta.color,
                        color: "white",
                      }}
                    >
                      {items.length}{" "}
                      {items.length === 1 ? "credential" : "credentials"}
                    </span>
                  </header>

                  <ul className="relative grid gap-4 sm:grid-cols-2 p-6 sm:p-8">
                    {items.map((cert, i) => (
                      <Reveal key={`${cert.title}-${i}`} delay={i * 50}>
                        <li
                          className="rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
                          style={{
                            background: "var(--color-bg-elev)",
                            borderColor: `color-mix(in srgb, ${meta.color} 22%, var(--color-border))`,
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              aria-hidden
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
                              style={{
                                background: meta.tint,
                                color: meta.color,
                                border: `1px solid color-mix(in srgb, ${meta.color} 30%, transparent)`,
                              }}
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
                              >
                                <circle cx="12" cy="8" r="6" />
                                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                              </svg>
                            </span>
                            <div className="min-w-0">
                              <h3 className="font-semibold tracking-tight leading-snug">
                                {cert.title}
                              </h3>
                              <p className="text-sm text-[var(--color-muted)] mt-1">
                                {cert.issuer}
                              </p>
                              {cert.date && (
                                <p className="text-xs text-[var(--color-muted)] mt-2 tabular-nums">
                                  {cert.date}
                                </p>
                              )}
                              {cert.url && (
                                <a
                                  href={cert.url}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="inline-block mt-3 text-sm link"
                                >
                                  View credential →
                                </a>
                              )}
                            </div>
                          </div>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                </section>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
