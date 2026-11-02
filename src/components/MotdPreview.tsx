"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const motds = [
  {
    top: "TheySix Events  >>  19 Minigames  [ 1.21.11+ ]",
    games: ["ʀᴀᴄᴇ", "ᴛɴᴛ ʀᴜɴ", "ʙʟᴏᴄᴋ ᴘᴀʀᴛʏ"],
    offset: "       ",
  },
  {
    top: "TheySix Events  >>  19 Minigames  [ 1.21.11+ ]",
    games: ["sᴘʟᴇᴇꜰ", "ᴏɴᴇ ɪɴ ᴛʜᴇ ᴄʜᴀᴍʙᴇʀ", "ᴋɴᴏᴄᴋʙᴀᴄᴋ"],
    offset: "    ",
  },
  {
    top: "TheySix Events  >>  Free to Play  [ 1.21.11+ ]",
    games: ["ᴛɴᴛ ᴛᴀɢ", "ʙʀɪᴅɢᴇ ʀᴀᴄᴇ", "sɴᴏᴡʙᴀʟʟ ꜰɪɢʜᴛ"],
    offset: "    ",
  },
  {
    top: "TheySix Events  >>  Free to Play  [ 1.21.11+ ]",
    games: ["sᴘʟᴇɢɢ", "ꜰᴀsᴛ ᴢᴏɴᴇ", "ᴇxᴘʟᴏᴅɪɴɢ sʜᴇᴇᴘ"],
    offset: "     ",
  },
  {
    top: "TheySix Events  >>  Pinata Party  [ 1.21.11+ ]",
    games: ["ᴛʀᴀꜰꜰɪᴄ ʟɪɢʜᴛ", "ᴄʜᴀɪʀs", "ʀᴇᴅ ᴀʟᴇʀᴛ"],
    offset: "      ",
  },
  {
    top: "TheySix Events  >>  Pinata Party  [ 1.21.11+ ]",
    games: ["ᴍɪɴᴇꜰɪᴇʟᴅ", "ᴀʟʟ ᴀɢᴀɪɴsᴛ ᴀʟʟ", "ᴡᴀᴛᴇʀ ᴡᴇʟʟ"],
    offset: "      ",
  },
  {
    top: "TheySix Events  >>  Java&Bedrock  [ 1.21.11+ ]",
    games: ["ʀᴀᴄᴇ", "sᴘʟᴇᴇꜰ", "ᴛɴᴛ ᴛᴀɢ", "ʙʟᴏᴄᴋ ᴘᴀʀᴛʏ"],
    offset: "      ",
  },
  {
    top: "TheySix Events  >>  Java&Bedrock  [ 1.21.11+ ]",
    games: ["ᴋɴᴏᴄᴋʙᴀᴄᴋ", "ʙʀɪᴅɢᴇ ʀᴀᴄᴇ", "sᴘʟᴇɢɢ"],
    offset: "        ",
  },
];

const colors = ["#ec8c8c", "#ffc58b", "#ffff9e", "#9aff9a", "#97cff5"];

function gradient(text: string, from: string, to: string) {
  return `<gradient:${from}:${to}>${text}</gradient>`;
}

function rawMotd(motd: (typeof motds)[number]) {
  const gameLine = motd.games
    .map((game, index) => {
      const from = colors[index];
      const to = colors[index + 1] ?? colors[index];
      return gradient(`${index ? "• " : ""}${game} `, from, to);
    })
    .join("");
  return `line1="      <b><gradient:#4cadd0:#b2f9ff>TheySix Events</gradient></b> <gray>>></gray> <white>${motd.top.split("  >>  ")[1].split("  [")[0]}</white> <gray>[</gray><white>1.21.11+</white><gray>]</gray>"\nline2="${motd.offset}<b>${gameLine}</b>"\nicon=ts-64px`;
}

export function MotdPreview() {
  const [index, setIndex] = useState(0);
  const current = motds[index];

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % motds.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mt-5 overflow-hidden rounded-card border border-hairline bg-bg p-4 sm:p-5" aria-live="polite">
      <div className="flex items-center gap-3 border-b border-hairline pb-4">
        <Image src="/ts-64px.png" alt="TheySix server icon" width={48} height={48} className="h-12 w-12 rounded-control" />
        <div className="min-w-0">
          <p className="label-mono text-ink-muted">Server list preview</p>
          <p className="mt-1 truncate font-mono text-sm font-bold text-ink">play.theysix.tech</p>
        </div>
        <span className="ml-auto shrink-0 font-mono text-xs text-ink-muted">{index + 1} / {motds.length}</span>
      </div>
      <div className="mt-4 overflow-x-auto rounded-control bg-[#101820] p-4 font-mono text-[11px] leading-6 sm:text-xs" aria-label={`Message variant ${index + 1} of ${motds.length}`}>
        <p className="whitespace-pre">      <strong className="bg-gradient-to-r from-[#4cadd0] to-[#b2f9ff] bg-clip-text text-transparent">TheySix Events</strong> <span className="text-[#aaaaaa]">&gt;&gt;</span> <span className="text-white">{current.top.split("  >>  ")[1].split("  [")[0]}</span> <span className="text-[#aaaaaa]">[</span><span className="text-white">1.21.11+</span><span className="text-[#aaaaaa]">]</span></p>
        <p className="whitespace-pre">{current.offset}<strong>{current.games.map((game, gameIndex) => <span key={game} className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${colors[gameIndex]}, ${colors[gameIndex + 1] ?? colors[gameIndex]})` }}>{gameIndex ? `• ${game} ` : `${game} `}</span>)}</strong></p>
      </div>
      <p className="label-mono mt-5 text-ink-muted">MiniMessage configuration · changes every 7 seconds</p>
      <pre className="mt-3 max-h-40 overflow-auto select-all whitespace-pre-wrap break-words rounded-control bg-bg-elev p-4 font-mono text-[11px] leading-relaxed text-ink-muted">{rawMotd(current)}</pre>
    </div>
  );
}
