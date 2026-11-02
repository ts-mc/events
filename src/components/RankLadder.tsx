import Link from "next/link";

import { RANKS, type Rank } from "@/data/ranks";

/**
 * Renders a rank name in its exact in-game gradient. Single-colour ranks get a
 * flat fill rather than a two-stop gradient.
 */
export function RankGradientName({
  rank,
  className,
}: {
  rank: Rank;
  className?: string;
}) {
  const [from, to] = rank.gradient;

  if (!to) {
    return (
      <span
        className={className}
        style={{ color: from }}
      >
        {rank.name}
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{
        backgroundImage: `linear-gradient(100deg, ${from} 0%, ${to} 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {rank.name}
    </span>
  );
}

export function RankLadder({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="events-index">
      {RANKS.map((rank, index) => (
        <li key={rank.name}>
          <div
            className="glass-hover card-hue flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6"
            style={{
              ["--card-hue" as string]: rank.gradient[rank.gradient.length - 1],
            }}
          >
            <div className="flex items-center gap-4 sm:w-56 sm:shrink-0">
              <span className="label-mono w-6 shrink-0 text-ink-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <RankGradientName
                rank={rank}
                className="text-xl font-extrabold leading-tight"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="label-mono text-ink-muted">{rank.obtain}</p>
              {!compact ? (
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {rank.grants}
                </p>
              ) : null}
            </div>

            {/*
              The badge marks staff versus player, not which rank, so its text
              uses the accessible muted colour. The rank's own hue stays on the
              name gradient and the card's hover border, where it is carried by
              text rather than by colour alone.
            */}
            {!compact ? (
              <span
                className="label-mono shrink-0 rounded-pill border border-hairline bg-surface/60 px-3 py-1.5 text-ink-muted"
                style={{
                  borderLeftWidth: "3px",
                  borderLeftColor: rank.gradient[rank.gradient.length - 1],
                }}
              >
                {rank.staff ? "Staff" : "Player"}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Condensed version for the home page: names and how they are earned, without
 * the full permission text.
 */
export function RankTeaser() {
  return (
    <ul className="events-index">
      {RANKS.map((rank) => (
        <li
          key={rank.name}
          className="flex flex-wrap items-center gap-3 px-4 py-3"
        >
          <span
            aria-hidden
            className="inline-block h-6 w-1 rounded-full"
            style={{
              background: rank.gradient.length
                ? `linear-gradient(180deg, ${rank.gradient.join(", ")})`
                : rank.gradient[0],
            }}
          />
          <RankGradientName rank={rank} className="text-xl font-extrabold" />
          <span className="ml-auto font-mono text-xs text-ink-muted">
            {rank.staff ? "Staff team" : "Earned in-game"}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function RankStaffNote() {
  return (
    <div className="border-t border-hairline pt-5">
      <h2 className="label-mono text-brand">Applying to the staff team</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        Staff applications open periodically. When they are open, the
        application is a ticket in our Discord. Please never direct message a
        staff member to apply, and never pay anyone who offers to sell you a
        rank &mdash; no legitimate member of staff will ever do that.
      </p>
      <Link
        href="https://discord.gg/theysix"
        target="_blank"
        rel="noopener noreferrer"
        className="label-mono mt-4 inline-flex rounded-control bg-blurple/15 px-4 py-2.5 text-blurple-text transition-colors duration-200 hover:bg-blurple/25"
      >
        Open Discord
      </Link>
    </div>
  );
}
