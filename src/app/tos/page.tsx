import type { Metadata } from "next";

import { PageShell, PageHero } from "@/components/Primitives";
import { BUSINESS_EMAIL, DISCORD_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The rules for using the TheySix Events Minecraft server and this website, including conduct, bans, availability and the Minecraft and Mojang disclaimer.",
  alternates: { canonical: "/tos" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        description="What you agree to by joining the server or using this website. Written to be read once, not skimmed."
      />

      <PageShell>
        <div className="max-w-3xl space-y-10 text-base leading-relaxed text-ink-muted">
          <section aria-labelledby="acceptance">
            <h2 id="acceptance" className="text-2xl font-extrabold text-ink">
              1. Acceptance
            </h2>
            <p className="mt-4">
              By connecting to the TheySix Events Minecraft server, or by using
              this website, you agree to these terms. If you do not agree, do
              not play and do not use the site. These terms can change; if they
              do in a way that matters, the change will be announced in Discord
              rather than slipped in quietly.
            </p>
          </section>

          <section aria-labelledby="conduct">
            <h2 id="conduct" className="text-2xl font-extrabold text-ink">
              2. Conduct
            </h2>
            <p className="mt-4">
              The server is a shared space. The following are not allowed:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-brand">
              <li>
                Harassment, slurs, threats or targeted behaviour of any kind.
              </li>
              <li>
                Cheating, hacked clients, unfair macros, exploits or anything
                else that gives you or your team an advantage.
              </li>
              <li>
                Griefing or deliberately breaking a game so it ends early for
                everyone.
              </li>
              <li>
                Advertising other servers, communities or services.
              </li>
              <li>
                Impersonating staff or other players.
              </li>
              <li>
                Illegal activity, or anything that exposes the server or its
                players to harm.
              </li>
            </ul>
            <p className="mt-4">
              Mild, good-natured banter between friends is fine. If staff ask you
              to stop, stop.
            </p>
          </section>

          <section aria-labelledby="accounts">
            <h2 id="accounts" className="text-2xl font-extrabold text-ink">
              3. Accounts and bans
            </h2>
            <p className="mt-4">
              Minecraft accounts are not owned by us, and neither is any in-game
              cosmetic or credit attached to them. Staff may mute, kick or ban
              accounts that break these terms. Bans are not negotiable in chat.
            </p>
            <p className="mt-4">
              If you believe a decision was wrong, open a ticket in Discord
              rather than arguing in game, and do not direct message individual
              staff members.
            </p>
            <p className="mt-4">
              Selling, gifting or trading ranks is not allowed. No legitimate
              member of staff will ever offer to sell you one for money, and any
              account claiming otherwise is lying.
            </p>
          </section>

          <section aria-labelledby="availability">
            <h2 id="availability" className="text-2xl font-extrabold text-ink">
              4. Availability
            </h2>
            <p className="mt-4">
              We do not promise permanent uptime. The server goes down for
              updates, restarts and the occasional emergency. Features,
              balances, game lists and player counts can change at any time
              without notice, and anything on this website may lag behind the
              live server.
            </p>
          </section>

          <section aria-labelledby="content">
            <h2 id="content" className="text-2xl font-extrabold text-ink">
              5. Website content and files
            </h2>
            <p className="mt-4">
              This website is provided as-is, for information. It is a community
              project, not a commercial product. We try to keep the information
              accurate but we do not warrant that every detail is current.
            </p>
            <p className="mt-4">
              Any downloadable or in-game file we offer is provided as-is for
              personal, educational, non-commercial Minecraft use. We are not
              responsible for third-party software you choose to run alongside
              our server.
            </p>
          </section>

          <section aria-labelledby="no-liability">
            <h2 id="no-liability" className="text-2xl font-extrabold text-ink">
              6. Limitation of liability
            </h2>
            <p className="mt-4">
              To the fullest extent permitted by law, the operators of TheySix
              Events are not liable for any loss arising from your use of the
              server or this website, including lost items, lost progress,
              service interruptions or connection problems.
            </p>
          </section>

          <section aria-labelledby="ip">
            <h2 id="ip" className="text-2xl font-extrabold text-ink">
              7. Intellectual property
            </h2>
            <p className="mt-4">
              Minecraft is a trademark of Mojang Studios. All other brand and
              content rights on this site remain with their owners. The site
              design, written content and rank styling are ours to change as we
              see fit.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className="text-2xl font-extrabold text-ink">
              8. Contact
            </h2>
            <p className="mt-4">
              Questions about these terms can go to{" "}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="tap-target font-medium text-brand underline-offset-4 hover:text-brand-hi hover:underline"
              >
                {BUSINESS_EMAIL}
              </a>{" "}
              or to a staff member via a{" "}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target font-medium text-brand underline-offset-4 hover:text-brand-hi hover:underline"
              >
                Discord ticket
              </a>
              . Please never be asked for payment in exchange for a rank or a
              staff position.
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
