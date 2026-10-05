import type { Metadata } from "next";

import { GamesIndex } from "@/components/GamesIndex";
import { PageShell, PageHero } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { GAME_COUNT, SERVER_NAME, SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: `All ${GAME_COUNT} minigames`,
  description: `The complete TheySix Events minigame list: ${GAME_COUNT} games across movement, elimination and party categories, with round lengths, win conditions and the command to join each one.`,
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  return (
    <>
      <PageHero
        eyebrow="Reference index"
        title={
          <>
            Every game,{" "}
            <span className="text-gradient">nothing hidden.</span>
          </>
        }
        description={`All ${GAME_COUNT} minigames on ${SERVER_NAME}, grouped by category. Each entry lists how long a round runs, how you win, which arenas suit it, and the exact command to drop in.`}
      />
      <PageShell>
        <Reveal>
          <GamesIndex />
        </Reveal>
      </PageShell>
      <p className="sr-only">
        Server address: theysix.sparked.network, port 25625. Site: {SITE_URL}
      </p>
    </>
  );
}
