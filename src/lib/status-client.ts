import type { StatusPayload } from "@/app/api/status/route";

export type StatusClient = Pick<
  StatusPayload,
  "online" | "max" | "version" | "state"
>;

export const STATUS_ENDPOINT = "/api/status";
export const REFRESH_INTERVAL_MS = 60_000;

export async function fetchStatus(signal?: AbortSignal): Promise<StatusClient> {
  const response = await fetch(STATUS_ENDPOINT, {
    signal,
    cache: "no-store",
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`status request failed: ${response.status}`);
  }

  return (await response.json()) as StatusClient;
}
