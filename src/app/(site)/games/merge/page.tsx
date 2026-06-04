import type { Metadata } from "next";
import Link from "next/link";
import { MergeGame } from "@/components/games/MergeGame";

export const metadata: Metadata = {
  title: "Merge Game",
  description:
    "Drop, combine, ascend — Promotion Simulator and AI Slop Merge.",
};

export default function MergePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-12 pb-8">
      <Link
        href="/games"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors mb-6"
      >
        ← All games
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
          🍉 Merge Game
        </h1>
        <p className="text-[var(--color-fg-soft)]">
          Drop two of the same to combine them. Stack too high and it's game
          over. Pick a theme below.
        </p>
      </header>

      <MergeGame />
    </div>
  );
}
