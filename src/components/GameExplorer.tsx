"use client";

import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { GameCard } from "@/components/GameCard";
import {
  CATEGORIES,
  countByCategory,
  GAMES,
  type CategorySlug,
  type Game,
} from "@/data/games";
import { cn } from "@/lib/utils";

type Filter = CategorySlug | "all";

const COUNTS = countByCategory();

const FILTERS: { slug: Filter; label: string; color: string }[] = [
  { slug: "all", label: `All games · ${GAMES.length}`, color: "var(--brand-hi)" },
  ...CATEGORIES.map((category) => ({
    slug: category.slug as Filter,
    label: `${category.short} · ${COUNTS[category.slug]}`,
    color: category.color,
  })),
];

function matches(game: Game, query: string): boolean {
  if (!query) return true;
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    game.name.toLowerCase().includes(needle) ||
    game.description.toLowerCase().includes(needle) ||
    game.id.toLowerCase().includes(needle) ||
    game.winCondition.toLowerCase().includes(needle)
  );
}

export function GameExplorer({ games = GAMES }: { games?: Game[] }) {
  /*
   * The category is read from the URL on the client rather than through
   * useSearchParams. That hook forces a Suspense boundary, which would drop
   * all 19 cards out of the prerendered HTML — and these cards are the
   * centrepiece of the page for crawlers that do not run JavaScript.
   */
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const hydrated = useRef(false);

  useEffect(() => {
    const read = (): Filter => {
      const value = new URLSearchParams(window.location.search).get("category");
      return CATEGORIES.some((category) => category.slug === value)
        ? (value as CategorySlug)
        : "all";
    };

    setFilter(read());

    const onPopState = () => setFilter(read());
    window.addEventListener("popstate", onPopState);
    hydrated.current = true;
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Mirror the active category into the URL so the view is shareable, without
  // a navigation: replacing state keeps the filter out of the history stack.
  useEffect(() => {
    if (!hydrated.current) return;
    const url = new URL(window.location.href);
    if (filter === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", filter);
    window.history.replaceState(null, "", url.toString());
  }, [filter]);

  const selectFilter = useCallback((next: Filter) => setFilter(next), []);

  const visible = useMemo(
    () =>
      games.filter(
        (game) => (filter === "all" || game.category === filter) && matches(game, query),
      ),
    [filter, games, query],
  );

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter games by category"
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((item) => {
            const active = filter === item.slug;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => selectFilter(item.slug)}
                aria-pressed={active}
                className={cn(
                  "label-mono rounded-pill border px-4 py-2.5 transition-all duration-200",
                  active
                    ? "text-[#070A12]"
                    : "border-hairline text-ink-muted hover:border-hairline-hover hover:text-ink",
                )}
                style={
                  active
                    ? {
                        backgroundImage: `linear-gradient(100deg, ${item.color} 0%, color-mix(in srgb, ${item.color} 55%, var(--brand-hi)) 100%)`,
                        borderColor: "transparent",
                      }
                    : undefined
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="relative lg:w-80">
          <label htmlFor="game-search" className="sr-only">
            Search minigames
          </label>
          <Search
            size={16}
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            id="game-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search 19 games"
            className="h-12 w-full rounded-control border border-hairline bg-surface/70 pl-10 pr-10 text-sm text-ink placeholder:text-ink-muted transition-colors duration-200 focus:border-brand focus:bg-surface"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-control p-1 text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              <X size={16} aria-hidden />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
        </div>
      </div>

      <p
        aria-live="polite"
        className="label-mono mt-6 border-t border-hairline pt-4 text-ink-muted"
      >
        Showing {visible.length} of {games.length} games
        {filter !== "all"
          ? ` · ${FILTERS.find((item) => item.slug === filter)?.label.split(" · ")[0]}`
          : ""}
        {query.trim() ? ` · matching “${query.trim()}”` : ""}
      </p>

      {visible.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-card border border-dashed border-hairline bg-surface/40 p-10 text-center">
          <p className="text-base font-semibold text-ink">No games match that</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
            Try a shorter search, or switch back to All games to see the full
            list of {games.length}.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              selectFilter("all");
            }}
            className="label-mono mt-5 rounded-control border border-hairline px-4 py-2.5 text-ink transition-colors duration-200 hover:border-hairline-hover"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
