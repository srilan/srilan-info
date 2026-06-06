"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/certificates", label: "Certificates" },
  { href: "/games", label: "Games" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] border-b">
      <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/about"
          className="font-medium tracking-tight hover:opacity-70 transition-opacity"
          onClick={() => setOpen(false)}
        >
          <span className="text-gradient-brand">{profile.shortName}</span>
          <span className="text-[var(--color-muted)]">.info</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 rounded-md transition-colors ${
                  active
                    ? "text-[var(--color-fg)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-subtle)]"
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-px left-3 right-3 h-[2px] rounded-full"
                    style={{ background: "var(--hero-gradient)" }}
                  />
                )}
              </Link>
            );
          })}
          <span className="ml-2">
            <ThemeToggle />
          </span>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-fg)] hover:bg-[var(--color-subtle)] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t bg-[var(--color-bg)]"
        >
          <nav className="mx-auto max-w-3xl px-6 py-3 flex flex-col gap-1 text-sm">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 rounded-md transition-colors ${
                    active
                      ? "text-[var(--color-fg)] bg-[var(--color-subtle)] font-medium"
                      : "text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-subtle)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
