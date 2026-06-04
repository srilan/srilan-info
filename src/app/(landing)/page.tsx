"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Stars / noise */}
      <div aria-hidden className="absolute inset-0 noise" />

      {/* Drifting color blobs */}
      <div
        aria-hidden
        className="blob landing-float"
        style={{
          top: "10%",
          left: "-10%",
          width: "520px",
          height: "520px",
          background: "#4f46e5",
          opacity: 0.45,
        }}
      />
      <div
        aria-hidden
        className="blob landing-float"
        style={{
          top: "20%",
          right: "-15%",
          width: "560px",
          height: "560px",
          background: "#d946ef",
          opacity: 0.4,
          animationDelay: "-6s",
        }}
      />
      <div
        aria-hidden
        className="blob landing-float"
        style={{
          bottom: "-15%",
          left: "20%",
          width: "640px",
          height: "640px",
          background: "#f59e0b",
          opacity: 0.3,
          animationDelay: "-12s",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 90%)",
        }}
      />

      {/* Top corner: tiny mark */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 opacity-0 animate-landing-fade [animation-delay:200ms]">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
          srilan.info
        </span>
      </div>
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 opacity-0 animate-landing-fade [animation-delay:200ms]">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
          mmxxvi
        </span>
      </div>

      {/* Center stage */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {mounted && (
          <>
            {/* Intro line */}
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.4em] text-white/50 opacity-0 animate-landing-fade [animation-delay:600ms]">
              a quiet introduction
            </p>

            {/* Name */}
            <h1 className="mt-8 sm:mt-10 text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-[0.95]">
              <span className="block opacity-0 animate-landing-rise [animation-delay:1200ms]">
                Srilan
              </span>
              <span
                className="block opacity-0 animate-landing-rise [animation-delay:1700ms]"
                style={{
                  background:
                    "linear-gradient(135deg, #818cf8 0%, #d946ef 50%, #fb7185 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Catalinio
              </span>
            </h1>

            {/* Divider line */}
            <span
              aria-hidden
              className="mt-10 block h-px w-0 origin-center animate-landing-line [animation-delay:2400ms]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
              }}
            />

            {/* Headline */}
            <p className="mt-8 text-base sm:text-lg text-white/70 opacity-0 animate-landing-fade [animation-delay:2900ms] max-w-md">
              Senior Software Engineering Manager
              <span className="text-white/30"> · </span>
              AI Builder
            </p>

            <p className="mt-3 text-sm text-white/40 opacity-0 animate-landing-fade [animation-delay:3100ms]">
              Metro Manila — building thoughtful systems for the web.
            </p>

            {/* self-aware aside */}
            <p className="mt-6 font-mono text-[11px] italic text-white/30 opacity-0 animate-landing-fade [animation-delay:3400ms]">
              (yeah... this is a little vain. forgive me.)
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-3 opacity-0 animate-landing-fade [animation-delay:3700ms]">
              <Link
                href="/about"
                className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-full overflow-hidden font-medium text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #4f46e5, #7c3aed, #d946ef, #f43f5e)",
                  backgroundSize: "200% 200%",
                  backgroundPosition: "0% 50%",
                  transition: "background-position 0.6s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundPosition = "100% 50%";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundPosition = "0% 50%";
                }}
              >
                <span className="relative">enter</span>
                <span
                  aria-hidden
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

              <Link
                href="/portfolio"
                className="px-5 py-3 text-sm text-white/60 hover:text-white transition-colors"
              >
                or skip to the work
              </Link>
            </div>

            {/* Bored? play a game */}
            <Link
              href="/games"
              className="group mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors opacity-0 animate-landing-fade [animation-delay:4000ms]"
            >
              <span
                aria-hidden
                className="text-base transition-transform duration-300 group-hover:rotate-12"
              >
                🎮
              </span>
              <span>bored, not interested? play a game instead</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </>
        )}
      </div>

      {/* Bottom: scroll / nav hints */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-landing-fade [animation-delay:4200ms]">
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            press enter to continue
          </span>
          <span aria-hidden className="text-base animate-bounce-slow">
            ↓
          </span>
        </div>
      </div>

      {/* Quick nav at bottom edges */}
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 opacity-0 animate-landing-fade [animation-delay:4200ms]">
        <a
          href={`mailto:${profile.email}`}
          className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
        >
          {profile.email}
        </a>
      </div>
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10 opacity-0 animate-landing-fade [animation-delay:4200ms]">
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
        >
          linkedin ↗
        </a>
      </div>

      {/* Press Enter to navigate */}
      <KeyboardEnterListener />
    </div>
  );
}

function KeyboardEnterListener() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        window.location.href = "/about";
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return null;
}
