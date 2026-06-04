import type { Metadata } from "next";
import Link from "next/link";
import { SnakeGame } from "@/components/games/SnakeGame";

export const metadata: Metadata = {
  title: "Snake",
  description: "Eat. Grow. Don't crash.",
};

export default function SnakePage() {
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
          🐍 Snake
        </h1>
        <p className="text-[var(--color-fg-soft)]">
          Eat the apples. Don't bite yourself. Speeds up every 4 apples.
        </p>
      </header>

      <SnakeGame />
    </div>
  );
}
