# Portfolio Screenshots

Drop your project screenshots in **this directory** (`public/portfolio/`).

## File naming

Name each file using the project's `slug` from `src/content/portfolio.ts`:

| Project              | Filename to use                       |
| -------------------- | ------------------------------------- |
| Lotto PH Info        | `lotto-ph-info.png` (or `.jpg`)       |
| Buhay Pinoy          | `buhay-pinoy.png`                     |
| TCG Overdrive        | `tcg-overdrive.png`                   |
| PayKita              | `paykita.png`                         |
| URL Shortener        | `url-shortener.png`                   |
| Football Manager     | `football-manager.png`                |

## Recommended image specs

- **Aspect ratio**: 16:10 (cards) and 2:1 (detail page hero) — pick one or
  use a wider 2:1 shot; both renderers crop with `object-cover`.
- **Suggested size**: 1600×1000 px (or 2000×1000 px for 2:1)
- **Format**: PNG or JPG. PNG for crisp UI shots, JPG for photo-heavy.
- **Weight**: keep under 500 KB if possible (Next.js will not auto-optimize
  these unless you switch to `next/image`).

## Wiring it up

After dropping the file, open `src/content/portfolio.ts` and add the
`screenshot` field to the matching project. For example:

```ts
{
  slug: "lotto-ph-info",
  // ...existing fields,
  screenshot: "/portfolio/lotto-ph-info.png",
},
```

The `<ProjectHero>` component will automatically detect the `screenshot`
field and use the real image instead of the generated branded panel —
both on the portfolio grid card and the project detail page.

## How to take good screenshots

1. Open the live site in your browser at desktop width (~1440 px).
2. Use **macOS**: `Cmd+Shift+4` then space, then click the browser window.
   Or use a tool like [CleanShot X](https://cleanshot.com/) for crisper
   crops.
3. Crop tightly to the interesting UI — avoid the browser chrome unless
   it's intentional.
4. For the **detail page hero**, a wider crop (2:1) looks best.

That's it — the site picks up the change on next dev reload / build.
