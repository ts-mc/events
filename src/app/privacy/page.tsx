import type { Metadata } from "next";

import { PageShell, PageHero } from "@/components/Primitives";
import { BUSINESS_EMAIL, DISCORD_URL, SERVER_ADDRESS } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What TheySix Events collects: nothing on this website beyond standard request logs, and only the minimum needed to run a Minecraft server.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="The honest version: this website collects almost nothing, and the Minecraft server collects only what the game requires."
      />

      <PageShell>
        <div className="max-w-3xl space-y-10 text-base leading-relaxed text-ink-muted">
          <section aria-labelledby="summary">
            <h2 id="summary" className="text-2xl font-extrabold text-ink">
              The short version
            </h2>
            <p className="mt-4">
              This website has no accounts, no analytics, no advertising and no
              tracking. We do not ask for your name, your email or your Minecraft
              username in order to read a page. The only personal data anywhere in
              this project is the minimum the Minecraft server itself needs to
              let you play.
            </p>
          </section>

          <section aria-labelledby="website">
            <h2 id="website" className="text-2xl font-extrabold text-ink">
              This website
            </h2>
            <p className="mt-4">
              Reading any page means your browser connects to the host serving
              this site, which necessarily involves your IP address and user
              agent string. That is the same as visiting any website, and it is
              handled by the hosting provider rather than stored by us as a
              profile.
            </p>
            <p className="mt-4">
              We add no identifiers, keep no record of which pages you read in
              what order, and run no third-party scripts. One value is kept in
              your browser&apos;s local storage: a flag recording that you have
              seen the cookie notice. It never leaves your device.
            </p>
            <p className="mt-4">
              The live player count you see is fetched by our server from{" "}
              <code className="font-mono font-bold text-brand-hi">
                {SERVER_ADDRESS}
              </code>
              . Your browser never contacts the game server and no information
              about you is passed along.
            </p>
          </section>

          <section aria-labelledby="minecraft">
            <h2 id="minecraft" className="text-2xl font-extrabold text-ink">
              The Minecraft server
            </h2>
            <p className="mt-4">
              Joining the server requires Minecraft to send us the account
              identifier your client already uses, the display name you chose,
              and your public profile. That is not extra data we collect; it is
              what Minecraft itself transmits for every server.
            </p>
            <p className="mt-4">
              Because online mode is enabled, the server also checks your
              purchase status with Mojang. That check is handled by Minecraft and
              Minecraft&apos;s own infrastructure, and we do not store the result.
            </p>
            <p className="mt-4">
              On top of that, the server records gameplay data that only makes
              sense inside the game: your stats, leaderboard positions, level and
              XP, achievements, party membership, the credits you hold and the
              commands you have run. We keep it because the games are competitive
              and none of it would work without it.
            </p>
          </section>

          <section aria-labelledby="moderation">
            <h2 id="moderation" className="text-2xl font-extrabold text-ink">
              Moderation records
            </h2>
            <p className="mt-4">
              When something breaks our rules, staff record the relevant
              moderation action against the account involved. Those records are
              kept so that bans can be applied consistently and so appeals can be
              answered. We do not go looking for reasons to record accounts doing
              nothing wrong.
            </p>
          </section>

          <section aria-labelledby="chat">
            <h2 id="chat" className="text-2xl font-extrabold text-ink">
              Chat and Discord
            </h2>
            <p className="mt-4">
              In-game chat is bridged to our Discord, which means messages you
              send in game may also appear in a Discord channel, and messages you
              send in that Discord channel may appear in game. Discord is a
              separate service with its own privacy policy and its own data
              retention, and using it puts you under Discord&apos;s terms as well
              as ours.
            </p>
            <p className="mt-4">
              We do not scrape, export or analyse anything from Discord for
              marketing or profiling.
            </p>
          </section>

          <section aria-labelledby="rights">
            <h2 id="rights" className="text-2xl font-extrabold text-ink">
              Your choices
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-brand">
              <li>
                Clearing your browser data removes the cookie-notice flag and
                nothing else.
              </li>
              <li>
                You do not need to give us an email address to play, browse, or
                vote.
              </li>
              <li>
                If you want your gameplay data removed, ask. In-game stats are
                tied to your Minecraft account, so we can only act on requests
                made by someone who can prove control of it.
              </li>
              <li>
                Leaving the server is always an option, and it does not affect
                any other service of ours.
              </li>
            </ul>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className="text-2xl font-extrabold text-ink">
              Contact
            </h2>
            <p className="mt-4">
              Questions about any of this go to{" "}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="tap-target font-medium text-brand underline-offset-4 hover:text-brand-hi hover:underline"
              >
                {BUSINESS_EMAIL}
              </a>
              . You can also reach us through a{" "}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target font-medium text-brand underline-offset-4 hover:text-brand-hi hover:underline"
              >
                Discord ticket
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="disclaimer">
            <h2 id="disclaimer" className="text-2xl font-extrabold text-ink">
              Disclaimer
            </h2>
            <p className="mt-4">
              This server and website are{" "}
              <strong className="text-ink">not</strong> an official Minecraft
              product. They are <strong className="text-ink">not</strong> approved
              by or associated with Mojang Studios or Microsoft.
            </p>
            <p className="mt-4">
              Downloadable or in-game files are offered as-is for personal,
              educational, non-commercial Minecraft use.
            </p>
          </section>
        </div>
      </PageShell>
    </>
  );
}
