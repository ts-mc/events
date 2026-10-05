"use client";

import { StatusDot, statusLabel, useLiveStatus } from "@/components/ServerStatus";
import { SITE_URL } from "@/data/site";

/**
 * Live status read-out. Kept in a client component so the polling hook can run
 * while the rest of the server page stays statically rendered.
 */
export function LiveStatusPanel() {
  const { status } = useLiveStatus();

  return (
    <div className="glass rounded-card p-6">
      <p className="label-mono flex items-center gap-2.5 text-ink-muted">
        <StatusDot state={status === "loading" ? "loading" : status.state} />
        {statusLabel(status)}
      </p>

      <p className="mt-4 font-mono text-4xl font-extrabold tracking-tight text-ink">
        {status === "loading"
          ? "—"
          : status.online === null
            ? "Unavailable"
            : `${status.online} / ${status.max}`}
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        {status === "loading"
          ? "Checking the server"
          : status.online === null
            ? "We could not read a live count just now. That is a status problem, not an empty server."
            : "Players online right now, read from the server itself."}
      </p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="label-mono text-ink-muted">Version</dt>
          <dd className="mt-1.5 font-mono text-sm font-bold text-ink">
            {status === "loading" ? "—" : (status.version ?? "Unavailable")}
          </dd>
        </div>
        <div>
          <dt className="label-mono text-ink-muted">Capacity</dt>
          <dd className="mt-1.5 font-mono text-sm font-bold text-ink">
            {status === "loading" ? "—" : `${status.max}`}
          </dd>
        </div>
        <div>
          <dt className="label-mono text-ink-muted">Query</dt>
          <dd className="mt-1.5 font-mono text-sm font-bold text-ink">
            Server-side, cached
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs leading-relaxed text-ink-muted">
        The query runs on our server, never in your browser, and is cached for
        about 45 seconds so we do not hammer the game server. A number that
        cannot be verified is never shown as if it were live. Site: {SITE_URL}
      </p>
    </div>
  );
}
