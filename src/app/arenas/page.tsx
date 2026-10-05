import type { Metadata } from "next";

import { ArenaCard } from "@/components/ArenaCard";
import { JsonLd } from "@/components/JsonLd";
import { Callout, PageShell, PageHero } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { ARENAS, gamesForArena } from "@/data/arenas";
import { ARENA_CAPACITY, ARENA_COUNT, SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: `Arena guide — ${ARENA_COUNT} arenas`,
  description: `The ${ARENA_COUNT} TheySix Events arenas explained: format, capacity of ${ARENA_CAPACITY} players each, typical player counts and the games that suit each map.`,
  alternates: { canonical: "/arenas" },
};

export default function ArenasPage() {
  return (
    <>
      <PageHero
        eyebrow="Arena guide"
        title={
          <>
            Six maps,{" "}
            <span className="text-gradient">six different fights.</span>
          </>
        }
        description={`Every arena on ${"TheySix Events"} holds up to ${ARENA_CAPACITY} players. The format label below describes what each arena is built for.`}
      >
        <Callout tone="amber" title="Team size is worked out at match time">
          The formats on this page describe each arena&apos;s intended identity
          and its typical player count. They are not a hard rule: when a round
          starts, the teams are split from however many players are actually in
          the arena. So a &ldquo;5v5&rdquo; arena is a ten-player arena, and if
          only six people show up you will be playing in a smaller match than
          the label suggests.
        </Callout>
      </PageHero>

      <PageShell>
        <JsonLd data={arenaListJsonLd()} />

        <section aria-labelledby="all-arenas">
          <h2 id="all-arenas" className="sr-only">
            All six arenas
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARENAS.map((arena) => (
              <Reveal key={arena.id}>
                <ArenaCard arena={arena} capacity={ARENA_CAPACITY} />
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="which-games" className="mt-16">
          <h2
            id="which-games"
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
          >
            Which games suit which arena
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
            This is a guide, not a schedule. Any game can be queued in the lobby
            and will run wherever there is room, so treat these pairings as
            recommendations rather than guarantees.
          </p>

          <div className="mt-8 space-y-6">
            {ARENAS.map((arena) => {
              const games = gamesForArena(arena.id);
              return (
                <div
                  key={arena.id}
                  className="glass rounded-card p-6"
                  style={{
                    borderColor: `color-mix(in srgb, ${arena.hue} 24%, var(--border))`,
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <p
                      className="label-mono rounded-pill px-3 py-1.5"
                      style={{
                        color: arena.hue,
                        backgroundColor: `color-mix(in srgb, ${arena.hue} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${arena.hue} 32%, transparent)`,
                      }}
                    >
                      {arena.id}
                    </p>
                    <h3 className="text-lg font-extrabold text-ink">
                      {arena.format}
                    </h3>
                    <p className="label-mono ml-auto text-ink-muted">
                      Typical {arena.typicalPlayers} · capacity {ARENA_CAPACITY}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {arena.suited}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {games.map((game) => (
                      <li
                        key={game.id}
                        className="label-mono rounded-[8px] border border-hairline px-2.5 py-1.5 text-ink-muted"
                      >
                        {game.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </PageShell>
    </>
  );
}

function arenaListJsonLd() {
  return {
    "@type": "ItemList",
    name: "TheySix Events arenas",
    itemListElement: ARENAS.map((arena, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoGame",
        name: `${arena.id} — ${arena.format}`,
        description: arena.summary,
        url: `${SITE_URL}/arenas#${arena.id.toLowerCase()}`,
        gamePlatform: "Minecraft",
        playMode: "MultiPlayer",
        numberOfPlayers: arena.typicalPlayers,
      },
    })),
  };
}
