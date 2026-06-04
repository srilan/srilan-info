# Merge Game Sprites

By default, each level renders as an emoji painted on a colored gradient
ball. To use real PNG/SVG sprites instead, drop them in this directory
and add a `sprite` field to the matching level in
`src/games/merge/themes.ts`.

## Directory layout

```
public/games/sprites/
├── corporate/
│   ├── 0.png   ← Intern
│   ├── 1.png   ← Junior Developer
│   ...
│   └── 11.png  ← Retired LinkedIn Influencer
└── ai-slop/
    ├── 0.png   ← Stick Figure
    ├── 1.png   ← Stock Photo Human
    ...
    └── 11.png  ← Heat Death
```

## Recommended specs

- Square (1:1), transparent background
- 256×256 or 512×512 px is plenty
- PNG or SVG

## Wiring up

In `src/games/merge/themes.ts`, add `sprite` to a level:

```ts
{
  name: "Intern",
  emoji: "🧑‍💻",
  gradient: ["#94a3b8", "#64748b"],
  sprite: "/games/sprites/corporate/0.png",
}
```

Note: the renderer currently paints the emoji on the gradient even when a
sprite is set. To make sprites override the emoji entirely, update
`MergeGame.tsx` `drawBall()` to check `lvl.sprite` and draw an Image
instead of `fillText(lvl.emoji)`.

## Open-source sprite sources

- [Kenney.nl](https://kenney.nl/assets) — public domain game art (CC0)
- [OpenGameArt](https://opengameart.org/) — broad selection, varied licenses
- [Game-Icons.net](https://game-icons.net/) — silhouette icons (CC BY 3.0)
- [Twemoji](https://github.com/twitter/twemoji) — emoji as PNG/SVG (CC BY 4.0)
