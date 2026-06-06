import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { certificates, GROUP_META } from "@/content/certificates";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume for ${profile.name} — ${profile.headline}.`,
};

const linkedinDisplay = "linkedin.com/in/srilan-catalinio";

export default function ResumePage() {
  const certsByGroup = certificates.reduce<
    Record<string, typeof certificates>
  >((acc, cert) => {
    (acc[cert.group] ||= []).push(cert);
    return acc;
  }, {});

  return (
    <div className="resume-page mx-auto max-w-5xl px-6 pt-12 pb-16">
      {/* Screen-only toolbar */}
      <div className="resume-toolbar flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-1">
            Resume
          </p>
          <p className="text-sm text-[var(--color-fg-soft)]">
            Download a clean PDF — no print dialog, no browser headers.
          </p>
        </div>
        <a href="/api/resume" download="Catalinio-CV.pdf" className="btn-primary">
          Download PDF
          <span aria-hidden>↓</span>
        </a>
      </div>

      <article className="resume-doc">
        {/* Header */}
        <header className="resume-header">
          <h1 className="resume-name">{profile.name.toUpperCase()}</h1>
          <p className="resume-headline">{profile.resumeHeadline}</p>
          <p className="resume-contact">
            <span className="resume-contact-item">
              <span className="resume-contact-icon" aria-hidden>☎</span>
              <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
                {profile.phone}
              </a>
            </span>
            <span className="resume-contact-item">
              <span className="resume-contact-icon" aria-hidden>@</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
            <span className="resume-contact-item">
              <span className="resume-contact-icon" aria-hidden>↗</span>
              <a href={profile.socials.linkedin}>{linkedinDisplay}</a>
            </span>
            <span className="resume-contact-item">
              <span className="resume-contact-icon" aria-hidden>◐</span>
              <a href={profile.website}>srilan.info</a>
            </span>
            <span className="resume-contact-item">
              <span className="resume-contact-icon" aria-hidden>◉</span>
              {profile.resumeLocation}
            </span>
          </p>
        </header>

        <div className="resume-grid">
          {/* LEFT column */}
          <div className="resume-main">
            {/* Summary */}
            <section className="resume-section">
              <h2 className="resume-section-title">Summary</h2>
              <p className="resume-summary">{profile.about}</p>
            </section>

            {/* Experience */}
            <section className="resume-section">
              <h2 className="resume-section-title">Experience</h2>
              <ul className="resume-experience">
                {experience.map((role, i) => (
                  <li
                    key={`${role.company}-${role.start}-${i}`}
                    className="resume-role"
                  >
                    <p className="resume-role-name">{role.role}</p>
                    <p className="resume-role-company">{role.company}</p>
                    <p className="resume-role-meta">
                      <span className="resume-role-icon" aria-hidden>▤</span>
                      <span>
                        {role.start} - {role.end}
                      </span>
                      {role.location && (
                        <>
                          <span className="resume-role-icon" aria-hidden>◉</span>
                          <span>{role.location}</span>
                        </>
                      )}
                    </p>
                    <p className="resume-role-summary">{role.summary}</p>
                    {role.highlights.length > 0 && (
                      <ul className="resume-highlights">
                        {role.highlights.map((h, idx) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* Mentorship & Teaching */}
            <section className="resume-section">
              <h2 className="resume-section-title">Mentorship & Teaching</h2>
              <ul className="resume-experience">
                {profile.mentorship.map((m) => (
                  <li key={m.title} className="resume-role">
                    <p className="resume-role-name">{m.title}</p>
                    <p className="resume-role-company">{m.org}</p>
                    <p className="resume-role-meta">
                      <span className="resume-role-icon" aria-hidden>▤</span>
                      <span>{m.period}</span>
                    </p>
                    <ul className="resume-highlights">
                      {m.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>

            {/* Education */}
            <section className="resume-section">
              <h2 className="resume-section-title">Education</h2>
              <ul className="resume-education">
                {profile.education.map((edu) => (
                  <li key={edu.school} className="resume-edu">
                    <p className="resume-role-name">{edu.degree}</p>
                    <p className="resume-role-company">{edu.school}</p>
                    <p className="resume-role-meta">
                      <span className="resume-role-icon" aria-hidden>▤</span>
                      <span>
                        {edu.start} - {edu.end}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT column */}
          <aside className="resume-side">
            <section className="resume-section">
              <h2 className="resume-section-title">Skills</h2>
              {profile.skillGroups.map((group) => (
                <div key={group.title} className="resume-skill-group">
                  <p className="resume-skill-group-title">{group.title}</p>
                  <ul className="resume-skill-list">
                    {group.items.map((item) => (
                      <li key={item} className="resume-skill-pill">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section className="resume-section">
              <h2 className="resume-section-title">Certifications</h2>
              <div className="resume-certs">
                {Object.entries(certsByGroup).map(([groupKey, items]) => {
                  const meta =
                    GROUP_META[groupKey as keyof typeof GROUP_META];
                  return (
                    <div key={groupKey} className="resume-cert-group">
                      <p className="resume-skill-group-title">
                        {meta?.fullName ?? groupKey}
                      </p>
                      <ul className="resume-cert-list">
                        {items.map((cert) => (
                          <li key={cert.title}>{cert.title}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="resume-section">
              <h2 className="resume-section-title">Languages</h2>
              <ul className="resume-languages">
                {profile.languages.map((lang) => (
                  <li key={lang.name}>
                    <span className="resume-lang-name">{lang.name}</span>
                    <span className="resume-lang-level">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </article>
    </div>
  );
}
