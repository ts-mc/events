import Link from "next/link";

import { CategoryChip } from "@/components/CategoryChip";
import { CopyValue } from "@/components/CopyValue";
import type { Game } from "@/data/games";
import { gameCommand } from "@/data/games";

/** A searchable archive entry with the game's facts and join command. */
export function GameCard({ game }: { game: Game }) {
  return (
    <article
      className="grid gap-4 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,auto)] lg:gap-10"
    >
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-tight text-brand">{game.name}</h3>
          <CategoryChip category={game.category} />
        </div>
        <p className="mt-2 text-sm leading-[1.55] text-ink-muted">{game.description}</p>
      </div>
      <div>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="label-mono text-ink-muted">Round</dt>
            <dd className="mt-1 font-mono text-sm font-bold text-ink">{game.roundSeconds}s</dd>
          </div>
          <div>
            <dt className="label-mono text-ink-muted">Win by</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{game.winCondition}</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {game.arenas.map((arena) => (
              <li key={arena}>
                <Link
                  href={`/arenas#${arena.toLowerCase()}`}
                  className="label-mono rounded-control border border-hairline px-2 py-1 text-ink-muted transition-colors duration-150 hover:border-hairline-hover hover:text-ink"
                >
                  {arena}
                </Link>
              </li>
            ))}
          </ul>
          <CopyValue value={gameCommand(game)} label="Copy command" copiedLabel="Copied" variant="secondary" size="sm" />
        </div>
      </div>
    </article>
  );
}
