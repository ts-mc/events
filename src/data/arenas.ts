import { GAMES, type Game } from "./games";
import { ARENA_CAPACITY } from "./site";

export type Arena = {
  id: string;
  format: string;
  hue: string;
  summary: string;
  typicalPlayers: number;
  suited: string;
};

export const ARENAS: Arena[] = [
  {
    id: "PG-01",
    format: "1v1 Duels",
    hue: "var(--sky)",
    summary:
      "Small, focused maps built for short head-to-head rounds and precision movement courses.",
    typicalPlayers: 2,
    suited: "Duel-scale movement and elimination rounds where the map does the work.",
  },
  {
    id: "PG-02",
    format: "2v2",
    hue: "var(--brand)",
    summary:
      "A compact team arena for quick team rounds and movement courses that reward clean routes.",
    typicalPlayers: 4,
    suited: "Small-team combat and speed rounds that resolve fast.",
  },
  {
    id: "PG-03",
    format: "5v5",
    hue: "var(--violet)",
    summary:
      "The standard team map. Room for a full lineup, sightlines and a proper mid-round fight.",
    typicalPlayers: 10,
    suited: "Structured team combat, bows and coordination-based party modes.",
  },
  {
    id: "PG-04",
    format: "5v5 Chaos",
    hue: "var(--orange)",
    summary:
      "The same team footprint with more going on — hazards, collapses and constant pressure.",
    typicalPlayers: 10,
    suited: "High-intensity rounds where the arena itself takes part in the fight.",
  },
  {
    id: "PG-05",
    format: "10v10",
    hue: "var(--emerald)",
    summary:
      "The largest team map. Built for full-hallway fights and long, loud rounds.",
    typicalPlayers: 20,
    suited: "Big-team combat, long party rounds and anything that needs the most bodies.",
  },
  {
    id: "PG-06",
    format: "Free-For-All",
    hue: "var(--crimson)",
    summary:
      "No fixed sides. Everyone is the opponent, the arena is open and the pressure never lets up.",
    typicalPlayers: 12,
    suited: "Every-player-for-themselves modes, bomb passes and free-for-all fights.",
  },
];

export const ARENA_BY_ID: Record<string, Arena> = ARENAS.reduce(
  (acc, arena) => {
    acc[arena.id] = arena;
    return acc;
  },
  {} as Record<string, Arena>,
);

export function arenaJoinCommand(arena: Arena): string {
  return `/ts join ${arena.id}`;
}

export function gamesForArena(arenaId: string): Game[] {
  return GAMES.filter((game) => game.arenas.includes(arenaId));
}

export { ARENA_CAPACITY };
