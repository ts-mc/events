import type { CategorySlug, Game } from "@/data/games";
import { CATEGORY_BY_SLUG } from "@/data/games";
import { cn } from "@/lib/utils";

/**
 * Category coding is always paired with a text label, so colour is never the
 * only signal distinguishing the three categories.
 */
export function CategoryChip({
  category,
  className,
}: {
  category: CategorySlug;
  className?: string;
}) {
  const meta = CATEGORY_BY_SLUG[category];

  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-1.5 text-ink-muted",
        className,
      )}
      style={{
        color: "var(--text-muted)",
      }}
    >
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      {meta.short}
    </span>
  );
}

export function GameMeta({
  game,
  className,
}: {
  game: Game;
  className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-2 gap-x-4 gap-y-3", className)}>
      <div>
        <dt className="label-mono text-ink-muted">Round</dt>
        <dd className="mt-1 font-mono text-sm font-bold text-ink">
          {game.roundSeconds}s
        </dd>
      </div>
      <div>
        <dt className="label-mono text-ink-muted">Win by</dt>
        <dd className="mt-1 text-sm font-medium text-ink">{game.winCondition}</dd>
      </div>
    </dl>
  );
}
