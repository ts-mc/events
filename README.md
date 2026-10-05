# TheySix Events website

Marketing and information site for **TheySix Events**, a Minecraft minigame
server. Sibling brand to the farms site at `theysix.ro-mihaiu.xyz`; different
product, different palette, same identity.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 3.4
- `lucide-react` for icons, `next/font/google` for Inter and JetBrains Mono
- No CMS, no database, no analytics, no payment flow

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm run start   # production
npm run lint                     # eslint
npm run typecheck                # tsc --noEmit
```

### Verification scripts

```bash
npx tsx scripts/verify-data.ts          # asserts the 19 games / 6 arenas / 10 ranks tables
npx tsx scripts/ping-fixture-test.ts    # exercises the Server List Ping client against a local fake
node  scripts/generate-assets.mjs      # rebuilds the OG image, touch icon and favicons
```

`verify-data.ts` is the important one. The game roster, arena formats and rank
gradients are load-bearing: a typo there sends players to the wrong command. It
checks them against a copy of the authoritative table, and also fails if a
forbidden domain spelling or vendor name appears anywhere in `src/`.

## Environment variables

None. See `.env.example` — it exists only to document that fact.

The server address, port and every other server fact live in
`src/data/site.ts` as plain constants, which is what makes them auditable.

## Assets

| File | Notes |
|------|-------|
| `public/logo.gif` | The brand logo, copied from the farms site. Must be present for the site to render correctly. |
| `public/og-image.png` | 1200×630 Open Graph card. Static PNG, not the GIF, because crawlers do not render animated GIFs. |
| `public/apple-touch-icon.png` | 512×512 static icon. |
| `public/icon-192.png`, `public/icon-512.png` | PWA icons. |
| `public/maskable-icon-512.png` | Monochrome maskable icon, safe for adaptive icon masking. |
| `public/favicon.ico` | 32×32 and 16×16. |

All of these except `logo.gif` are generated. `scripts/generate-assets.mjs`
composes them from SVG and renders with `rsvg-convert` and ImageMagick, inlining
a still frame of the logo and the real Inter / JetBrains Mono faces from
`scripts/assets/fonts/`. Re-run it if the wordmark or palette changes.

If `public/logo.gif` is missing, drop the farms site's `public/logo.gif` in
its place. The component asks for 528×528 (the GIF's real logical size) and
sets `unoptimized`, since Next's image optimiser skips animated GIFs anyway.

## Live server status

`src/app/api/status/route.ts` is the only place that touches the game server.

- **Server-side only.** The SLP client in `src/lib/mc-ping.ts` opens a raw TCP
  socket, so it runs in the Node runtime and never reaches the browser bundle.
  The page polls the route instead.
- **Cached for 45 seconds**, with concurrent requests coalesced onto one
  in-flight ping. It emits `s-maxage=45, stale-while-revalidate=120`.
- **Degrades honestly.** Three states: `online`, `offline` (the host answered
  with a TCP reset, so the server is genuinely not listening) and `unknown` (DNS
  or timeout — which says nothing about the server). The UI shows "Status
  unavailable" and never renders `0` or a stale number as if it were live.

Because it is cached, the header status is never more than 45 seconds stale, and
a player count does not need to be live to the second.

## Project layout

```
src/
  app/                 routes; each has its own title, description and canonical
  components/          UI, including the client components that need interactivity
  data/                the authoritative facts: games, arenas, ranks, commands, site
  lib/mc-ping.ts       Server List Ping client (Node only)
  lib/status-client.ts browser-side polling of /api/status
scripts/               verification and asset generation
```

Content lives in `src/data/`, not in the page files. Every fact the site states
should be a constant there, so `verify-data.ts` can check it.

## Accessibility notes

- Category colour coding is always paired with a text label; colour is never the
  only signal.
- All text meets 4.5:1 against its background, or 3:1 at large-text sizes. Two
  brand hues could not meet 4.5:1 as small text (`--blurple` at 4.19:1 and the
  Head Moderator violet at 3.63:1), so `--blurple-text` and `--indigo-text`
  carry lighter steps of the same hues wherever the colour is applied to type.
  The rank names render at 20px extrabold, which qualifies as large text.
- `prefers-reduced-motion: reduce` disables every transform and keeps all content
  visible; the scroll-reveal observer is skipped entirely in that case.
- The game filter's result count lives in an `aria-live="polite"` region.

## What has to happen outside the codebase

The domain does not exist yet. To bring the site up at
`events-theysix.ro-mihaiu.xyz`: add the subdomain as a domain in the existing
Vercel project (or import this repository into Vercel and attach the domain
there), then add a DNS record for `events-theysix` pointing at that project's
target — an `A` record to the Vercel addresses, or a `CNAME` to
`cname.vercel-dns.com` if using a non-Vercel apex. Confirm whether
`*.ro-mihaiu.xyz` is already covered by a wildcard certificate and DNS record;
if it is, no new record is needed and TLS will issue automatically. The canonical
origin in `src/data/site.ts` (`SITE_URL`) already matches the target domain, so
canonical tags, OG URLs, `sitemap.xml` and `robots.txt` need no further change.
Then run `npm run build` and let Vercel deploy, and confirm
`/api/status` responds from the deployed domain.
