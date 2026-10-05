export type Rank = {
  name: string;
  gradient: [string] | [string, string];
  /** Short label for a single-colour rank, rendered as a flat colour. */
  flat?: boolean;
  obtain: string;
  grants: string;
  staff: boolean;
};

export const RANKS: Rank[] = [
  {
    name: "Owner",
    gradient: ["#D78C39", "#FEF801"],
    obtain: "Staff team",
    grants:
      "Full control of the server, its arenas and its community. Handles infrastructure, config and every moderation decision.",
    staff: true,
  },
  {
    name: "Manager",
    gradient: ["#F858AD", "#FE030B"],
    obtain: "Staff team",
    grants:
      "Runs day-to-day operations: staff coordination, moderation decisions and keeping arenas and events moving.",
    staff: true,
  },
  {
    name: "Admin",
    gradient: ["#FF0000"],
    obtain: "Staff team",
    grants:
      "Server-wide administration, arena setup and enforcement of the rules when they are broken.",
    staff: true,
  },
  {
    name: "Head Moderator",
    gradient: ["#7F3AFF"],
    obtain: "Staff team",
    grants:
      "Leads the moderation team, handles reports and appeals, and keeps chat and lobbies in order.",
    staff: true,
  },
  {
    name: "Moderator",
    gradient: ["#6186EB", "#B2F9FF"],
    obtain: "Staff team",
    grants:
      "In-game moderation, chat and lobby oversight, and actioning player reports.",
    staff: true,
  },
  {
    name: "Helper",
    gradient: ["#4CADB0", "#B2F9FF"],
    obtain: "Staff team",
    grants:
      "Player-facing support: answering questions in chat and helping new arrivals get into an arena.",
    staff: true,
  },
  {
    name: "Staff Team",
    gradient: ["#FF0000"],
    obtain: "Staff team",
    grants:
      "A shared marker shown by staff members who are working a shift in the lobby or in Discord.",
    staff: true,
  },
  {
    name: "VIP",
    gradient: ["#F47FF7"],
    obtain: "Booster / perks, apply or purchase",
    grants:
      "A highlighted prefix and extra cosmetics on top of everything a default player already has.",
    staff: false,
  },
  {
    name: "Voter",
    gradient: ["#4CAF50"],
    obtain: "Vote for the server 4+ times in 24 hours",
    grants:
      "A green prefix that shows up on the leaderboards while your voting streak is active.",
    staff: false,
  },
  {
    name: "Default",
    gradient: ["#888888"],
    obtain: "Everyone",
    grants:
      "Playing every game, stats, leaderboards, arenas, parties and in-arena voting. No rank needed to play.",
    staff: false,
  },
];

export function rankGradient(rank: Rank): string {
  const [from, to] = rank.gradient;
  return to
    ? `linear-gradient(100deg, ${from} 0%, ${to} 100%)`
    : `linear-gradient(100deg, ${from} 0%, ${from} 100%)`;
}
