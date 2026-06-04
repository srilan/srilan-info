import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t mt-24">
      <div className="mx-auto max-w-3xl px-6 py-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-[var(--color-muted)]">
        <p>
          © {year} {profile.name}
        </p>
        <div className="flex gap-4">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-[var(--color-fg)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-[var(--color-fg)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-[var(--color-fg)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
