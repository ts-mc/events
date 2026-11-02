import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { CopyValue } from "@/components/CopyValue";
import { JsonLd } from "@/components/JsonLd";
import { ServerBadge, StatStrip } from "@/components/StatStrip";
import { GameExplorer } from "@/components/GameExplorer";
import { Callout, PageShell } from "@/components/Primitives";
import { ArenaCard } from "@/components/ArenaCard";
import { RankTeaser } from "@/components/RankLadder";
import { Section } from "@/components/Section";
import { ARENAS } from "@/data/arenas";
import {
  ARENA_COUNT,
  BEDROCK_HOST,
  BEDROCK_PORT,
  BUSINESS_EMAIL,
  DISCORD_URL,
  GAME_COUNT,
  MAX_PLAYERS,
  MIN_CLIENT,
  SERVER_NAME,
  SERVER_SOFTWARE,
  SERVER_VERSION,
  SITE_URL,
} from "@/data/site";
import { HOW_TO_PLAY_STEPS } from "@/data/steps";
import { RULES } from "@/data/rules";

export const metadata: Metadata = {
  title: `${SERVER_NAME} — ${GAME_COUNT} Minecraft minigames, ${ARENA_COUNT} arenas`,
  description: `A Minecraft minigame server with ${GAME_COUNT} games across ${ARENA_COUNT} arenas. Join at play.theysix.tech from Java or ${BEDROCK_HOST} on Bedrock, clients ${MIN_CLIENT} and newer.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={serverJsonLd()} />
      <div className="events-archive">
        <Hero />
        <StatStrip />
        <GamesSection />
        <ArenasSection />
        <HowToPlaySection />
        <RanksSection />
        <RulesSection />
      </div>
    </>
  );
}

function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SERVER_NAME,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "TheySix", url: SITE_URL },
  };
}

function serverJsonLd() {
  return {
    "@type": "VideoGame",
    "@id": `${SITE_URL}/#server`,
    name: SERVER_NAME,
    description: `Minecraft minigame server running ${SERVER_SOFTWARE} ${SERVER_VERSION} with ${GAME_COUNT} minigames across ${ARENA_COUNT} arenas. Java ${MIN_CLIENT}+ and Bedrock cross-play supported.`,
    url: `${SITE_URL}/`,
    gamePlatform: [
      "Minecraft: Java Edition",
      "Minecraft: Bedrock Edition",
    ],
    applicationCategory: "Game",
    operatingSystem: "Any",
    playMode: "MultiPlayer",
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: BUSINESS_EMAIL,
      availableLanguage: "English",
    },
    sameAs: [DISCORD_URL],
    publisher: { "@type": "Organization", name: "TheySix", url: SITE_URL },
  };
}

function Hero() {
  return (
    <header className="shell pt-16 sm:pt-24">
      <div className="max-w-[760px] pt-8 pb-12 sm:pt-12 sm:pb-20">
        <ServerBadge />
        <h1 className="mt-5 text-[clamp(2.8rem,7vw,6rem)] leading-[.94] tracking-[-.04em]">
          <span className="text-gradient">19 MINIGAMES.</span>
          <br />
          6 ARENAS. ONE SERVER.
        </h1>
        <p className="mt-5 max-w-[45rem] text-[1.08rem] leading-[1.75] text-ink-muted">
          {SERVER_NAME} is a Minecraft minigame server where every round is a
          short, loud fight. Race the clock, duel a friend, or vote for what
          the lobby plays next. Java and Bedrock connect through separate addresses.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <CopyValue value="play.theysix.tech:25625" label="Copy Java server address" size="lg" />
          <Button href={DISCORD_URL} variant="secondary" size="lg">Join the Discord</Button>
          <Button href="#games" variant="ghost" size="lg">
            Browse the games
            <ArrowRight size={18} aria-hidden />
          </Button>
        </div>

        <p className="mt-6 font-mono text-xs text-ink-muted">
          Java: <span className="text-brand">play.theysix.tech:25625</span>. Bedrock:{" "}
          <span className="text-brand">{BEDROCK_HOST}</span>, port{" "}
          <span className="text-brand">{BEDROCK_PORT}</span>.
        </p>
      </div>
    </header>
  );
}

function GamesSection() {
  return (
    <div className="events-section">
      <PageShell>
        <Section
          id="games"
          eyebrow="The full roster"
          title={
            <>
              Nineteen games.{" "}
              <span className="text-gradient">Pick your poison.</span>
            </>
          }
          description="Search by name or filter by category. Each entry shows the round length, how you win, and the exact command to join."
        >
          <GameExplorer />
        </Section>
      </PageShell>
    </div>
  );
}

function ArenasSection() {
  return (
    <div className="events-section">
      <PageShell>
        <Section
          id="arenas"
          eyebrow="Where rounds happen"
          title={
            <>
              Six arenas, each with{" "}
              <span className="text-gradient">its own colour.</span>
            </>
          }
          description="The server supports up to 999 players. Team size is worked out when each round starts, from however many players turned up."
        >
          <ul className="events-index">
            {ARENAS.map((arena) => <li key={arena.id}><ArenaCard arena={arena} /></li>)}
          </ul>
        </Section>
      </PageShell>
    </div>
  );
}

function HowToPlaySection() {
  return (
    <div className="events-section">
      <PageShell>
        <Section
          id="how-to-play"
          eyebrow="Getting in"
          title={
            <>
              Five steps from{" "}
              <span className="text-gradient">cold launcher to arena.</span>
            </>
          }
          description={
            <>
              Any client from {MIN_CLIENT} onwards works. Add the address, then
              the lobby will walk you through the rest.
            </>
          }
        >
          <ol className="events-index">
            {HOW_TO_PLAY_STEPS.map((step, index) => (
              <li key={step.title}>
                <div className="grid gap-2 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4">
                  <span className="label-mono text-brand">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="text-base font-bold text-brand">{step.title}</h3><p className="mt-1 text-sm leading-[1.55] text-ink-muted">{step.body}</p></div>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </PageShell>
    </div>
  );
}

function RanksSection() {
  return (
    <div className="events-section">
      <PageShell>
        <Section
          id="ranks"
          eyebrow="Progression"
          title={
            <>
              Ranks add perks.{" "}
              <span className="text-gradient">They are not a paywall.</span>
            </>
          }
          description="Every player already has everything needed to play: all games, stats, leaderboards, parties and in-arena voting. Ranks add extras on top."
        >
          <RankTeaser />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/ranks" variant="secondary" size="md">
              See the full ladder
              <ArrowRight size={16} aria-hidden />
            </Button>
            <Button href="/how-to-play" variant="ghost" size="md">
              Read the guide
            </Button>
          </div>
        </Section>
      </PageShell>
    </div>
  );
}

function RulesSection() {
  return (
    <div className="events-section">
      <PageShell>
        <Section
          id="rules"
          eyebrow="House rules"
          title={
            <>
              Six rules, kept{" "}
              <span className="text-gradient">short on purpose.</span>
            </>
          }
          description="The short version. The full wording lives in the terms."
        >
          <ol className="events-index">
            {RULES.map((rule, index) => (
              <li key={rule.title}>
                <div className="grid gap-2 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4">
                  <span className="label-mono text-brand">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="text-base font-bold text-brand">{rule.title}</h3><p className="mt-1 text-sm leading-[1.55] text-ink-muted">{rule.body}</p></div>
                </div>
              </li>
            ))}
          </ol>

          <Callout tone="amber" title="One thing worth knowing up front">
            Online mode is on, which means the server only accepts accounts that
            have actually bought Minecraft. If a client gets rejected on join,
            that is almost always why. It is not a bug and there is no way
            around it.
          </Callout>
        </Section>
      </PageShell>
    </div>
  );
}
