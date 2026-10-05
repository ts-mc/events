import Link from "next/link";

import { CopyValue } from "@/components/CopyValue";
import type { Arena } from "@/data/arenas";
import { arenaJoinCommand } from "@/data/arenas";

/**
 * One arena card. Each arena keeps its own hue so PG-01 … PG-06 stay
 * distinguishable at a glance; the hue is always paired with the arena ID and
 * format text, never used as the only signal.
 */
export function ArenaCard({
  arena,
  capacity = 24,
  headingLevel: Heading = "h3",
}: {
  arena: Arena;
  capacity?: number;
  /** Lets a page supply the heading level that fits its own outline. */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article
      id={arena.id.toLowerCase()}
      className="glass glass-hover card-hue flex h-full scroll-mt-28 flex-col rounded-card p-6"
      style={{ ["--card-hue" as string]: arena.hue }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className="label-mono"
            style={{ color: arena.hue }}
          >
            {arena.id}
          </p>
          <Heading className="mt-2 text-lg font-extrabold leading-tight text-ink">
            {arena.format}
          </Heading>
        </div>
        <span
          aria-hidden
          className="inline-block size-3 rounded-full"
          style={{ backgroundColor: arena.hue }}
        />
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
        {arena.summary}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-hairline pt-4">
        <div>
          <dt className="label-mono text-ink-muted">Capacity</dt>
          <dd className="mt-1 font-mono text-sm font-bold text-ink">
            {capacity} players
          </dd>
        </div>
        <div>
          <dt className="label-mono text-ink-muted">Typical</dt>
          <dd className="mt-1 font-mono text-sm font-bold text-ink">
            {arena.typicalPlayers} players
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <CopyValue
          value={arenaJoinCommand(arena)}
          label="Copy command"
          copiedLabel="Copied"
          variant="secondary"
          size="sm"
        />
        <Link
          href={`/games#games`}
          className="label-mono rounded-control px-3 py-2 text-ink-muted transition-colors duration-200 hover:text-ink"
        >
          Which games?
        </Link>
      </div>
    </article>
  );
}
