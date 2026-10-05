import Link from "next/link";

import { CategoryChip } from "@/components/CategoryChip";
import { CopyValue } from "@/components/CopyValue";
import type { Game } from "@/data/games";
import { CATEGORY_BY_SLUG, gameCommand } from "@/data/games";

/**
 * A single game card. The hover treatment is driven by the category hue through
 * the `--card-hue` variable: border and shadow both tint toward it.
 */
export function GameCard({ game }: { game: Game }) {
  const hue = CATEGORY_BY_SLUG[game.category].color;

  return (
    <article
      className="glass glass-hover card-hue flex h-full flex-col rounded-card p-6"
      style={{ ["--card-hue" as string]: hue }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-extrabold leading-tight text-ink">
          {game.name}
        </h3>
        <CategoryChip category={game.category} />
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
        {game.description}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-hairline pt-4">
        <div>
          <dt className="label-mono text-ink-muted">Round</dt>
          <dd className="mt-1 font-mono text-sm font-bold text-ink">
            {game.roundSeconds}s
          </dd>
        </div>
        <div>
          <dt className="label-mono text-ink-muted">Win by</dt>
          <dd className="mt-1 text-sm font-medium text-ink">
            {game.winCondition}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-1.5">
          {game.arenas.map((arena) => (
            <li key={arena}>
              <Link
                href={`/arenas#${arena.toLowerCase()}`}
                className="label-mono rounded-[8px] border border-hairline px-2 py-1 text-ink-muted transition-colors duration-200 hover:border-hairline-hover hover:text-ink"
              >
                {arena}
              </Link>
            </li>
          ))}
        </ul>
        <CopyValue
          value={gameCommand(game)}
          label="Copy command"
          copiedLabel="Copied"
          variant="secondary"
          size="sm"
        />
      </div>
    </article>
  );
}
