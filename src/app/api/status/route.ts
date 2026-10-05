import { NextResponse } from "next/server";

import { MAX_PLAYERS, SERVER_VERSION } from "@/data/site";
import { pingServer } from "@/lib/mc-ping";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const CACHE_TTL_MS = 45_000;

export type StatusPayload = {
  /** null means "could not reach the server", which is never the same as zero. */
  online: number | null;
  max: number;
  version: string | null;
  state: "online" | "offline" | "unknown";
  checkedAt: number;
  latencyMs: number | null;
};

let cache: { value: StatusPayload; expiresAt: number } | null = null;
let inflight: Promise<StatusPayload> | null = null;

async function queryStatus(): Promise<StatusPayload> {
  const now = () => Date.now();

  try {
    const result = await pingServer(4000);

    if (!result.online) {
      // A refused connection means the host answered: the server is not
      // listening, so we can say "offline" rather than "unknown".
      return {
        online: null,
        max: MAX_PLAYERS,
        version: null,
        state: result.errorKind === "refused" ? "offline" : "unknown",
        checkedAt: now(),
        latencyMs: result.latency,
      };
    }

    return {
      online: result.playersOnline,
      max: result.playersMax || MAX_PLAYERS,
      version: result.version ?? SERVER_VERSION,
      state: "online",
      checkedAt: now(),
      latencyMs: result.latency,
    };
  } catch {
    return {
      online: null,
      max: MAX_PLAYERS,
      version: null,
      state: "unknown",
      checkedAt: now(),
      latencyMs: null,
    };
  }
}

function cachedResponse(value: StatusPayload): NextResponse<StatusPayload> {
  return NextResponse.json(value, {
    headers: {
      "cache-control":
        "public, max-age=0, s-maxage=45, stale-while-revalidate=120",
    },
  });
}

export async function GET(): Promise<NextResponse<StatusPayload>> {
  const now = Date.now();

  if (cache && cache.expiresAt > now) {
    return cachedResponse(cache.value);
  }

  if (!inflight) {
    inflight = queryStatus()
      .then((value) => {
        cache = { value, expiresAt: Date.now() + CACHE_TTL_MS };
        return value;
      })
      .finally(() => {
        inflight = null;
      });
  }

  return cachedResponse(await inflight);
}
