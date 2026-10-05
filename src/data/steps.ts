export type Step = {
  title: string;
  body: string;
  hue: string;
};

export const HOW_TO_PLAY_STEPS: Step[] = [
  {
    title: "Add the server",
    body: "Open your multiplayer list and add theysix.sparked.network. If your client insists on a port, use theysix.sparked.network:25625.",
    hue: "var(--sky)",
  },
  {
    title: "Join with any recent client",
    body: "Paper 1.21.11 runs the server, but anything from 1.9 upwards connects, on both Java and Bedrock. No special launcher needed.",
    hue: "var(--teal)",
  },
  {
    title: "Read the lobby",
    body: "The lobby tells you what is starting and who else is here. Vote for the game you want next, or wait for the timer.",
    hue: "var(--violet)",
  },
  {
    title: "Join an arena",
    body: "Run /ts quickjoin to drop into any arena with space, or /ts join PG-03 to pick one yourself. /ts opens a menu if you would rather click.",
    hue: "var(--orange)",
  },
  {
    title: "Win, then vote again",
    body: "Rounds are short by design. Finish your run, take your winnings, and vote for whatever you want to play next.",
    hue: "var(--emerald)",
  },
];
