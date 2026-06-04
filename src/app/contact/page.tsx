import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-8">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
          Contact
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Get in <span className="text-gradient-brand">touch</span>.
        </h1>
        <p className="text-lg text-[var(--color-fg-soft)] max-w-xl leading-relaxed">
          The fastest way to reach me is by email. I'm happy to chat about
          interesting projects, collaboration opportunities, or just to say
          hello.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${profile.email}`}
          className="group surface p-6 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-violet) 30%, var(--color-border))",
          }}
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg mb-4"
            style={{
              background:
                "color-mix(in srgb, var(--color-violet) 12%, transparent)",
              color: "var(--color-violet)",
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
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Email
          </p>
          <p className="mt-2 font-semibold tracking-tight break-all">
            {profile.email}
          </p>
        </a>

        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="group surface p-6 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-sky) 30%, var(--color-border))",
          }}
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg mb-4"
            style={{
              background:
                "color-mix(in srgb, var(--color-sky) 12%, transparent)",
              color: "var(--color-sky)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66h-3.55V9h3.4v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
            </svg>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            LinkedIn
          </p>
          <p className="mt-2 font-semibold tracking-tight">
            srilan-catalinio
          </p>
        </a>

        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer noopener"
          className="group surface p-6 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-fuchsia) 30%, var(--color-border))",
          }}
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg mb-4"
            style={{
              background:
                "color-mix(in srgb, var(--color-fuchsia) 12%, transparent)",
              color: "var(--color-fuchsia)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.78.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            GitHub
          </p>
          <p className="mt-2 font-semibold tracking-tight">srilan</p>
        </a>

        <a
          href={`https://wa.me/?text=Hi%20Srilan`}
          className="group surface p-6 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-emerald) 30%, var(--color-border))",
          }}
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg mb-4"
            style={{
              background:
                "color-mix(in srgb, var(--color-emerald) 12%, transparent)",
              color: "var(--color-emerald)",
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Location
          </p>
          <p className="mt-2 font-semibold tracking-tight">{profile.location}</p>
        </a>
      </section>
    </div>
  );
}
