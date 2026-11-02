"use client";

import { Gamepad2, LayoutGrid, Table2 } from "lucide-react";
import { useState } from "react";

import { CopyValue } from "@/components/CopyValue";
import { GameCard } from "@/components/GameCard";
import {
  CATEGORIES,
  GAMES_BY_CATEGORY,
  gameCommand,
} from "@/data/games";
import { cn } from "@/lib/utils";

type View = "cards" | "table";

export function GamesIndex() {
  const [view, setView] = useState<View>("cards");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="label-mono text-ink-muted">
          19 games · {CATEGORIES.length} categories
        </p>

        <div
          role="group"
          aria-label="Change games view"
          className="flex gap-2"
        >
          {(
            [
              { slug: "cards" as const, label: "Detail", icon: LayoutGrid },
              { slug: "table" as const, label: "Table", icon: Table2 },
            ]
          ).map((item) => {
            const active = view === item.slug;
            const Icon = item.icon;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setView(item.slug)}
                aria-pressed={active}
                className={cn(
                  "label-mono inline-flex items-center gap-2 rounded-control border px-4 py-2.5 transition-all duration-200",
                  active
                    ? "border-brand/50 bg-brand/15 text-brand-hi"
                    : "border-hairline text-ink-muted hover:border-hairline-hover hover:text-ink",
                )}
              >
                <Icon size={15} aria-hidden />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 space-y-14">
        {CATEGORIES.map((category) => (
          <section key={category.slug} aria-labelledby={`cat-${category.slug}`}>
            <div className="flex flex-col gap-3 border-b border-hairline pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id={`cat-${category.slug}`}
                  className="flex items-center gap-3 text-[1.35rem] font-extrabold text-ink"
                >
                  <span
                    aria-hidden
                    className="inline-block size-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.label}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  {category.blurb}
                </p>
              </div>
              <p
                className="label-mono shrink-0"
                style={{ color: category.color }}
              >
                {GAMES_BY_CATEGORY[category.slug].length} games
              </p>
            </div>

            {view === "cards" ? (
              <ul className="events-index mt-6">
                {GAMES_BY_CATEGORY[category.slug].map((game) => (
                  <li key={game.id}><GameCard game={game} /></li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 overflow-x-auto rounded-card border border-hairline">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <caption className="sr-only">
                    {category.label} games, with round length, win condition,
                    suitable arenas and join command
                  </caption>
                  <thead>
                    <tr className="border-b border-hairline bg-surface/60">
                      {["Game", "Round", "Win by", "Arenas", "Command"].map(
                        (heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="label-mono px-4 py-3.5 text-ink-muted"
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {GAMES_BY_CATEGORY[category.slug].map((game) => (
                      <tr
                        key={game.id}
                        className="border-b border-hairline/60 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.03]"
                      >
                        <th scope="row" className="px-4 py-3.5">
                          <span className="flex items-center gap-2.5">
                            <Gamepad2
                              size={15}
                              aria-hidden
                              style={{ color: category.color }}
                            />
                            <span className="text-sm font-semibold text-ink">
                              {game.name}
                            </span>
                          </span>
                        </th>
                        <td className="px-4 py-3.5 font-mono text-xs font-bold text-ink-muted">
                          {game.roundSeconds}s
                        </td>
                        <td className="px-4 py-3.5 text-sm text-ink-muted">
                          {game.winCondition}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-xs font-bold text-ink-muted">
                          {game.arenas.join(" · ")}
                        </td>
                        <td className="px-4 py-3.5">
                          <CopyValue
                            value={gameCommand(game)}
                            label="Copy"
                            copiedLabel="Copied"
                            variant="secondary"
                            size="sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
