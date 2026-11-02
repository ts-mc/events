"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, CalendarDays, House, Info, Pause, Play, Scale, Share2, type LucideIcon } from "lucide-react";

type Destination = { id: string; href: string; label: string; icon: LucideIcon };

const destinations: Destination[] = [
  { id: "wiki", href: "https://wiki.theysix.tech", label: "Wiki", icon: BookOpen },
  { id: "events", href: "/", label: "Events", icon: CalendarDays },
  { id: "about", href: "https://theysix.tech/about", label: "About", icon: Info },
  { id: "main", href: "https://theysix.tech", label: "Main", icon: House },
  { id: "socials", href: "https://theysix.tech/socials", label: "Socials", icon: Share2 },
  { id: "legal", href: "/tos", label: "Legal", icon: Scale },
];

const slotClass = "flex min-h-12 min-w-14 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-ink-muted transition-colors duration-150 hover:bg-white/5 hover:text-ink sm:min-w-24";
const labelClass = "text-[9px] font-semibold tracking-[0.16em] uppercase sm:text-[10px]";

function Slot({ item }: { item: Destination }) {
  const Icon = item.icon;
  return <li><a href={item.href} className={slotClass}><Icon className="size-4" aria-hidden="true" /><span className={labelClass}>{item.label}</span></a></li>;
}

export function SiteHeader() {
  const left = destinations.slice(0, 3);
  const center = destinations[3];
  const CenterIcon = center.icon;
  const right = destinations.slice(4);
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => {
    audio.current?.pause();
    audio.current = null;
  }, []);

  const toggleAudio = () => {
    if (!audio.current) {
      audio.current = new Audio("/audio/vesper-hatamitsunami.mp3");
      audio.current.loop = true;
      audio.current.volume = 0.35;
      audio.current.addEventListener("error", () => setPlaying(false));
    }
    if (audio.current.paused) void audio.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { audio.current.pause(); setPlaying(false); }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <nav aria-label="Primary" className="theysix-dock pointer-events-auto max-w-full rounded-[999px] px-3 py-2">
        <ul className="flex items-center gap-1">
          {left.map((item) => <Slot key={item.id} item={item} />)}
          <li aria-hidden="true" className="h-8 w-px shrink-0 self-center bg-hairline" />
          <li className="-my-3 px-1"><a href={center.href} aria-label={`THEYSIX ${center.label}`} aria-current="page" className="theysix-dock-home grid size-16 place-items-center rounded-[999px] transition-colors duration-150 hover:border-brand sm:size-[4.5rem]"><CenterIcon className="size-6 text-brand" aria-hidden="true" /><span className={labelClass}>{center.label}</span></a></li>
          <li aria-hidden="true" className="h-8 w-px shrink-0 self-center bg-hairline" />
          {right.map((item) => <Slot key={item.id} item={item} />)}
          <li><button type="button" onClick={toggleAudio} aria-label={playing ? "Pause Vesper by HATAMITSUNAMI" : "Play Vesper by HATAMITSUNAMI"} aria-pressed={playing} className={slotClass}>{playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}<span className={labelClass}>Audio</span></button></li>
        </ul>
      </nav>
    </div>
  );
}
