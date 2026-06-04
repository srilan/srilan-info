import type { Project } from "@/content/portfolio";

type Props = {
  project: Project;
  variant?: "card" | "detail";
};

// Renders a branded hero panel for a project.
// If `project.screenshot` is set, render the image instead.
export function ProjectHero({ project, variant = "card" }: Props) {
  const { theme } = project;
  const isDetail = variant === "detail";

  if (project.screenshot) {
    return (
      <div
        className={`relative overflow-hidden ${
          isDetail ? "aspect-[2/1]" : "aspect-[16/10]"
        }`}
        style={{ background: theme.tint }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${
        isDetail ? "aspect-[2/1]" : "aspect-[16/10]"
      }`}
      style={{
        background: `linear-gradient(135deg, ${theme.accent} 0%, ${shade(theme.accent, -25)} 100%)`,
      }}
    >
      {/* radial glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 75% 25%, ${theme.glow} 0%, transparent 55%)`,
        }}
      />
      {/* grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          color: theme.ink,
        }}
      />
      {/* per-project visual mark */}
      <ProjectMark slug={project.slug} ink={theme.ink} accent={theme.accent} />
      {/* title */}
      <div
        className={`absolute ${isDetail ? "bottom-8 left-8 right-8" : "bottom-5 left-5 right-5"}`}
        style={{ color: theme.ink }}
      >
        <p
          className={`uppercase tracking-[0.2em] opacity-70 ${isDetail ? "text-xs" : "text-[10px]"} mb-1`}
        >
          {project.status === "live"
            ? "Live"
            : project.status === "prototype"
              ? "Prototype"
              : project.status === "sunset"
                ? "Sunset"
                : "Developer only"}
        </p>
        <p
          className={`font-semibold tracking-tight ${isDetail ? "text-3xl" : "text-xl"}`}
        >
          {project.title}
        </p>
        {isDetail && (
          <p className="mt-2 text-base opacity-80 max-w-md">
            {project.tagline}
          </p>
        )}
      </div>
    </div>
  );
}

function ProjectMark({
  slug,
  ink,
  accent,
}: {
  slug: string;
  ink: string;
  accent: string;
}) {
  switch (slug) {
    case "lotto-ph-info":
      return (
        <svg
          aria-hidden
          className="absolute right-6 top-6 opacity-90"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 30}, ${i * 6})`}>
              <circle cx="40" cy="40" r="22" fill={ink} opacity="0.95" />
              <text
                x="40"
                y="46"
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                fontSize="18"
                fill={accent}
              >
                {[7, 21, 42][i]}
              </text>
            </g>
          ))}
        </svg>
      );
    case "buhay-pinoy":
      return (
        <svg
          aria-hidden
          className="absolute right-6 top-6 opacity-90"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {/* sun rays */}
          <g stroke={ink} strokeWidth="3" strokeLinecap="round">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4;
              const x1 = 60 + Math.cos(a) * 30;
              const y1 = 60 + Math.sin(a) * 30;
              const x2 = 60 + Math.cos(a) * 50;
              const y2 = 60 + Math.sin(a) * 50;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
          <circle cx="60" cy="60" r="22" fill={ink} />
        </svg>
      );
    case "tcg-overdrive":
      return (
        <svg
          aria-hidden
          className="absolute right-6 top-6 opacity-90"
          width="140"
          height="120"
          viewBox="0 0 140 120"
        >
          {[0, 1, 2].map((i) => (
            <g
              key={i}
              transform={`translate(${i * 24}, ${i * -4}) rotate(${(i - 1) * 8} 50 60)`}
            >
              <rect
                x="20"
                y="20"
                width="60"
                height="84"
                rx="6"
                fill={ink}
                opacity={0.9 - i * 0.1}
                stroke={accent}
                strokeWidth="2"
              />
              <rect
                x="28"
                y="32"
                width="44"
                height="40"
                rx="3"
                fill={accent}
                opacity="0.6"
              />
              <line
                x1="28"
                y1="82"
                x2="72"
                y2="82"
                stroke={accent}
                strokeWidth="2"
              />
              <line
                x1="28"
                y1="90"
                x2="60"
                y2="90"
                stroke={accent}
                strokeWidth="2"
                opacity="0.6"
              />
            </g>
          ))}
        </svg>
      );
    case "paykita":
      return (
        <svg
          aria-hidden
          className="absolute right-6 top-6 opacity-90"
          width="140"
          height="120"
          viewBox="0 0 140 120"
        >
          <rect
            x="14"
            y="28"
            width="110"
            height="68"
            rx="10"
            fill={ink}
            opacity="0.95"
          />
          <rect
            x="14"
            y="44"
            width="110"
            height="14"
            fill={accent}
            opacity="0.4"
          />
          <circle cx="100" cy="78" r="8" fill={accent} opacity="0.9" />
          <circle cx="88" cy="78" r="8" fill={accent} opacity="0.5" />
          <text
            x="24"
            y="84"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
            fontSize="11"
            fill={accent}
          >
            •••• 8421
          </text>
        </svg>
      );
    case "url-shortener":
      return (
        <svg
          aria-hidden
          className="absolute right-6 top-6 opacity-90"
          width="160"
          height="120"
          viewBox="0 0 160 120"
        >
          {/* long link transforms into short link */}
          <rect
            x="8"
            y="32"
            width="80"
            height="22"
            rx="11"
            fill={ink}
            opacity="0.85"
          />
          <text
            x="14"
            y="47"
            fontFamily="ui-monospace, monospace"
            fontSize="10"
            fontWeight="600"
            fill={accent}
          >
            https://long.url/...
          </text>
          {/* arrow */}
          <path
            d="M 92 43 L 108 43 M 102 38 L 108 43 L 102 48"
            stroke={ink}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* short result */}
          <rect
            x="86"
            y="64"
            width="64"
            height="22"
            rx="11"
            fill={accent}
            opacity="0.95"
          />
          <text
            x="94"
            y="79"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            fontWeight="700"
            fill={ink}
          >
            s.ly/x9k
          </text>
          {/* link icon */}
          <g transform="translate(118, 22)" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path d="M2 8 a4 4 0 0 1 4-4 h4" />
            <path d="M14 0 a4 4 0 0 1 4 4 v4" />
            <line x1="6" y1="6" x2="14" y2="14" />
          </g>
        </svg>
      );
    case "football-manager":
      return (
        <svg
          aria-hidden
          className="absolute right-6 top-4 opacity-90"
          width="140"
          height="120"
          viewBox="0 0 140 120"
        >
          {/* pitch */}
          <rect
            x="14"
            y="14"
            width="112"
            height="92"
            rx="6"
            fill={accent}
            opacity="0.4"
            stroke={ink}
            strokeWidth="2"
          />
          {/* center circle + line */}
          <line
            x1="14"
            y1="60"
            x2="126"
            y2="60"
            stroke={ink}
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle
            cx="70"
            cy="60"
            r="14"
            stroke={ink}
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          {/* goal boxes */}
          <rect
            x="48"
            y="14"
            width="44"
            height="14"
            stroke={ink}
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          <rect
            x="48"
            y="92"
            width="44"
            height="14"
            stroke={ink}
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          {/* football */}
          <g transform="translate(64, 54)">
            <circle cx="6" cy="6" r="8" fill={ink} />
            <polygon
              points="6,1 10,4 8,9 4,9 2,4"
              fill={accent}
              opacity="0.9"
            />
          </g>
        </svg>
      );
    default:
      return null;
  }
}

// crude HSL shade — accent darkening for gradient end
function shade(hex: string, percent: number): string {
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  r = Math.round((t - r) * p + r);
  g = Math.round((t - g) * p + g);
  b = Math.round((t - b) * p + b);
  return `rgb(${r}, ${g}, ${b})`;
}
