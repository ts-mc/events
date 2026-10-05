export type CategorySlug = "movement" | "elimination" | "party";

export type CategoryMeta = {
  slug: CategorySlug;
  label: string;
  short: string;
  color: string;
  blurb: string;
};

export type Game = {
  id: string;
  name: string;
  category: CategorySlug;
  roundSeconds: number;
  winCondition: string;
  description: string;
  arenas: string[];
};

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "movement",
    label: "Movement / Parkour",
    short: "Movement",
    color: "var(--sky)",
    blurb: "Speed, routes and nerve. No weapons, just whether you can finish first.",
  },
  {
    slug: "elimination",
    label: "Elimination / Combat",
    short: "Combat",
    color: "var(--rose)",
    blurb: "Direct fights where a hit, a bow or a blast decides who is still standing.",
  },
  {
    slug: "party",
    label: "Party / Rhythm",
    short: "Party",
    color: "var(--magenta)",
    blurb: "Chaotic rounds with music, floors that vanish and passes you would rather not take.",
  },
];

export const CATEGORY_BY_SLUG: Record<CategorySlug, CategoryMeta> =
  CATEGORIES.reduce(
    (acc, category) => {
      acc[category.slug] = category;
      return acc;
    },
    {} as Record<CategorySlug, CategoryMeta>,
  );

export const GAMES: Game[] = [
  {
    id: "race",
    name: "Race",
    category: "movement",
    roundSeconds: 120,
    winCondition: "Last standing",
    description:
      "Sprint to the finish line. Avoid death blocks and obstacles. First to finish wins.",
    arenas: ["PG-01", "PG-03"],
  },
  {
    id: "bridge_race",
    name: "Bridge Race",
    category: "movement",
    roundSeconds: 120,
    winCondition: "Last standing",
    description: "Build a bridge of bricks to the finish line. First to cross wins.",
    arenas: ["PG-01", "PG-03"],
  },
  {
    id: "fast_zone",
    name: "Fast Zone",
    category: "movement",
    roundSeconds: 120,
    winCondition: "Last standing",
    description:
      "Sprint at high speed toward the goal. Dodge walls — one crash ends your run.",
    arenas: ["PG-01", "PG-02"],
  },
  {
    id: "tnt_run",
    name: "TNT Run",
    category: "movement",
    roundSeconds: 300,
    winCondition: "Last standing",
    description:
      "Run across layered sand and TNT floors. Every step collapses the ground behind you.",
    arenas: ["PG-02", "PG-05"],
  },
  {
    id: "traffic_light",
    name: "Traffic Light",
    category: "movement",
    roundSeconds: 120,
    winCondition: "Last standing",
    description:
      "Advance on green, freeze on red. Reach the goal without moving on a red.",
    arenas: ["PG-01", "PG-02"],
  },
  {
    id: "minefield",
    name: "Minefield",
    category: "movement",
    roundSeconds: 120,
    winCondition: "Last standing",
    description:
      "Dash to the safe zone. Pressure plates knock you back instead of killing you.",
    arenas: ["PG-01", "PG-03"],
  },
  {
    id: "all_against_all",
    name: "All Against All",
    category: "elimination",
    roundSeconds: 300,
    winCondition: "Last standing",
    description: "Swords, bows and blocks. Build, break and outlast everyone.",
    arenas: ["PG-04", "PG-06"],
  },
  {
    id: "one_in_the_chamber",
    name: "One In The Chamber",
    category: "elimination",
    roundSeconds: 120,
    winCondition: "Most kills",
    description:
      "One bow, one arrow per life. One hit is one elimination. Keep a wooden sword for close range.",
    arenas: ["PG-03", "PG-05"],
  },
  {
    id: "snowball_fight",
    name: "Snowball Fight",
    category: "elimination",
    roundSeconds: 120,
    winCondition: "Most kills",
    description: "Snowball your way to the last player standing.",
    arenas: ["PG-05", "PG-06"],
  },
  {
    id: "knockback",
    name: "Knockback",
    category: "elimination",
    roundSeconds: 120,
    winCondition: "Most kills",
    description: "Use the knockback stick to send rivals into the void.",
    arenas: ["PG-01", "PG-03"],
  },
  {
    id: "exploding_sheep",
    name: "Exploding Sheep",
    category: "elimination",
    roundSeconds: 180,
    winCondition: "Last standing",
    description:
      "Shear the sheep before their visible fuse runs out — or the floor disappears.",
    arenas: ["PG-04", "PG-05"],
  },
  {
    id: "run_from_the_beast",
    name: "Run From The Beast",
    category: "elimination",
    roundSeconds: 300,
    winCondition: "Last standing",
    description:
      "Runners loot chests and cooperate to defeat the beast. One beast against N runners.",
    arenas: ["PG-05", "PG-06"],
  },
  {
    id: "block_party",
    name: "Block Party",
    category: "party",
    roundSeconds: 300,
    winCondition: "Last standing",
    description:
      "Music plays, then a colour is revealed. Stand on the chosen block before the floor falls. Power-ups spawn.",
    arenas: ["PG-02", "PG-05"],
  },
  {
    id: "chairs",
    name: "Chairs",
    category: "party",
    roundSeconds: 600,
    winCondition: "Last standing",
    description:
      "Musical chairs. Sit before the timer ends — no seat means elimination.",
    arenas: ["PG-03", "PG-05"],
  },
  {
    id: "spleef",
    name: "Spleef",
    category: "party",
    roundSeconds: 120,
    winCondition: "Last standing",
    description:
      "Shovel the snow out from under your rivals. Last survivor wins.",
    arenas: ["PG-01", "PG-03"],
  },
  {
    id: "splegg",
    name: "Splegg",
    category: "party",
    roundSeconds: 180,
    winCondition: "Last standing",
    description:
      "Shoot eggs to destroy the floor beneath your opponents.",
    arenas: ["PG-03", "PG-04"],
  },
  {
    id: "red_alert",
    name: "Red Alert",
    category: "party",
    roundSeconds: 300,
    winCondition: "Last standing",
    description:
      "Tiles overheat — randomly in chaos mode, or wherever players step in trail mode.",
    arenas: ["PG-02", "PG-04"],
  },
  {
    id: "tnt_tag",
    name: "TNT Tag",
    category: "party",
    roundSeconds: 900,
    winCondition: "Last standing",
    description:
      "Random players get TNT each round. Pass it on before the fuse hits zero.",
    arenas: ["PG-05", "PG-06"],
  },
  {
    id: "water_well",
    name: "Water Well",
    category: "party",
    roundSeconds: 60,
    winCondition: "Last standing",
    description:
      "Jump from above into the water well. Land in the water for points.",
    arenas: ["PG-01", "PG-06"],
  },
];

export const GAMES_BY_CATEGORY: Record<CategorySlug, Game[]> = CATEGORIES.reduce(
  (acc, category) => {
    acc[category.slug] = GAMES.filter((game) => game.category === category.slug);
    return acc;
  },
  {} as Record<CategorySlug, Game[]>,
);

export function formatRound(seconds: number): string {
  if (seconds % 60 === 0) {
    const minutes = seconds / 60;
    return `${minutes} min`;
  }
  return `${seconds}s`;
}

export function gameCommand(game: Game): string {
  return `/ts join ${game.id}`;
}

export function countByCategory(): Record<CategorySlug, number> {
  return CATEGORIES.reduce(
    (acc, category) => {
      acc[category.slug] = GAMES_BY_CATEGORY[category.slug].length;
      return acc;
    },
    {} as Record<CategorySlug, number>,
  );
}
