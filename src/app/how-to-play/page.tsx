import { Coffee, Tablet, Trophy, Users, Wallet } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { CommandTables } from "@/components/CommandTables";
import { CopyValue } from "@/components/CopyValue";
import { JsonLd } from "@/components/JsonLd";
import {
  Bullet,
  Callout,
  PageShell,
  PageHero,
  Prose,
  ProseH2,
  ProseList,
  ProseP,
  TextLink,
} from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { COMMAND_GROUPS } from "@/data/commands";
import {
  DISCORD_URL,
  GAME_COUNT,
  JAVA_VERSION,
  MIN_CLIENT,
  SERVER_ADDRESS,
  SERVER_ADDRESS_BARE,
  SERVER_PORT,
  SERVER_SOFTWARE,
  SERVER_VERSION,
  SITE_URL,
} from "@/data/site";

export const metadata: Metadata = {
  title: "How to play",
  description: `Join TheySix Events from Java or Bedrock, learn the lobby, vote for the next minigame and see every server command. Works from client ${MIN_CLIENT} onwards.`,
  alternates: { canonical: "/how-to-play" },
};

export default function HowToPlayPage() {
  return (
    <>
      <PageHero
        eyebrow="Full guide"
        title={
          <>
            From adding the server{" "}
            <span className="text-gradient">to your first win.</span>
          </>
        }
        description="Everything you need to get into an arena, what the lobby expects from you, and every command you can use once you are in."
      >
        <CopyValue value={SERVER_ADDRESS} asBlock />
      </PageHero>

      <PageShell>
        <JsonLd data={faqJsonLd()} />

        <section aria-labelledby="connect" className="max-w-3xl">
          <h2
            id="connect"
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
          >
            Getting connected
          </h2>
          <Prose>
            <ProseP>
              The server address is{" "}
              <code className="font-mono font-bold text-brand-hi">
                {SERVER_ADDRESS_BARE}
              </code>
              . Most clients only need the address, so add it as a server in
              your multiplayer list and you are done. If your client asks for a
              port as well, use{" "}
              <code className="font-mono font-bold text-brand-hi">
                {SERVER_ADDRESS}
              </code> &mdash; that is port {SERVER_PORT}.
            </ProseP>
            <ProseP>
              The server runs {SERVER_SOFTWARE} {SERVER_VERSION} and wants{" "}
              {JAVA_VERSION} to run. That only matters if you are self-hosting;
              as a player you just need a normal Minecraft launcher.
            </ProseP>
          </Prose>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-card p-6">
              <Coffee size={20} aria-hidden className="text-sky" />
              <h3 className="mt-4 text-lg font-extrabold text-ink">
                Java Edition
              </h3>
              <Prose>
                <ProseP>
                  Anything from {MIN_CLIENT} upwards connects. Newer clients work
                  best for the visual side of things, but an old client still
                  gets you in.
                </ProseP>
              </Prose>
            </div>
            <div className="glass rounded-card p-6">
              <Tablet size={20} aria-hidden className="text-teal" />
              <h3 className="mt-4 text-lg font-extrabold text-ink">
                Bedrock Edition
              </h3>
              <Prose>
                <ProseP>
                  Phone, console, tablet and Windows Bedrock all work. Add the
                  same address; the game handles the translation for you.
                </ProseP>
              </Prose>
            </div>
          </div>

          <div className="mt-4">
            <Callout tone="amber" title="Online mode is on">
              The server checks that your account actually owns Minecraft. That
              is why some clients get rejected on join, and why unofficial
              launchers will not get in. There is no workaround for this and we
              will not offer one.
            </Callout>
          </div>
        </section>

        <section aria-labelledby="lobby" className="mt-16 max-w-3xl">
          <h2
            id="lobby"
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
          >
            The lobby
          </h2>
          <Prose>
            <ProseP>
              You spawn in the lobby, not in a game. The lobby shows what is
              being voted on, how many players are waiting, and how long until
              the next round starts. From there you have three useful moves.
            </ProseP>
            <ProseList>
              <Bullet>
                <strong className="text-ink">Vote.</strong> Run{" "}
                <code className="font-mono font-bold text-brand-hi">
                  /ts vote
                </code>{" "}
                to back whatever you want to play next, or{" "}
                <code className="font-mono font-bold text-brand-hi">
                  /ts vote game
                </code>{" "}
                to name a specific one. This is the lobby vote, and it is
                always available.
              </Bullet>
              <Bullet>
                <strong className="text-ink">Quick join.</strong>{" "}
                <code className="font-mono font-bold text-brand-hi">
                  /ts quickjoin
                </code>{" "}
                drops you into any arena with space. This is the fastest way to
                start playing.
              </Bullet>
              <Bullet>
                <strong className="text-ink">Pick a specific arena.</strong>{" "}
                <code className="font-mono font-bold text-brand-hi">
                  /ts join PG-04
                </code>{" "}
                joins exactly the arena you name. When you want a particular
                format, this is the one.
              </Bullet>
            </ProseList>
            <ProseP>
              Prefer clicking to typing? Run{" "}
              <code className="font-mono font-bold text-brand-hi">/ts</code>{" "}
              (or{" "}
              <code className="font-mono font-bold text-brand-hi">/tse</code>)
              and a join menu opens instead. Older documentation may refer to
              this same command by a different alias;{" "}
              <code className="font-mono font-bold text-brand-hi">/ts</code> is
              the one to use.
            </ProseP>
            <ProseP>
              Need to back out mid-round?{" "}
              <code className="font-mono font-bold text-brand-hi">
                /ts leave
              </code>{" "}
              returns you to the lobby.
            </ProseP>
          </Prose>
        </section>

        <section aria-labelledby="arenas" className="mt-16 max-w-3xl">
          <h2
            id="arenas"
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
          >
            Arenas and teams
          </h2>
          <Prose>
            <ProseP>
              There are six arenas, and each one holds up to 24 players. Team
              formats are decided when the round starts from how many players
              are actually there, so a five-a-side map played by four people
              becomes a smaller match. In team-format games, pick your side
              with{" "}
              <code className="font-mono font-bold text-brand-hi">
                /ts team
              </code>{" "}
              or join a specific team with{" "}
              <code className="font-mono font-bold text-brand-hi">
                /ts team join 1
              </code>
              .
            </ProseP>
          </Prose>
          <p className="mt-5">
            <TextLink href="/arenas">Read the full arena guide</TextLink> for
            what each map is built for.
          </p>
        </section>

        <section aria-labelledby="parties" className="mt-16 max-w-3xl">
          <h2
            id="parties"
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
          >
            Parties
          </h2>
          <Prose>
            <ProseP>
              Playing with friends does not require being in the same arena at
              the same second. Form a party and you will be pulled into the same
              rounds together.
            </ProseP>
            <ProseList>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /ts party list
                </code>{" "}
                &mdash; see your party
              </Bullet>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /ts party create
                </code>{" "}
                &mdash; start one
              </Bullet>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /ts party invite &lt;player&gt;
                </code>{" "}
                &mdash; bring someone in
              </Bullet>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /ts party join &lt;player&gt;
                </code>{" "}
                &mdash; join theirs
              </Bullet>
            </ProseList>
          </Prose>
        </section>

        <section aria-labelledby="progress" className="mt-16 max-w-3xl">
          <h2
            id="progress"
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
          >
            Stats, leaderboards, levels and achievements
          </h2>
          <Prose>
            <ProseP>
              Everything you play is tracked, and it is all readable in-game.
            </ProseP>
            <ProseList>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /ts stats
                </code>{" "}
                opens your stats. Narrow it with a category, and switch between{" "}
                <code className="font-mono font-bold text-brand-hi">
                  alltime
                </code>
                ,{" "}
                <code className="font-mono font-bold text-brand-hi">
                  monthly
                </code>{" "}
                and{" "}
                <code className="font-mono font-bold text-brand-hi">yearly</code>{" "}
                views, paging through with a page number.
              </Bullet>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /ts tops [category]
                </code>{" "}
                &mdash; leaderboards. Useful for finding out who to party with.
              </Bullet>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /ts achievements
                </code>{" "}
                &mdash; what you have unlocked and what is still outstanding.
              </Bullet>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /ts level
                </code>{" "}
                &mdash; your level and XP progress.
              </Bullet>
            </ProseList>
          </Prose>
        </section>

        <section aria-labelledby="cosmetics" className="mt-16 max-w-3xl">
          <h2
            id="cosmetics"
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
          >
            Cosmetics and credits
          </h2>
          <Prose>
            <ProseP>
              Credits are the in-game currency. You earn them by playing, and
              spend them in the cosmetic store on things that change how you look
              without changing how you play.
            </ProseP>
            <ProseList>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /ts store
                </code>{" "}
                &mdash; the cosmetic store
              </Bullet>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">/tags</code>{" "}
                &mdash; the tag shown next to your name in chat
              </Bullet>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /glow &lt;colour&gt;
                </code>{" "}
                &mdash; the outline glow around your character
              </Bullet>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /cosmetics
                </code>{" "}
                &mdash; everything you own
              </Bullet>
              <Bullet>
                <code className="font-mono font-bold text-brand-hi">
                  /balance
                </code>{" "}
                and{" "}
                <code className="font-mono font-bold text-brand-hi">
                  /pay &lt;player&gt; &lt;amount&gt;
                </code>{" "}
                &mdash; check and send credits
              </Bullet>
            </ProseList>
            <Callout tone="amber" title="There is no purchase on this website">
              Everything above happens inside the game with in-game credits.
              This website has no payment flow, no checkout and no pricing page,
              and any site claiming to sell credits for this server is not us.
            </Callout>
          </Prose>
        </section>

        <section aria-labelledby="voting" className="mt-16 max-w-3xl">
          <h2
            id="voting"
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
          >
            Two different things called voting
          </h2>
          <Prose>
            <ProseP>
              These are unrelated, and mixing them up is the single most common
              confusion on this server.
            </ProseP>
          </Prose>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-card p-6">
              <Trophy size={20} aria-hidden className="text-magenta" />
              <h3 className="mt-4 text-base font-extrabold text-ink">
                In-arena vote &mdash; live now
              </h3>
              <Prose>
                <ProseP>
                  <code className="font-mono font-bold text-brand-hi">
                    /ts vote
                  </code>{" "}
                  chooses the next minigame in the lobby. It is always
                  available and it is what most people mean when they say voting.
                </ProseP>
              </Prose>
            </div>
            <div className="glass rounded-card p-6">
              <Wallet size={20} aria-hidden className="text-ink-muted" />
              <h3 className="mt-4 text-base font-extrabold text-ink">
                Server-list vote &mdash; being rolled out
              </h3>
              <Prose>
                <ProseP>
                  <code className="font-mono font-bold text-brand-hi">
                    /vote
                  </code>{" "}
                  registers your vote on a Minecraft server directory. This is
                  still being set up. We are not announcing a reward schedule
                  until it is live and tested.
                </ProseP>
              </Prose>
            </div>
          </div>
        </section>

        <section aria-labelledby="commands" className="mt-16">
          <h2
            id="commands"
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
          >
            Every command
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
            Every command below is player-facing. Each row has its own copy
            button, and the address is copyable from the block at the end.
          </p>
          <div className="mt-8">
            <CommandTables groups={COMMAND_GROUPS} />
          </div>
        </section>

        <section aria-labelledby="next" className="mt-16">
          <Reveal>
<div className="glass rounded-panel p-8">
                <h2
                  id="next"
                  className="text-2xl font-extrabold text-ink"
                >
                  Nothing playing that you like?
                </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
                All {GAME_COUNT} games are votable from the lobby, and we add
                more over time. Announcements and session news go out on
                Discord first, so that is the place to watch if you want to know
                what is coming.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={DISCORD_URL} variant="secondary" size="md">
                  <Users size={16} aria-hidden />
                  Join the Discord
                </Button>
                <Button href="/games" variant="ghost" size="md">
                  Browse all games
                </Button>
                <Button href="/server" variant="ghost" size="md">
                  <Wallet size={16} aria-hidden />
                  Technical details
                </Button>
              </div>
            </div>
          </Reveal>
        </section>

        <Prose className="mt-16">
          <ProseH2>Related pages</ProseH2>
          <ProseList>
            <Bullet>
              <TextLink href="/games">All {GAME_COUNT} minigames</TextLink>
            </Bullet>
            <Bullet>
              <TextLink href="/arenas">The six arenas</TextLink>
            </Bullet>
            <Bullet>
              <TextLink href="/ranks">Ranks and how to get them</TextLink>
            </Bullet>
            <Bullet>
              <TextLink href="/server">Version, Java requirement and features</TextLink>
            </Bullet>
            <Bullet>
              <TextLink href="/tos">Terms of service</TextLink>
            </Bullet>
          </ProseList>
          <p className="text-sm text-ink-muted">
            Site: {SITE_URL}
          </p>
        </Prose>
      </PageShell>
    </>
  );
}

function faqJsonLd() {
  return {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the server address for TheySix Events?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Add ${SERVER_ADDRESS_BARE} to your multiplayer list. If your client asks for a port, use ${SERVER_ADDRESS} (port ${SERVER_PORT}).`,
        },
      },
      {
        "@type": "Question",
        name: "Can I play on Bedrock Edition?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Java and Bedrock connect to the same address, and the server handles the translation between them.",
        },
      },
      {
        "@type": "Question",
        name: "How do I join an arena?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Run /ts quickjoin to enter any arena with space, /ts join PG-03 to enter a specific arena, or /ts to open the join menu.",
        },
      },
      {
        "@type": "Question",
        name: "Why was I rejected when joining?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Online mode is enabled, so the server only accepts accounts that own Minecraft. Clients without a valid purchase cannot connect.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between /ts vote and /vote?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "/ts vote chooses the next minigame in the lobby and is always available. /vote registers a vote for the server on a Minecraft server directory and is still being rolled out.",
        },
      },
    ],
  };
}
