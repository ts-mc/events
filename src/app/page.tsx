import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { CopyValue } from "@/components/CopyValue";
import { GlowOrb } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ServerBadge, StatStrip } from "@/components/StatStrip";
import { GameExplorer } from "@/components/GameExplorer";
import { Callout, PageShell } from "@/components/Primitives";
import { ArenaCard } from "@/components/ArenaCard";
import { RankTeaser } from "@/components/RankLadder";
import { Section } from "@/components/Section";
import { ARENAS } from "@/data/arenas";
import {
  ARENA_COUNT,
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
  description: `A Minecraft minigame server with ${GAME_COUNT} games across ${ARENA_COUNT} arenas. Join on theysix.sparked.network from Java or Bedrock, clients ${MIN_CLIENT} and newer.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={serverJsonLd()} />
      <Hero />
      <StatStrip />
      <GamesSection />
      <ArenasSection />
      <HowToPlaySection />
      <RanksSection />
      <RulesSection />
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
    <div className="relative isolate overflow-hidden border-b border-hairline">
      <GlowOrb color="var(--brand)" className="-left-28 -top-36" opacity={0.13} />
      <GlowOrb
        color="var(--violet)"
        className="-right-24 top-16"
        size={340}
        opacity={0.11}
      />
      <GlowOrb
        color="var(--sky)"
        className="bottom-[-12rem] left-1/3 hidden md:block"
        size={320}
        opacity={0.09}
      />

      <div className="shell relative py-16 sm:py-24 lg:py-28">
        <Reveal>
          <ServerBadge />
          <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.02]">
            <span className="text-gradient">19 MINIGAMES.</span>
            <br />
            6 ARENAS. ONE SERVER.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {SERVER_NAME} is a Minecraft minigame server where every round is a
            short, loud fight. Race the clock, duel a friend, or vote for what
            the lobby plays next. Java and Bedrock play on the same address.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CopyValue value="theysix.sparked.network" label="Copy theysix.sparked.network" size="lg" />
            <Button href={DISCORD_URL} variant="secondary" size="lg">
              Join the Discord
            </Button>
            <Button href="#games" variant="ghost" size="lg">
              Browse the games
              <ArrowRight size={18} aria-hidden />
            </Button>
          </div>

          <p className="mt-6 font-mono text-xs text-ink-muted">
            Add <span className="text-brand">theysix.sparked.network</span> as a
            server, or paste{" "}
            <span className="text-brand">theysix.sparked.network:25625</span> if
            your client asks for a port.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

function GamesSection() {
  return (
    <div className="border-b border-hairline">
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
          description="Search by name or filter by category. Every card shows the round length, how you win, and the exact command to join."
        >
          <GameExplorer />
        </Section>
      </PageShell>
    </div>
  );
}

function ArenasSection() {
  return (
    <div className="border-b border-hairline bg-bg/60">
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
          description="Every arena holds up to 24 players. Team size is worked out when the round starts, from however many players turned up."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARENAS.map((arena) => (
              <ArenaCard key={arena.id} arena={arena} />
            ))}
          </div>
        </Section>
      </PageShell>
    </div>
  );
}

function HowToPlaySection() {
  return (
    <div className="border-b border-hairline">
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
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HOW_TO_PLAY_STEPS.map((step, index) => (
              <li key={step.title}>
                <Reveal stagger>
                  <div
                    data-reveal-child
                    className="glass glass-hover card-hue flex h-full flex-col rounded-card p-6"
                    style={{ ["--card-hue" as string]: step.hue }}
                  >
                    <span
                      className="label-mono inline-flex size-9 items-center justify-center rounded-[10px]"
                      style={{
                        color: step.hue,
                        backgroundColor: `color-mix(in srgb, ${step.hue} 14%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${step.hue} 30%, transparent)`,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
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
    <div className="border-b border-hairline bg-bg/60">
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
    <div className="border-b border-hairline">
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
          <ol className="grid gap-4 md:grid-cols-2">
            {RULES.map((rule, index) => (
              <li key={rule.title}>
                <Reveal stagger>
                  <div
                    data-reveal-child
                    className="flex h-full gap-4 rounded-card border border-hairline bg-surface/50 p-5"
                  >
                    <span className="label-mono shrink-0 text-crimson">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-ink">{rule.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                        {rule.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
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
