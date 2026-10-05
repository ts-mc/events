"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Logo } from "@/components/Logo";
import { CopyValue } from "@/components/CopyValue";
import {
  StatusDot,
  statusDotClass,
  statusLabel,
  statusPlayerText,
  useLiveStatus,
} from "@/components/ServerStatus";
import { DISCORD_URL, SERVER_ADDRESS } from "@/data/site";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/games", label: "Games" },
  { href: "/arenas", label: "Arenas" },
  { href: "/how-to-play", label: "How to Play" },
  { href: "/ranks", label: "Ranks" },
  { href: "/server", label: "Server" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { status } = useLiveStatus();
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close the mobile panel on navigation and on Escape.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    firstLinkRef.current?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 h-[var(--nav-height)] w-full border-b border-hairline bg-[#0B0E14]/85 backdrop-blur-xl">
      <div className="shell flex h-full items-center gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-control"
          aria-label="TheySix Events, home"
        >
          <Logo className="size-9" />
          <span className="flex items-baseline gap-2">
            <span className="text-[1.05rem] font-extrabold tracking-[-0.03em] text-ink">
              TheySix
            </span>
            <span className="label-mono rounded-pill bg-[#0E3A47] px-2 py-[3px] text-brand-hi">
              Events
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-control px-3 py-2 text-sm font-medium transition-colors duration-200",
                isActive(item.href)
                  ? "bg-brand/10 text-brand-hi"
                  : "text-ink-muted hover:bg-white/5 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <p
            className={cn(
              "label-mono hidden items-center gap-2 rounded-pill border border-hairline bg-surface/60 px-3 py-1.5 xl:flex",
              statusDotClass(status),
            )}
          >
            <StatusDot state={status === "loading" ? "loading" : status.state} />
            <span className="text-ink-muted">{statusPlayerText(status)}</span>
            <span className="sr-only">. {statusLabel(status)}</span>
          </p>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-control px-3 py-2 text-sm font-medium text-ink-muted transition-colors duration-200 hover:bg-blurple/15 hover:text-ink sm:inline-flex"
          >
            Discord
          </a>

          <CopyValue
            value={SERVER_ADDRESS}
            label="Copy IP"
            size="sm"
            className="hidden sm:inline-flex"
          />

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={panelId}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-control border border-hairline text-ink transition-colors duration-200 hover:bg-white/5 lg:hidden"
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            {menuOpen ? (
              <X size={18} aria-hidden />
            ) : (
              <Menu size={18} aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        hidden={!menuOpen}
        className="absolute inset-x-0 top-[var(--nav-height)] border-b border-hairline bg-[#0B0E14]/97 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Primary mobile" className="shell flex flex-col gap-1 py-4">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-control px-4 py-3 text-base font-medium transition-colors duration-200",
                isActive(item.href)
                  ? "bg-brand/10 text-brand-hi"
                  : "text-ink-muted hover:bg-white/5 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-3 flex flex-col gap-3 border-t border-hairline pt-4">
            <CopyValue value={SERVER_ADDRESS} label="Copy IP" size="md" />
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-control border border-hairline font-semibold text-ink transition-colors duration-200 hover:bg-blurple/15"
            >
              Join the Discord
            </a>
            <p className="label-mono flex items-center gap-2 px-1 text-ink-muted">
              <StatusDot
                state={status === "loading" ? "loading" : status.state}
              />
              <span className={statusDotClass(status)}>{statusLabel(status)}</span>
              <span aria-hidden>·</span>
              <span className="text-ink-muted">{statusPlayerText(status)}</span>
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
