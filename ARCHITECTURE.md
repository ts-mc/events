# Events website architecture

Next.js 15, React 19 and TypeScript serve the App Router pages. Tailwind 3 and `src/app/globals.css` provide shared presentation.

| Change | Source | Consumer |
| --- | --- | --- |
| Address or server facts | `src/data/site.ts` | Server information and join flows |
| Game roster, arenas or ranks | `src/data/games.ts`, `arenas.ts`, `ranks.ts` | Games, arenas and ranks pages |
| Commands and onboarding | `src/data/commands.ts`, `steps.ts` | Player instructions |
| Live status | `src/lib/mc-ping.ts` and `src/app/api/status/route.ts` | Browser status UI via `src/lib/status-client.ts` |

The editorial data is versioned with the site. The server ping is a runtime dependency, with a local fixture available for verification.
