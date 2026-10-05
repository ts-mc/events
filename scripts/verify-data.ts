/**
 * Fails if the published data drifts from the brief's authoritative table.
 * Run with: npx tsx scripts/verify-data.ts
 */
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  CATEGORIES,
  GAMES,
  GAMES_BY_CATEGORY,
  countByCategory,
  formatRound,
  gameCommand,
} from "../src/data/games";
import { ARENAS, gamesForArena } from "../src/data/arenas";
import { RANKS, rankGradient } from "../src/data/ranks";
import { COMMAND_GROUPS } from "../src/data/commands";
import {
  ARENA_COUNT,
  ARENA_CAPACITY,
  GAME_COUNT,
  MAX_PLAYERS,
  SERVER_ADDRESS,
  SERVER_ADDRESS_BARE,
  SERVER_PORT,
} from "../src/data/site";

const failures: string[] = [];

function expect(label: string, actual: unknown, expected: unknown): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) failures.push(`${label}: got ${a}, expected ${e}`);
}

// --- The brief's 19 games, verbatim. ---
const EXPECTED_GAMES: [string, string, string, number, string][] = [
  // id, name, category, roundSeconds, winCondition
  ["race", "Race", "movement", 120, "Last standing"],
  ["bridge_race", "Bridge Race", "movement", 120, "Last standing"],
  ["fast_zone", "Fast Zone", "movement", 120, "Last standing"],
  ["tnt_run", "TNT Run", "movement", 300, "Last standing"],
  ["traffic_light", "Traffic Light", "movement", 120, "Last standing"],
  ["minefield", "Minefield", "movement", 120, "Last standing"],
  ["all_against_all", "All Against All", "elimination", 300, "Last standing"],
  [
    "one_in_the_chamber",
    "One In The Chamber",
    "elimination",
    120,
    "Most kills",
  ],
  ["snowball_fight", "Snowball Fight", "elimination", 120, "Most kills"],
  ["knockback", "Knockback", "elimination", 120, "Most kills"],
  [
    "exploding_sheep",
    "Exploding Sheep",
    "elimination",
    180,
    "Last standing",
  ],
  [
    "run_from_the_beast",
    "Run From The Beast",
    "elimination",
    300,
    "Last standing",
  ],
  ["block_party", "Block Party", "party", 300, "Last standing"],
  ["chairs", "Chairs", "party", 600, "Last standing"],
  ["spleef", "Spleef", "party", 120, "Last standing"],
  ["splegg", "Splegg", "party", 180, "Last standing"],
  ["red_alert", "Red Alert", "party", 300, "Last standing"],
  ["tnt_tag", "TNT Tag", "party", 900, "Last standing"],
  ["water_well", "Water Well", "party", 60, "Last standing"],
];

expect("game count", GAMES.length, 19);
expect("GAME_COUNT constant", GAME_COUNT, 19);
expect("ids unique", new Set(GAMES.map((g) => g.id)).size, 19);

for (const [id, name, category, seconds, win] of EXPECTED_GAMES) {
  const game = GAMES.find((g) => g.id === id);
  if (!game) {
    failures.push(`missing game: ${id}`);
    continue;
  }
  expect(`${id}.name`, game.name, name);
  expect(`${id}.category`, game.category, category);
  expect(`${id}.roundSeconds`, game.roundSeconds, seconds);
  expect(`${id}.winCondition`, game.winCondition, win);
  expect(
    `${id}.command`,
    gameCommand(game),
    `/ts join ${id}`,
  );
}

// Category totals: 6 movement, 6 elimination, 7 party.
expect("movement count", countByCategory().movement, 6);
expect("elimination count", countByCategory().elimination, 6);
expect("party count", countByCategory().party, 7);
expect("category count", CATEGORIES.length, 3);
for (const category of CATEGORIES) {
  expect(
    `${category.slug} grouping`,
    GAMES_BY_CATEGORY[category.slug].length,
    countByCategory()[category.slug],
  );
}

// No game may sit in a category that does not exist.
for (const game of GAMES) {
  if (!CATEGORIES.some((c) => c.slug === game.category)) {
    failures.push(`${game.id}: unknown category ${game.category}`);
  }
  if (game.arenas.length === 0) {
    failures.push(`${game.id}: no arenas listed`);
  }
  if (game.description.trim().length < 20) {
    failures.push(`${game.id}: description too short`);
  }
  for (const arena of game.arenas) {
    if (!ARENAS.some((a) => a.id === arena)) {
      failures.push(`${game.id}: unknown arena ${arena}`);
    }
  }
}

// --- Arenas ---
expect("arena count", ARENAS.length, 6);
expect("ARENA_COUNT constant", ARENA_COUNT, 6);
expect("ARENA_CAPACITY constant", ARENA_CAPACITY, 24);
expect(
  "arena ids",
  ARENAS.map((a) => a.id),
  ["PG-01", "PG-02", "PG-03", "PG-04", "PG-05", "PG-06"],
);
expect(
  "arena formats",
  ARENAS.map((a) => a.format),
  ["1v1 Duels", "2v2", "5v5", "5v5 Chaos", "10v10", "Free-For-All"],
);
// Each arena hue must be distinct, in the order the brief specifies.
expect(
  "arena hues",
  ARENAS.map((a) => a.hue),
  [
    "var(--sky)",
    "var(--brand)",
    "var(--violet)",
    "var(--orange)",
    "var(--emerald)",
    "var(--crimson)",
  ],
);
expect(
  "arena hues distinct",
  new Set(ARENAS.map((a) => a.hue)).size,
  6,
);
for (const arena of ARENAS) {
  if (gamesForArena(arena.id).length === 0) {
    failures.push(`${arena.id}: no games mapped`);
  }
}

// --- Ranks ---
expect("rank count", RANKS.length, 10);
expect(
  "rank names in order",
  RANKS.map((r) => r.name),
  [
    "Owner",
    "Manager",
    "Admin",
    "Head Moderator",
    "Moderator",
    "Helper",
    "Staff Team",
    "VIP",
    "Voter",
    "Default",
  ],
);
expect(
  "rank gradients",
  RANKS.map((r) => r.gradient.join(" -> ")),
  [
    "#D78C39 -> #FEF801",
    "#F858AD -> #FE030B",
    "#FF0000",
    "#7F3AFF",
    "#6186EB -> #B2F9FF",
    "#4CADB0 -> #B2F9FF",
    "#FF0000",
    "#F47FF7",
    "#4CAF50",
    "#888888",
  ],
);
expect("voter obtain", RANKS.find((r) => r.name === "Voter")?.obtain, "Vote for the server 4+ times in 24 hours");
expect("default obtain", RANKS.find((r) => r.name === "Default")?.obtain, "Everyone");
for (const rank of RANKS) {
  expect(
    `${rank.name} gradient renders`,
    rankGradient(rank).startsWith("linear-gradient"),
    true,
  );
  if (!rank.grants || rank.grants.length < 20) {
    failures.push(`${rank.name}: grants too short`);
  }
}

// --- Commands ---
const allCommands = COMMAND_GROUPS.flatMap((g) => g.rows);
const commandText = allCommands.map((r) => `${r.command} ${r.effect}`).join(" ");

// Player-facing UI must never publish admin aliases or vendor names.
for (const forbidden of ["/tsa", "/baa", "/ba ", "bluearcade", "blueva"]) {
  if (commandText.toLowerCase().includes(forbidden.toLowerCase())) {
    failures.push(`command tables leak "${forbidden}"`);
  }
}
for (const required of ["/ts", "/tse", "/ts quickjoin", "/ts join", "/ts leave"]) {
  if (!allCommands.some((r) => r.command.startsWith(required))) {
    failures.push(`command tables missing ${required}`);
  }
}
for (const row of allCommands) {
  if (!row.command.startsWith("/")) failures.push(`${row.command}: no slash`);
  if (!row.effect || row.effect.length < 10) failures.push(`${row.command}: effect too short`);
}

// --- Server facts ---
expect("server host", SERVER_ADDRESS_BARE, "theysix.sparked.network");
expect("server port", SERVER_PORT, 25625);
expect("server address", SERVER_ADDRESS, "theysix.sparked.network:25625");
expect("max players", MAX_PLAYERS, 100);

// --- Spelling traps ---
const wholeSite = readAllText();
for (const trap of ["sparked.host", "sarked"]) {
  if (wholeSite.includes(trap)) {
    failures.push(`forbidden domain spelling present: ${trap}`);
  }
}
// theysix.ro-mihaiu.xyz only ever appears as the events subdomain or the farms site.
const bare = wholeSite.match(/(?<![-\w])theysix\.ro-mihaiu\.xyz/g) ?? [];
if (bare.length > 0) {
  failures.push(`bare farms domain used ${bare.length}x as the events site`);
}
for (const vendor of ["BlueArcade", "Blueva", "Party Games"]) {
  if (wholeSite.toLowerCase().includes(vendor.toLowerCase())) {
    failures.push(`vendor name leaked: ${vendor}`);
  }
}

// --- Round formatting ---
expect("formatRound 120", formatRound(120), "2 min");
expect("formatRound 60", formatRound(60), "1 min");
expect("formatRound 45", formatRound(45), "45s");

function readAllText(): string {
  // Node-only: walk src/ and concatenate every source file.
  const { readdirSync, statSync, readFileSync } = require("node:fs") as typeof import("node:fs");
  const { join } = require("node:path") as typeof import("node:path");
  const root = join(dirname(fileURLToPath(import.meta.url)), "..", "src");
  const out: string[] = [];

  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(ts|tsx)$/.test(entry)) out.push(readFileSync(full, "utf8"));
    }
  };
  walk(root);
  return out.join("\n");
}

if (failures.length > 0) {
  console.error(`FAIL — ${failures.length} problem(s):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `PASS — ${GAMES.length} games, ${ARENAS.length} arenas, ${RANKS.length} ranks, ${allCommands.length} commands verified`,
);
