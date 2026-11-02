import Link from "next/link";

import { CopyValue } from "@/components/CopyValue";
import type { Arena } from "@/data/arenas";
import { arenaJoinCommand } from "@/data/arenas";

/** One arena archive entry with its format, capacity, and join command. */
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
      className="grid scroll-mt-28 gap-4 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,auto)] lg:gap-10"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="label-mono text-brand">{arena.id}</p>
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
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{arena.summary}</p>
      </div>
      <div>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="label-mono text-ink-muted">Capacity</dt>
            <dd className="mt-1 font-mono text-sm font-bold text-ink">{capacity} players</dd>
          </div>
          <div>
            <dt className="label-mono text-ink-muted">Typical</dt>
            <dd className="mt-1 font-mono text-sm font-bold text-ink">{arena.typicalPlayers} players</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <CopyValue value={arenaJoinCommand(arena)} label="Copy command" copiedLabel="Copied" variant="secondary" size="sm" />
          <Link
            href="/games#games"
            className="label-mono rounded-control px-3 py-2 text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            Which games?
          </Link>
        </div>
      </div>
    </article>
  );
}
