import {
  Box,
  Fingerprint,
  Grid3x3,
  MessageCircle,
  ScanSearch,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import { CopyValue } from "@/components/CopyValue";
import { JsonLd } from "@/components/JsonLd";
import {
  Bullet,
  Callout,
  PageShell,
  PageHero,
  Prose,
  ProseList,
  ProseP,
  TextLink,
} from "@/components/Primitives";
import { LiveStatusPanel } from "@/components/LiveStatusPanel";
import { MotdPreview } from "@/components/MotdPreview";
import {
  ARENA_CAPACITY,
  ARENA_COUNT,
  BEDROCK_HOST,
  BEDROCK_PORT,
  DISCORD_BRIDGE_CHANNEL,
  DISCORD_URL,
  DISCORD_VERIFICATION_BOT_ID,
  DISCORD_VERIFICATION_NAME,
  DISCORD_VERIFICATION_URL,
  GAME_COUNT,
  JAVA_VERSION,
  MAX_PLAYERS,
  MIN_CLIENT,
  SERVER_ADDRESS,
  SERVER_ADDRESS_BARE,
  SERVER_SOFTWARE,
  SERVER_VERSION,
  SITE_URL,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Server and technical info",
  description: `TheySix Events runs ${SERVER_SOFTWARE} ${SERVER_VERSION}, needs ${JAVA_VERSION}, accepts clients ${MIN_CLIENT} and newer, supports Java and Bedrock cross-play, and caps at ${MAX_PLAYERS} players.`,
  alternates: { canonical: "/server" },
};

export default function ServerPage() {
  return (
    <>
      <PageHero
        eyebrow="Technical"
        title={
          <>
            What is{" "}
            <span className="text-gradient">under the lobby.</span>
          </>
        }
        description="The concrete details: what runs it, what you can connect with, how many players fit, and what is built into the server beyond the games themselves."
      />

      <PageShell>
        <JsonLd data={softwareJsonLd()} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,720px)_240px] lg:justify-center lg:items-start">
          <div className="space-y-16">
            <section aria-labelledby="live">
              <h2
                id="live"
                className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
              >
                Live status
              </h2>
              <Prose>
                <ProseP>
                  This is queried from the server itself every time you load the
                  page, so it reflects the real player count rather than a
                  hardcoded number. If the query fails we say so instead of
                  guessing.
                </ProseP>
              </Prose>
              <div className="mt-6">
                <LiveStatusPanel />
              </div>
            </section>

            <section aria-labelledby="core">
              <h2
                id="core"
                className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
              >
                Core details
              </h2>
              <dl className="mt-6 border-t border-hairline">
                <Spec
                  icon={Server}
                  label="Server software"
                  value={`${SERVER_SOFTWARE} ${SERVER_VERSION}`}
                />
                <Spec icon={Box} label="Java required" value={JAVA_VERSION} />
                <Spec
                  icon={Sparkles}
                  label="Supported clients"
                  value={`${MIN_CLIENT} and newer`}
                />
                <Spec
                  icon={MessageCircle}
                  label="Cross-play"
                  value={`Java + Bedrock · ${BEDROCK_HOST}:${BEDROCK_PORT}`}
                />
                <Spec
                  icon={Grid3x3}
                  label="Capacity"
                  value={`${MAX_PLAYERS} players server-wide`}
                />
                <Spec
                  icon={Fingerprint}
                  label="Online mode"
                  value="Enabled"
                />
              </dl>

              <div className="mt-6">
                <Callout tone="amber" title="Online mode is on">
                  The server verifies that your account has actually bought
                  Minecraft before it lets you in. That is why some clients get
                  rejected on join, and it is not something that can be
                  worked around.
                </Callout>
              </div>
            </section>

            <section aria-labelledby="arenas-detail">
              <h2
                id="arenas-detail"
                className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
              >
                Arenas
              </h2>
              <Prose>
                <ProseP>
                  {ARENA_COUNT} arenas, {ARENA_CAPACITY} players each. Every game
                  defines exactly {ARENA_CAPACITY} spawn points, which is why
                  that number is the hard ceiling per round rather than a soft
                  target. Team size is decided at match time from the players
                  present, so the format labels on the{" "}
                  <TextLink href="/arenas">arena guide</TextLink> describe intent
                  rather than a guarantee.
                </ProseP>
              </Prose>
            </section>

            <section aria-labelledby="features">
              <h2
                id="features"
                className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
              >
                What else is in the server
              </h2>
              <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
                <Feature
                  icon={Sparkles}
                  color="var(--magenta)"
                  title="Cosmetics"
                  body="Chat tags and other appearance-only items, bought with in-game credits in /ts store."
                />
                <Feature
                  icon={MessageCircle}
                  color="var(--brand-hi)"
                  title="Holograms and NPCs"
                  body="In-world signage and guides so key information is visible without leaving the lobby."
                />
                <Feature
                  icon={MessageCircle}
                  color="var(--blurple)"
                  title="Discord chat bridge"
                  body={`In-game chat is relayed to the Discord ${DISCORD_BRIDGE_CHANNEL} channel, and you can talk there from in game.`}
                />
                <Feature
                  icon={ShieldCheck}
                  color="var(--emerald)"
                  title="Anti-cheat"
                  body="Automated detection and intervention for movement and combat cheats."
                />
                <Feature
                  icon={ScanSearch}
                  color="var(--amber)"
                  title="Per-arena region protection"
                  body="Each arena is protected separately, so one round cannot affect what is happening in another."
                />
                <Feature
                  icon={Grid3x3}
                  color="var(--violet)"
                  title={`${GAME_COUNT} minigames`}
                  body="Across movement, elimination and party categories. All of them are votable from the lobby."
                />
              </ul>
            </section>

            <section aria-labelledby="motd">
              <h2
                id="motd"
                className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
              >
                Message of the day
              </h2>
              <Prose>
                <ProseP>
                  This is what you see in your server list. The message rotates
                  between game highlights, using the same gradients and spacing
                  as the server listing.
                </ProseP>
              </Prose>
              <MotdPreview />
            </section>

            <section aria-labelledby="address">
              <h2
                id="address"
                className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink"
              >
                Address
              </h2>
              <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
                <CopyValue value={SERVER_ADDRESS} label="Copy Java address" asBlock />
                <CopyValue value={`${BEDROCK_HOST}:${BEDROCK_PORT}`} label="Copy Bedrock IP" asBlock />
              </div>
              <Prose className="mt-6">
                <ProseList>
                  <Bullet>
                    Java players add{" "}
                    <code className="font-mono font-bold text-brand-hi">
                      {SERVER_ADDRESS_BARE}
                    </code>{" "}
                    in their multiplayer list.
                  </Bullet>
                  <Bullet>
                    Bedrock players use{" "}
                    <code className="font-mono font-bold text-brand-hi">{BEDROCK_HOST}</code>
                    {" "}on port{" "}
                    <code className="font-mono font-bold text-brand-hi">{BEDROCK_PORT}</code>.
                  </Bullet>
                  <Bullet>
                    Java clients can optionally specify the configured port as{" "}
                    <code className="font-mono font-bold text-brand-hi">
                      {SERVER_ADDRESS}
                    </code>
                    .
                  </Bullet>
                </ProseList>
              </Prose>
              <Callout tone="brand" title="Discord verification">
                On your first join, the server gives you a four-digit code.
                Direct message{" "}
                <a href={DISCORD_VERIFICATION_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-brand underline underline-offset-4">
                  {DISCORD_VERIFICATION_NAME}
                </a>{" "}
                with that code to verify and continue.
              </Callout>
            </section>
          </div>

          <aside className="min-w-0 border-l border-hairline pl-5 lg:sticky lg:top-8">
            <h2 className="label-mono text-brand">Quick facts</h2>
            <dl className="mt-5 space-y-0 text-sm">
              {[
                ["Software", `${SERVER_SOFTWARE} ${SERVER_VERSION}`],
                ["Java", JAVA_VERSION],
                ["Clients", `${MIN_CLIENT}+`],
                ["Games", String(GAME_COUNT)],
                ["Arenas", String(ARENA_COUNT)],
                ["Per arena", `${ARENA_CAPACITY} players`],
                ["Max players", String(MAX_PLAYERS)],
                ["Java address", SERVER_ADDRESS],
                ["Bedrock address", `${BEDROCK_HOST}:${BEDROCK_PORT}`],
                ["Verification bot", DISCORD_VERIFICATION_BOT_ID],
                ["Online mode", "On"],
                ["Website", "events-theysix.ro-mihaiu.xyz"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] items-start gap-x-3 border-b border-hairline/60 py-3 last:border-b-0"
                >
                  <dt className="label-mono min-w-0 text-ink-muted">{label}</dt>
                  <dd className="min-w-0 break-words text-right font-mono text-xs font-bold leading-relaxed text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono mt-6 block rounded-control bg-blurple/15 px-4 py-3 text-center text-blurple-text transition-colors duration-200 hover:bg-blurple/25"
            >
              Join the Discord
            </a>
          </aside>
        </div>
      </PageShell>
    </>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Server;
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-hairline py-4">
      <dt className="label-mono flex items-center gap-2 text-ink-muted">
        <Icon size={15} aria-hidden className="text-brand" />
        {label}
      </dt>
      <dd className="mt-2 font-mono text-sm font-bold text-ink">{value}</dd>
    </div>
  );
}

function Feature({
  icon: Icon,
  color,
  title,
  body,
}: {
  icon: typeof Server;
  color: string;
  title: string;
  body: string;
}) {
  return (
    <li className="py-5">
      <Icon size={20} aria-hidden style={{ color }} />
      <h3 className="mt-4 text-base font-extrabold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
    </li>
  );
}

function softwareJsonLd() {
  return {
    "@type": "SoftwareApplication",
    name: "TheySix Events",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    description: `Minecraft minigame server on ${SERVER_SOFTWARE} ${SERVER_VERSION} with ${GAME_COUNT} games across ${ARENA_COUNT} arenas.`,
    url: `${SITE_URL}/server`,
    softwareVersion: SERVER_VERSION,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}
