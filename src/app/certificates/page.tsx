import type { Metadata } from "next";
import { certificates } from "@/content/certificates";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Professional certifications and credentials.",
};

const PALETTE = [
  { color: "var(--color-amber)", tint: "color-mix(in srgb, var(--color-amber) 14%, transparent)" },
  { color: "var(--color-rose)", tint: "color-mix(in srgb, var(--color-rose) 14%, transparent)" },
  { color: "var(--color-fuchsia)", tint: "color-mix(in srgb, var(--color-fuchsia) 14%, transparent)" },
  { color: "var(--color-emerald)", tint: "color-mix(in srgb, var(--color-emerald) 14%, transparent)" },
  { color: "var(--color-cyan)", tint: "color-mix(in srgb, var(--color-cyan) 14%, transparent)" },
  { color: "var(--color-indigo)", tint: "color-mix(in srgb, var(--color-indigo) 14%, transparent)" },
];

export default function CertificatesPage() {
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
          Professional certifications and credentials.
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
        <ul className="grid gap-4 sm:grid-cols-2">
          {certificates.map((cert, i) => {
            const tone = PALETTE[i % PALETTE.length];
            return (
              <Reveal key={`${cert.title}-${i}`} delay={i * 60}>
                <li
                  className="surface p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: `color-mix(in srgb, ${tone.color} 30%, var(--color-border))`,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute -top-12 -right-12 h-32 w-32 rounded-full"
                    style={{ background: tone.tint, filter: "blur(20px)" }}
                  />
                  <div className="relative flex items-start gap-4">
                    <span
                      aria-hidden
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        background: tone.tint,
                        color: tone.color,
                        border: `1px solid color-mix(in srgb, ${tone.color} 25%, transparent)`,
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
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
                      <h2 className="font-semibold tracking-tight leading-snug">
                        {cert.title}
                      </h2>
                      <p className="text-sm text-[var(--color-fg-soft)] mt-1">
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
            );
          })}
        </ul>
      )}
    </div>
  );
}
