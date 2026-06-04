"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 24;
const ROWS = 24;
const TICK_MS_START = 130;
const TICK_MS_MIN = 55;
const SPEEDUP_EVERY = 4;

type Cell = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

const DIR_VEC: Record<Dir, Cell> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE: Record<Dir, Dir> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function randCell(occupied: Cell[]): Cell {
  while (true) {
    const c = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
    if (!occupied.some((o) => o.x === c.x && o.y === c.y)) return c;
  }
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<{
    snake: Cell[];
    dir: Dir;
    queuedDir: Dir;
    food: Cell;
    score: number;
    alive: boolean;
    tickMs: number;
    eatPulse: number; // frames remaining to render an eat effect
  } | null>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [alive, setAlive] = useState(true);
  const [running, setRunning] = useState(false);

  // Load high score from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("snake-hs");
    if (stored) setHighScore(parseInt(stored, 10) || 0);
  }, []);

  function reset() {
    const start: Cell[] = [
      { x: 10, y: 12 },
      { x: 9, y: 12 },
      { x: 8, y: 12 },
    ];
    stateRef.current = {
      snake: start,
      dir: "right",
      queuedDir: "right",
      food: randCell(start),
      score: 0,
      alive: true,
      tickMs: TICK_MS_START,
      eatPulse: 0,
    };
    setScore(0);
    setAlive(true);
    setRunning(true);
  }

  // Game loop
  useEffect(() => {
    if (!running) return;
    if (!stateRef.current) return;
    let lastTick = performance.now();
    let raf = 0;

    const loop = (t: number) => {
      const s = stateRef.current!;
      if (!s.alive) {
        draw();
        return;
      }
      if (t - lastTick >= s.tickMs) {
        lastTick = t;
        step();
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  function step() {
    const s = stateRef.current;
    if (!s) return;

    s.dir = s.queuedDir;
    const v = DIR_VEC[s.dir];
    const head = s.snake[0];
    const next = { x: head.x + v.x, y: head.y + v.y };

    // wall collision
    if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
      die();
      return;
    }
    // self collision (excluding the tail since it'll move)
    const willEat = next.x === s.food.x && next.y === s.food.y;
    const body = willEat ? s.snake : s.snake.slice(0, -1);
    if (body.some((c) => c.x === next.x && c.y === next.y)) {
      die();
      return;
    }

    s.snake.unshift(next);
    if (willEat) {
      s.score += 1;
      s.eatPulse = 8;
      setScore(s.score);
      // Speed up every N apples
      if (s.score % SPEEDUP_EVERY === 0) {
        s.tickMs = Math.max(TICK_MS_MIN, s.tickMs - 8);
      }
      s.food = randCell(s.snake);
    } else {
      s.snake.pop();
    }
  }

  function die() {
    const s = stateRef.current;
    if (!s) return;
    s.alive = false;
    setAlive(false);
    if (s.score > highScore) {
      setHighScore(s.score);
      localStorage.setItem("snake-hs", String(s.score));
    }
  }

  function draw() {
    const canvas = canvasRef.current;
    const s = stateRef.current;
    if (!canvas || !s) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cellW = W / COLS;
    const cellH = H / ROWS;

    // bg
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#022c22");
    bg.addColorStop(1, "#0c4a3e");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellW, 0);
      ctx.lineTo(x * cellW, H);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellH);
      ctx.lineTo(W, y * cellH);
      ctx.stroke();
    }

    // food (pulsing apple)
    const pulse = (Math.sin(performance.now() / 200) + 1) / 2; // 0..1
    const fx = s.food.x * cellW + cellW / 2;
    const fy = s.food.y * cellH + cellH / 2;
    const r = (cellW / 2) * (0.7 + 0.15 * pulse);

    ctx.shadowColor = "#f43f5e";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(fx, fy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // shine
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();
    ctx.arc(fx - r * 0.3, fy - r * 0.3, r * 0.25, 0, Math.PI * 2);
    ctx.fill();

    // snake body — gradient from head to tail
    s.snake.forEach((c, i) => {
      const t = i / Math.max(1, s.snake.length - 1);
      // head emerald → tail teal
      const hue = 160 + t * 20;
      const sat = 80 - t * 20;
      const lig = 55 - t * 15;
      ctx.fillStyle = `hsl(${hue} ${sat}% ${lig}%)`;
      const px = c.x * cellW;
      const py = c.y * cellH;
      const radius = i === 0 ? cellW * 0.22 : cellW * 0.18;
      const inset = i === 0 ? 1 : 2;
      roundRect(ctx, px + inset, py + inset, cellW - inset * 2, cellH - inset * 2, radius);
      ctx.fill();
      if (i === 0) {
        // eyes
        ctx.fillStyle = "white";
        const v = DIR_VEC[s.dir];
        const eyeR = cellW * 0.08;
        const eyeOffsetX = v.x * cellW * 0.18;
        const eyeOffsetY = v.y * cellH * 0.18;
        // perpendicular spread
        const perpX = v.y * cellW * 0.18;
        const perpY = v.x * cellH * 0.18;
        const cx = px + cellW / 2 + eyeOffsetX;
        const cy = py + cellH / 2 + eyeOffsetY;
        ctx.beginPath();
        ctx.arc(cx + perpX, cy + perpY, eyeR, 0, Math.PI * 2);
        ctx.arc(cx - perpX, cy - perpY, eyeR, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // eat pulse — radial flash where the food was
    if (s.eatPulse > 0) {
      const head = s.snake[0];
      const cx = head.x * cellW + cellW / 2;
      const cy = head.y * cellH + cellH / 2;
      const radius = (10 - s.eatPulse) * 8;
      ctx.strokeStyle = `rgba(244, 63, 94, ${s.eatPulse / 8})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      s.eatPulse--;
    }

    // game over overlay
    if (!s.alive) {
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fafafa";
      ctx.font = "600 36px var(--font-geist-sans), system-ui";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", W / 2, H / 2 - 10);
      ctx.font = "16px var(--font-geist-sans), system-ui";
      ctx.fillStyle = "#a3a3a3";
      ctx.fillText(`Score: ${s.score}`, W / 2, H / 2 + 18);
      ctx.fillText("Press Space or Tap to play again", W / 2, H / 2 + 42);
    }
  }

  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Inputs
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (!s) {
        if (e.key === " " || e.key === "Enter") reset();
        return;
      }
      if (!s.alive && (e.key === " " || e.key === "Enter")) {
        reset();
        return;
      }
      const map: Record<string, Dir> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        W: "up",
        s: "down",
        S: "down",
        a: "left",
        A: "left",
        d: "right",
        D: "right",
      };
      const next = map[e.key];
      if (next && next !== OPPOSITE[s.dir]) {
        s.queuedDir = next;
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Touch swipes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let startX = 0,
      startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const s = stateRef.current;
      if (!s) {
        reset();
        return;
      }
      if (!s.alive) {
        reset();
        return;
      }
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      if (Math.max(absX, absY) < 20) return;
      let next: Dir;
      if (absX > absY) next = dx > 0 ? "right" : "left";
      else next = dy > 0 ? "down" : "up";
      if (next !== OPPOSITE[s.dir]) s.queuedDir = next;
    };
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Initial render
  useEffect(() => {
    if (!stateRef.current) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-[600px] items-center justify-between text-sm">
        <div className="flex gap-4">
          <span className="font-mono">
            <span className="text-[var(--color-muted)]">SCORE</span>{" "}
            <span className="font-bold tabular-nums">{score}</span>
          </span>
          <span className="font-mono">
            <span className="text-[var(--color-muted)]">BEST</span>{" "}
            <span className="font-bold tabular-nums">{highScore}</span>
          </span>
        </div>
        <button
          onClick={reset}
          className="text-xs uppercase tracking-widest font-mono text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
        >
          {alive ? "restart" : "play again"} ↻
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="w-full max-w-[600px] aspect-square rounded-2xl border touch-none"
        style={{
          borderColor:
            "color-mix(in srgb, var(--color-emerald) 30%, var(--color-border))",
        }}
      />
      <p className="text-xs text-[var(--color-muted)] font-mono">
        arrows / wasd · swipe on mobile
      </p>
    </div>
  );
}
