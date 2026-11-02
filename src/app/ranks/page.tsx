import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Callout, PageShell, PageHero } from "@/components/Primitives";
import { RankLadder, RankStaffNote } from "@/components/RankLadder";
import { Reveal } from "@/components/Reveal";
import { RANKS } from "@/data/ranks";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Ranks and progression",
  description:
    "The full TheySix Events rank ladder with its real in-game colours, what each rank grants and how to earn it. Default players already have access to every game.",
  alternates: { canonical: "/ranks" },
};

export default function RanksPage() {
  return (
    <>
      <PageHero
        eyebrow="Progression"
        title={
          <>
            The full ladder,{" "}
            <span className="text-gradient">highest rank first.</span>
          </>
        }
        description="These are the live in-game prefixes. Every player has Default, which already includes playing every game, stats, leaderboards, parties and in-arena voting."
      />

      <PageShell>
        <JsonLd data={ranksJsonLd()} />

        <Reveal>
          <RankLadder />
        </Reveal>

        <div className="mt-12 space-y-8">
          <RankStaffNote />

          <div className="border-t border-hairline pt-5">
            <h2 className="label-mono text-brand">How to actually get one</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
              <li>
                <strong className="text-ink">Staff ranks</strong> are given to
                people who join the team. There is no application shortcut &mdash;
                applications open periodically, through Discord.
              </li>
              <li>
                <strong className="text-ink">VIP</strong> comes from boosting the
                server or from perks you apply for. Ask in Discord rather than in
                chat.
              </li>
              <li>
                <strong className="text-ink">Voter</strong> is automatic: vote for
                the server four or more times inside 24 hours and the green
                prefix appears while that window is active.
              </li>
              <li>
                <strong className="text-ink">Default</strong> is everybody. You
                never need to do anything to get it.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <Callout tone="crimson" title="Nobody will ever sell you a rank">
            There is no purchase flow on this website and there never will be. If
            somebody in chat or on Discord offers to sell you a rank, treat it as
            a scam and report it. Real staff apply ranks themselves and will never
            take payment for one.
          </Callout>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/how-to-play" variant="secondary" size="md">
            Read the command guide
            <ArrowRight size={16} aria-hidden />
          </Button>
          <Button href="/games" variant="ghost" size="md">
            Browse the games
          </Button>
        </div>
      </PageShell>
    </>
  );
}

function ranksJsonLd() {
  return {
    "@type": "ItemList",
    name: "TheySix Events ranks",
    itemListElement: RANKS.map((rank, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "DefinedTerm",
        name: rank.name,
        description: rank.grants,
        inDefinedTermSet: `${SITE_URL}/ranks`,
      },
    })),
  };
}
