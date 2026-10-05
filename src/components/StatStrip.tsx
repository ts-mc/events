"use client";

import { CircleDot, Gamepad2, Grid3x3, Users } from "lucide-react";

import { StatTile } from "@/components/StatTile";
import {
  StatusDot,
  statusDotClass,
  statusLabel,
  statusPlayerText,
  useLiveStatus,
} from "@/components/ServerStatus";
import {
  ARENA_COUNT,
  GAME_COUNT,
  MAX_PLAYERS,
  SERVER_SOFTWARE,
  SERVER_VERSION,
} from "@/data/site";

/** Hero badge showing live status plus the server software and version. */
export function ServerBadge() {
  const { status } = useLiveStatus();
  const state = status === "loading" ? "loading" : status.state;

  return (
    <p
      className={`label-mono inline-flex items-center gap-2.5 rounded-pill border px-3.5 py-2 ${statusDotClass(
        status,
      )}`}
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    >
      <StatusDot state={state} />
      <span className="text-ink-muted">{statusLabel(status)}</span>
      <span aria-hidden className="text-ink-muted">
        ·
      </span>
      <span className="text-ink-muted">
        {SERVER_SOFTWARE} {SERVER_VERSION}
      </span>
      {status === "loading" || status.online === null ? null : (
        <>
          <span aria-hidden className="text-ink-muted">
            ·
          </span>
          <span className="text-ink-muted">
            {status.online} / {status.max} playing
          </span>
        </>
      )}
    </p>
  );
}

/** Four-tile live stat strip. */
export function StatStrip() {
  const { status } = useLiveStatus();

  return (
    <div className="border-b border-hairline bg-bg/60">
      <div className="shell">
        <dl className="grid grid-cols-2 divide-hairline border-t border-hairline md:grid-cols-4 md:divide-x">
          <div className="border-b border-hairline md:border-b-0">
            <StatTile
              icon={CircleDot}
              label="Players online"
              color="var(--emerald)"
              value={statusPlayerText(status)}
              detail={
                status === "loading"
                  ? "Checking the server"
                  : status.online === null
                    ? "Live count unavailable"
                    : `Live · ${statusLabel(status)}`
              }
            />
          </div>
          <div className="border-b border-hairline md:border-b-0">
            <StatTile
              icon={Gamepad2}
              label="Minigames"
              color="var(--sky)"
              value={GAME_COUNT}
              detail="Across three categories"
            />
          </div>
          <div className="border-b border-hairline md:border-b-0">
            <StatTile
              icon={Grid3x3}
              label="Arenas"
              color="var(--violet)"
              value={ARENA_COUNT}
              detail="24 players each"
            />
          </div>
          <div>
            <StatTile
              icon={Users}
              label="Max players"
              color="var(--amber)"
              value={MAX_PLAYERS}
              detail="Server-wide capacity"
            />
          </div>
        </dl>
      </div>
    </div>
  );
}
