"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  fetchStatus,
  REFRESH_INTERVAL_MS,
  type StatusClient,
} from "@/lib/status-client";
import { cn } from "@/lib/utils";

export type LiveStatus = StatusClient | "loading";

const DOT_COLORS: Record<StatusClient["state"], string> = {
  online: "bg-emerald",
  offline: "bg-crimson",
  unknown: "bg-ink-dim",
};

const DOT_TEXT: Record<StatusClient["state"], string> = {
  online: "text-emerald",
  offline: "text-crimson",
  unknown: "text-ink-muted",
};

/**
 * Live player count and status, polled from the server-side status route.
 * The ping itself never runs in the browser.
 */
export function useLiveStatus(): { status: LiveStatus; refresh: () => void } {
  const [status, setStatus] = useState<LiveStatus>("loading");
  const controller = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    controller.current?.abort();
    const next = new AbortController();
    controller.current = next;

    try {
      setStatus(await fetchStatus(next.signal));
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      // An honest unknown state. Never a zero, never a stale number.
      setStatus({ online: null, max: 100, version: null, state: "unknown" });
    }
  }, []);

  useEffect(() => {
    void load();
    const interval = setInterval(() => void load(), REFRESH_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      controller.current?.abort();
    };
  }, [load]);

  return { status, refresh: () => void load() };
}

export function StatusDot({
  state,
  className,
}: {
  state: "loading" | StatusClient["state"];
  className?: string;
}) {
  if (state === "loading") {
    return (
      <span
        aria-hidden
        className={cn("inline-block size-2 rounded-full bg-ink-dim", className)}
      />
    );
  }

  return (
    <span aria-hidden className={cn("relative inline-flex", className)}>
      <span
        className={cn(
          "inline-block size-2 rounded-full",
          DOT_COLORS[state],
          // Pulse only while reachable, so offline/unknown reads as a hard stop.
          state === "online" && "animate-dot-pulse",
        )}
      />
    </span>
  );
}

export function statusLabel(status: LiveStatus): string {
  if (status === "loading") return "Checking status";
  if (status.state === "unknown") return "Status unavailable";
  if (status.state === "offline") return "Server offline";
  return "Server online";
}

export function statusPlayerText(status: LiveStatus): string {
  if (status === "loading") return "—";
  if (status.online === null) return "—";
  return `${status.online} / ${status.max}`;
}

export function statusDotClass(status: LiveStatus): string {
  if (status === "loading") return "text-ink-muted";
  return DOT_TEXT[status.state];
}
