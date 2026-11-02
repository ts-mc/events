import type { Metadata } from "next";
import { ExternalLink, Vote } from "lucide-react";

import { PageHero, PageShell } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Vote for TheySix Events",
  description:
    "Vote for TheySix Events on Minecraft server lists and help more players find the server.",
  alternates: { canonical: "/vote" },
};

const VOTE_LINKS = [
  { name: "DankMinecraftServers", url: "https://dankminecraftservers.com/server/theysix-events" },
  { name: "MinecraftServers", url: "https://minecraftservers.org/vote/694846" },
  { name: "TopG", url: "https://topg.org/minecraft-servers/server-687301" },
  { name: "MinecraftBuzz", url: "https://minecraft.buzz/vote/theysix-events" },
  { name: "Minecraft-MP", url: "https://minecraft-mp.com/server/365557/vote" },
];

export default function VotePage() {
  return (
    <>
      <PageHero
        eyebrow="Support the server"
        title={<>Vote for <span className="text-gradient">TheySix Events.</span></>}
        description="A vote helps other players discover the server. Open a listing below and follow its instructions to cast your vote."
      />
      <PageShell>
        <section className="mx-auto max-w-3xl" aria-label="Vote links">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {VOTE_LINKS.map((link, index) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-5 py-5 transition-colors hover:bg-brand/5"
                >
                  <span className="flex items-center gap-4">
                    <span className="label-mono text-brand">0{index + 1}</span>
                    <span>
                      <strong className="block text-lg text-ink">{link.name}</strong>
                      <span className="text-sm text-ink-muted">Open voting page</span>
                    </span>
                  </span>
                  <ExternalLink size={18} aria-hidden className="shrink-0 text-brand transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3 border-l-2 border-brand bg-surface/50 p-5 text-sm leading-relaxed text-ink-muted">
            <Vote size={18} aria-hidden className="mt-0.5 shrink-0 text-brand" />
            <p>Each listing has its own voting rules and cooldown. Check the page for when you can vote again.</p>
          </div>
        </section>
      </PageShell>
    </>
  );
}
