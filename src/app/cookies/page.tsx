import type { Metadata } from "next";

import { PageShell, PageHero } from "@/components/Primitives";
import { BUSINESS_EMAIL, DISCORD_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "The TheySix Events website sets no cookies. The only thing stored is your choice about the cookie notice, kept in your browser's local storage.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie policy"
        description="Short version: this website sets no cookies at all. Here is the detail on what is stored and why."
      />

      <PageShell>
        <div className="max-w-3xl space-y-10 text-base leading-relaxed text-ink-muted">
          <section aria-labelledby="summary">
            <h2
              id="summary"
              className="text-2xl font-extrabold text-ink"
            >
              The short version
            </h2>
            <p className="mt-4">
              This website does not use cookies. It also does not use analytics,
              advertising, tracking pixels, fingerprinting or any third-party
              script that would build a profile of you. Nothing about your visit
              is collected, sold or shared with anyone.
            </p>
          </section>

          <section aria-labelledby="what-is-stored">
            <h2
              id="what-is-stored"
              className="text-2xl font-extrabold text-ink"
            >
              What is actually stored
            </h2>
            <p className="mt-4">
              There is exactly one thing, and it lives in your browser rather
              than on a server:
            </p>
            <dl className="mt-5 space-y-4 rounded-card border border-hairline bg-surface/50 p-6">
              <div>
                <dt className="label-mono text-brand">Consent flag</dt>
                <dd className="mt-2 text-sm">
                  When you close the cookie notice on this site, we write the
                  fact that you have seen it into your browser&apos;s local
                  storage, under the key{" "}
                  <code className="font-mono font-bold text-brand-hi">
                    theysix-events:cookie-consent
                  </code>
                  . It contains nothing but the time you dismissed the notice.
                </dd>
              </div>
              <div>
                <dt className="label-mono text-brand">Not sent anywhere</dt>
                <dd className="mt-2 text-sm">
                  Local storage stays on your device. It is never transmitted to
                  us or to anyone else, we cannot read it from our side, and
                  clearing your browser data removes it permanently.
                </dd>
              </div>
              <div>
                <dt className="label-mono text-brand">No consent needed</dt>
                <dd className="mt-2 text-sm">
                  Because nothing is tracked and no personal data is collected,
                  there is nothing for you to opt in to. Dismissing the notice
                  is a convenience for both of us, not a permission grant.
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="server-side">
            <h2 id="server-side" className="text-2xl font-extrabold text-ink">
              What the server does see
            </h2>
            <p className="mt-4">
              Every website server processes technical information to deliver a
              page, and ours is no different. Resolving a page involves an IP
              address and a user agent string arriving at the hosting provider
              that serves the site. We do not add identifiers on top of that, we
              do not build a history of your visits, and we do not use any of it
              for advertising.
            </p>
            <p className="mt-4">
              The site also queries our own Minecraft server to show you the live
              player count. That query runs entirely on our side; your browser
              never contacts the game server directly.
            </p>
          </section>

          <section aria-labelledby="changes">
            <h2 id="changes" className="text-2xl font-extrabold text-ink">
              If this ever changes
            </h2>
            <p className="mt-4">
              If analytics or any other data collection is ever added, it will be
              consent-gated and this page will be rewritten before it goes live,
              so it describes what the site actually does rather than what we
              hope it will do. If you have a question in the meantime, email{" "}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="tap-target font-medium text-brand underline-offset-4 hover:text-brand-hi hover:underline"
              >
                {BUSINESS_EMAIL}
              </a>{" "}
              or ask in{" "}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target font-medium text-brand underline-offset-4 hover:text-brand-hi hover:underline"
              >
                our Discord
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="disclaimer">
            <h2
              id="disclaimer"
              className="text-2xl font-extrabold text-ink"
            >
              Disclaimer
            </h2>
            <p className="mt-4">
              This server and website are <strong className="text-ink">not</strong>{" "}
              an official Minecraft product. They are{" "}
              <strong className="text-ink">not</strong> approved by or associated
              with Mojang Studios or Microsoft.
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
