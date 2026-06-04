"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Matter from "matter-js";
import {
  THEMES,
  THEME_LIST,
  DEFAULT_THEME_ID,
  type MergeTheme,
} from "@/games/merge/themes";

const W = 480;
const H = 640;
const WALL = 14;
const TOP_GUTTER = 80; // ball drops from above this line; game-over line lives here
const DROP_COOLDOWN_MS = 350;

type BallData = {
  level: number;
  themeId: string;
  // animation
  spawnedAt: number;
  mergedAt?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
};

export function MergeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [themeId, setThemeId] = useState<string>(DEFAULT_THEME_ID);
  const theme = useMemo(() => THEMES[themeId], [themeId]);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [maxLevelReached, setMaxLevelReached] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [next, setNext] = useState<number>(0); // queued spawn level
  const [previewX, setPreviewX] = useState(W / 2);

  // engine refs
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const ballsRef = useRef<Map<number, BallData>>(new Map());
  const particlesRef = useRef<Particle[]>([]);
  const lastDropRef = useRef<number>(0);
  const aboveLineSinceRef = useRef<Map<number, number>>(new Map());
  const stateRef = useRef({ themeId: DEFAULT_THEME_ID, gameOver: false });

  // Update stateRef without retriggering effects
  useEffect(() => {
    stateRef.current.themeId = themeId;
    stateRef.current.gameOver = gameOver;
  }, [themeId, gameOver]);

  // Load high score per theme
  useEffect(() => {
    const stored = localStorage.getItem(`merge-hs-${themeId}`);
    setHighScore(stored ? parseInt(stored, 10) || 0 : 0);
  }, [themeId]);

  // Init / reset engine on theme change
  useEffect(() => {
    setupEngine();
    return () => {
      teardownEngine();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeId]);

  function teardownEngine() {
    if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
    }
    runnerRef.current = null;
    engineRef.current = null;
    ballsRef.current.clear();
    particlesRef.current = [];
    aboveLineSinceRef.current.clear();
  }

  function setupEngine() {
    teardownEngine();
    setScore(0);
    setMaxLevelReached(0);
    setGameOver(false);
    setNext(Math.floor(Math.random() * theme.spawnableLevels));

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.2 },
    });
    engineRef.current = engine;

    // walls
    const opts: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      friction: 0.5,
      restitution: 0.1,
      label: "wall",
    };
    const floor = Matter.Bodies.rectangle(W / 2, H - WALL / 2, W, WALL, opts);
    const left = Matter.Bodies.rectangle(WALL / 2, H / 2, WALL, H, opts);
    const right = Matter.Bodies.rectangle(W - WALL / 2, H / 2, WALL, H, opts);
    Matter.World.add(engine.world, [floor, left, right]);

    // collisions → merges
    Matter.Events.on(engine, "collisionStart", (event) => {
      for (const pair of event.pairs) {
        const a = pair.bodyA;
        const b = pair.bodyB;
        if (a.label !== "ball" || b.label !== "ball") continue;
        const ad = ballsRef.current.get(a.id);
        const bd = ballsRef.current.get(b.id);
        if (!ad || !bd) continue;
        if (ad.level !== bd.level) continue;
        if (ad.mergedAt || bd.mergedAt) continue;

        const themeNow = THEMES[stateRef.current.themeId];
        const nextLevel = ad.level + 1;
        if (nextLevel >= themeNow.levels.length) {
          // top-tier merge → just remove both with a big particle burst
          ad.mergedAt = performance.now();
          bd.mergedAt = performance.now();
          burst(
            (a.position.x + b.position.x) / 2,
            (a.position.y + b.position.y) / 2,
            themeNow.levels[ad.level].gradient[0],
            40,
          );
          setTimeout(() => {
            if (engineRef.current) {
              Matter.World.remove(engineRef.current.world, a);
              Matter.World.remove(engineRef.current.world, b);
            }
            ballsRef.current.delete(a.id);
            ballsRef.current.delete(b.id);
          }, 60);
          setScore((s) => s + (themeNow.scorePerLevel[ad.level] ?? 100) * 2);
          continue;
        }

        ad.mergedAt = performance.now();
        bd.mergedAt = performance.now();
        const mx = (a.position.x + b.position.x) / 2;
        const my = (a.position.y + b.position.y) / 2;

        burst(mx, my, themeNow.levels[nextLevel].gradient[0], 22);

        // Defer body swap so we don't mutate during the physics step
        setTimeout(() => {
          if (!engineRef.current) return;
          Matter.World.remove(engineRef.current.world, a);
          Matter.World.remove(engineRef.current.world, b);
          ballsRef.current.delete(a.id);
          ballsRef.current.delete(b.id);
          spawnBall(mx, my, nextLevel, true);
        }, 30);

        setScore((s) => s + (themeNow.scorePerLevel[ad.level] ?? 1));
        setMaxLevelReached((m) => Math.max(m, nextLevel));
      }
    });

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
  }

  function spawnBall(x: number, y: number, level: number, fromMerge = false) {
    const engine = engineRef.current;
    if (!engine) return;
    const themeNow = THEMES[stateRef.current.themeId];
    const radius = themeNow.radii[level] ?? 18;
    const body = Matter.Bodies.circle(x, y, radius, {
      restitution: 0.18,
      friction: 0.4,
      frictionStatic: 0.6,
      density: 0.001 * (1 + level * 0.05),
      label: "ball",
      slop: 0.02,
    });
    Matter.World.add(engine.world, body);
    ballsRef.current.set(body.id, {
      level,
      themeId: stateRef.current.themeId,
      spawnedAt: performance.now(),
      mergedAt: fromMerge ? undefined : undefined,
    });
    if (fromMerge) {
      // Tiny upward kick so merged balls feel snappy
      Matter.Body.setVelocity(body, { x: 0, y: -1.5 });
    }
  }

  function burst(x: number, y: number, color: string, count: number) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 30 + Math.random() * 20,
        maxLife: 50,
        color,
        size: 2 + Math.random() * 3,
      });
    }
  }

  // Drop on click
  function dropAt(clientX: number) {
    if (gameOver) return;
    const now = performance.now();
    if (now - lastDropRef.current < DROP_COOLDOWN_MS) return;
    lastDropRef.current = now;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const x = (clientX - rect.left) * scaleX;
    const themeNow = THEMES[stateRef.current.themeId];
    const radius = themeNow.radii[next] ?? 18;
    const clamped = Math.max(WALL + radius, Math.min(W - WALL - radius, x));
    spawnBall(clamped, 40, next, false);
    setNext(Math.floor(Math.random() * themeNow.spawnableLevels));
  }

  // Pointer tracking for preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const cx =
        e instanceof MouseEvent
          ? e.clientX
          : (e.touches[0]?.clientX ?? previewX);
      const x = (cx - rect.left) * scaleX;
      setPreviewX(Math.max(WALL + 30, Math.min(W - WALL - 30, x)));
    };
    const onClick = (e: MouseEvent) => dropAt(e.clientX);
    const onTouch = (e: TouchEvent) => {
      if (!e.changedTouches[0]) return;
      dropAt(e.changedTouches[0].clientX);
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("touchmove", onMove, { passive: true });
    canvas.addEventListener("touchend", onTouch);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchmove", onMove);
      canvas.removeEventListener("touchend", onTouch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, gameOver]);

  // Render loop
  useEffect(() => {
    let raf = 0;
    const render = () => {
      const canvas = canvasRef.current;
      const engine = engineRef.current;
      if (!canvas || !engine) {
        raf = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const themeNow = THEMES[stateRef.current.themeId];

      // bg
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, themeNow.bg[0]);
      bg.addColorStop(1, themeNow.bg[1]);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // walls
      ctx.fillStyle = `color-mix(in srgb, ${themeNow.accent} 25%, #000)`;
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fillRect(0, 0, WALL, H);
      ctx.fillRect(W - WALL, 0, WALL, H);
      ctx.fillRect(0, H - WALL, W, WALL);

      // game-over line
      ctx.strokeStyle = `${themeNow.accent}88`;
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, TOP_GUTTER);
      ctx.lineTo(W, TOP_GUTTER);
      ctx.stroke();
      ctx.setLineDash([]);

      // preview ball at top
      if (!stateRef.current.gameOver) {
        const previewLevel = next;
        const previewRadius = themeNow.radii[previewLevel] ?? 18;
        drawBall(
          ctx,
          previewX,
          40,
          previewRadius,
          previewLevel,
          themeNow,
          0.65,
          performance.now(),
        );
        // drop guide
        ctx.strokeStyle = `${themeNow.accent}55`;
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(previewX, 40 + previewRadius);
        ctx.lineTo(previewX, H - WALL);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // bodies
      const bodies = Matter.Composite.allBodies(engine.world);
      const now = performance.now();
      let anyAboveLine = false;
      for (const body of bodies) {
        if (body.label !== "ball") continue;
        const data = ballsRef.current.get(body.id);
        if (!data) continue;
        // game-over check
        if (
          body.position.y - body.circleRadius! < TOP_GUTTER &&
          Math.abs(body.velocity.y) < 0.6 &&
          now - data.spawnedAt > 800 &&
          !data.mergedAt
        ) {
          const since = aboveLineSinceRef.current.get(body.id);
          if (!since) aboveLineSinceRef.current.set(body.id, now);
          else if (now - since > 1200) {
            // sustained — game over
            if (!stateRef.current.gameOver) {
              stateRef.current.gameOver = true;
              setGameOver(true);
              setHighScore((hs) => {
                const finalScore = score;
                const next = Math.max(hs, finalScore);
                localStorage.setItem(
                  `merge-hs-${stateRef.current.themeId}`,
                  String(next),
                );
                return next;
              });
            }
          }
          anyAboveLine = true;
        } else {
          aboveLineSinceRef.current.delete(body.id);
        }
        const mergeFlash = data.mergedAt
          ? Math.max(0, 1 - (now - data.mergedAt) / 200)
          : 0;
        const spawnPop = Math.min(1, (now - data.spawnedAt) / 250);
        drawBall(
          ctx,
          body.position.x,
          body.position.y,
          body.circleRadius!,
          data.level,
          themeNow,
          1 - mergeFlash * 0.3,
          now,
          body.angle,
          spawnPop,
        );
      }

      // particles
      const ps = particlesRef.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life--;
        if (p.life <= 0) {
          ps.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // game-over overlay
      if (stateRef.current.gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#fafafa";
        ctx.textAlign = "center";
        ctx.font = "600 32px var(--font-geist-sans), system-ui";
        ctx.fillText("Promotion Denied", W / 2, H / 2 - 30);
        ctx.font = "14px var(--font-geist-sans), system-ui";
        ctx.fillStyle = "#a3a3a3";
        ctx.fillText(`Final score: ${score}`, W / 2, H / 2 + 4);
        if (maxLevelReached > 0) {
          const reached = themeNow.levels[maxLevelReached]?.name ?? "";
          ctx.fillText(`Reached: ${reached}`, W / 2, H / 2 + 26);
        }
        ctx.fillText("Click Restart to try again", W / 2, H / 2 + 52);
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewX, next, score, maxLevelReached]);

  function drawBall(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    level: number,
    t: MergeTheme,
    alpha: number,
    now: number,
    angle = 0,
    spawnPop = 1,
  ) {
    const lvl = t.levels[level];
    if (!lvl) return;
    const scale = 0.7 + 0.3 * spawnPop;
    const radius = r * scale;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;

    // shadow
    ctx.shadowColor = lvl.gradient[1];
    ctx.shadowBlur = 16;

    // gradient body
    const grad = ctx.createRadialGradient(
      -radius * 0.3,
      -radius * 0.3,
      radius * 0.1,
      0,
      0,
      radius,
    );
    grad.addColorStop(0, lvl.gradient[0]);
    grad.addColorStop(1, lvl.gradient[1]);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;

    // ring (gives a nice token feel)
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = Math.max(1.5, radius * 0.06);
    ctx.beginPath();
    ctx.arc(0, 0, radius - ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.stroke();

    // emoji (cancel rotation so it stays upright)
    ctx.rotate(-angle);
    const fontSize = Math.floor(radius * 1.05);
    ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(lvl.emoji, 0, fontSize * 0.05);

    // shine highlight
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    ctx.arc(-radius * 0.35, -radius * 0.35, radius * 0.22, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.restore();
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      {/* Theme selector */}
      <div className="w-full max-w-[480px] grid grid-cols-2 gap-2">
        {THEME_LIST.map((t) => {
          const active = t.id === themeId;
          return (
            <button
              key={t.id}
              onClick={() => setThemeId(t.id)}
              className="rounded-xl border p-3 text-left transition-all"
              style={{
                background: active
                  ? `linear-gradient(135deg, ${t.bg[0]}, ${t.bg[1]})`
                  : "var(--color-bg-elev)",
                borderColor: active
                  ? t.accent
                  : "var(--color-border)",
                color: active ? "white" : "var(--color-fg)",
              }}
            >
              <p className="text-xs uppercase tracking-widest font-mono opacity-70">
                {t.id === "corporate" ? "Theme 01" : "Theme 02"}
              </p>
              <p className="font-semibold tracking-tight mt-0.5">{t.title}</p>
              <p
                className="text-xs mt-1"
                style={{ color: active ? "rgba(255,255,255,0.7)" : "var(--color-muted)" }}
              >
                {t.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* HUD */}
      <div className="flex w-full max-w-[480px] items-center justify-between text-sm">
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
          onClick={setupEngine}
          className="text-xs uppercase tracking-widest font-mono text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
        >
          restart ↻
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full max-w-[480px] rounded-2xl border touch-none"
        style={{
          aspectRatio: `${W} / ${H}`,
          borderColor: `color-mix(in srgb, ${theme.accent} 30%, var(--color-border))`,
        }}
      />

      {/* Evolution chain */}
      <div className="w-full max-w-[480px] mt-2">
        <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3 font-mono">
          Evolution chain
        </p>
        <div className="flex flex-wrap gap-1.5">
          {theme.levels.map((lvl, i) => {
            const reached = i <= maxLevelReached;
            return (
              <div
                key={lvl.name}
                className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition-all"
                style={{
                  background: reached
                    ? `linear-gradient(135deg, ${lvl.gradient[0]}, ${lvl.gradient[1]})`
                    : "var(--color-bg-elev)",
                  borderColor: reached
                    ? "transparent"
                    : "var(--color-border)",
                  color: reached ? "white" : "var(--color-muted)",
                  opacity: reached ? 1 : 0.5,
                }}
                title={lvl.name}
              >
                <span className="text-base leading-none">{lvl.emoji}</span>
                <span className="font-medium hidden sm:inline">
                  {lvl.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-[var(--color-muted)] font-mono">
        click / tap to drop · merge same kinds to ascend
      </p>
    </div>
  );
}
