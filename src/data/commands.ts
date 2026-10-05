export type CommandRow = {
  command: string;
  who: string;
  effect: string;
};

export type CommandGroup = {
  title: string;
  description: string;
  rows: CommandRow[];
};

export const COMMAND_GROUPS: CommandGroup[] = [
  {
    title: "Getting in and out",
    description: "Everything you need to enter an arena and leave it again.",
    rows: [
      {
        command: "/ts",
        who: "Everyone",
        effect: "Opens the join and filter GUI, so you can pick a game instead of typing a command.",
      },
      {
        command: "/tse",
        who: "Everyone",
        effect:
          "Same as /ts — opens the join and filter GUI. Shorthand for players who prefer it.",
      },
      {
        command: "/ts quickjoin",
        who: "Everyone",
        effect: "Drops you into a random arena that has space.",
      },
      {
        command: "/ts join <arena>",
        who: "Everyone",
        effect: "Joins one specific arena, for example PG-03.",
      },
      {
        command: "/ts join <game>",
        who: "Everyone",
        effect: "Joins a specific minigame by its id, for example race or tnt_run.",
      },
      {
        command: "/ts leave",
        who: "Everyone",
        effect: "Leaves the arena you are currently in and returns to the lobby.",
      },
    ],
  },
  {
    title: "Lobby and matches",
    description: "Choosing what happens next, and picking sides when a game needs them.",
    rows: [
      {
        command: "/ts vote [game]",
        who: "Everyone",
        effect: "Votes in the lobby for the next minigame. Pass a game name to pick a specific one.",
      },
      {
        command: "/ts vote page <n>",
        who: "Everyone",
        effect: "Turns to the next page of the lobby vote.",
      },
      {
        command: "/ts team [join <id>]",
        who: "Everyone",
        effect: "Picks your team in team-format games. Use it with a team id to join a specific one.",
      },
      {
        command: "/ts party <list|create|invite|join>",
        who: "Everyone",
        effect: "Party management: see your party, start one, invite players, or join theirs.",
      },
    ],
  },
  {
    title: "Stats and progression",
    description: "Your record, the leaderboards, your level and your achievements.",
    rows: [
      {
        command: "/ts stats [category]",
        who: "Everyone",
        effect: "Opens your player stats, optionally narrowed to one category.",
      },
      {
        command: "/ts stats alltime|monthly|yearly <page>",
        who: "Everyone",
        effect: "Switches the stats view between all-time, monthly and yearly, and turns pages.",
      },
      {
        command: "/ts tops [category]",
        who: "Everyone",
        effect: "Opens the leaderboards for a category.",
      },
      {
        command: "/ts achievements",
        who: "Everyone",
        effect: "Shows your achievement progress.",
      },
      {
        command: "/ts level",
        who: "Everyone",
        effect: "Shows your level and XP progress.",
      },
    ],
  },
  {
    title: "Cosmetics, credits and voting",
    description: "How you look, your credits, and the two different things people call voting.",
    rows: [
      {
        command: "/ts store",
        who: "Everyone",
        effect: "Opens the cosmetic store, where you spend credits on in-game cosmetics.",
      },
      {
        command: "/tags",
        who: "Everyone",
        effect: "Chooses the tag shown next to your name in chat.",
      },
      {
        command: "/glow <colour>",
        who: "Everyone",
        effect: "Sets the outline glow around your character.",
      },
      {
        command: "/cosmetics",
        who: "Everyone",
        effect: "Opens your cosmetics.",
      },
      {
        command: "/balance",
        who: "Everyone",
        effect: "Shows your credit balance.",
      },
      {
        command: "/pay <player> <amount>",
        who: "Everyone",
        effect: "Sends credits to another player.",
      },
      {
        command: "/vote",
        who: "Everyone",
        effect:
          "Server-list voting on a Minecraft server directory. This is still being rolled out. It is separate from the in-arena vote.",
      },
    ],
  },
];
