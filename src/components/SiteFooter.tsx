import Link from "next/link";

import { Logo } from "@/components/Logo";
import {
  BUSINESS_EMAIL,
  DISCORD_BRIDGE_CHANNEL,
  DISCORD_HANDLE,
  DISCORD_URL,
  SERVER_ADDRESS,
  SERVER_SOFTWARE,
  SERVER_VERSION,
  SITE_URL,
} from "@/data/site";

const COLUMNS = [
  {
    title: "Server",
    links: [
      { href: "/games", label: "All minigames" },
      { href: "/arenas", label: "Arena guide" },
      { href: "/how-to-play", label: "How to play" },
      { href: "/ranks", label: "Ranks" },
      { href: "/server", label: "Technical info" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: DISCORD_URL, label: "Discord", external: true },
      { href: "/privacy", label: "Privacy" },
      { href: "/cookies", label: "Cookies" },
      { href: "/tos", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline bg-bg/70">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="size-10" />
              <span className="flex items-baseline gap-2">
                <span className="text-base font-extrabold tracking-[-0.03em] text-ink">
                  TheySix
                </span>
                <span className="label-mono rounded-pill bg-[#0E3A47] px-2 py-[3px] text-brand-hi">
                  Events
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              A Minecraft minigame server: 19 games across 6 arenas, played on
              one address. Java and Bedrock both welcome.
            </p>
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="tap-target mt-2 break-all font-mono text-xs font-bold text-brand transition-colors hover:text-brand-hi"
            >
              {BUSINESS_EMAIL}
            </a>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="label-mono text-ink-muted">{column.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tap-target text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="tap-target text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="label-mono text-ink-muted">Legal</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              This server and website are not an official Minecraft product.
              They are not approved by or associated with Mojang Studios or
              Microsoft.
            </p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-ink-muted">
              Minecraft is a trademark of Mojang Studios.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-hairline pt-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-2">
            <p className="label-mono text-ink-muted">
              {SERVER_SOFTWARE} {SERVER_VERSION} · {SERVER_ADDRESS}
            </p>
            <p className="max-w-2xl text-xs leading-relaxed text-ink-muted">
              TheySix Events is an independent community server. It is not
              sponsored, endorsed or operated by Mojang Studios or Microsoft.
              Server details shown on this site are for information only and may
              change without notice.
            </p>
          </div>
          <div className="space-y-1.5 text-xs text-ink-muted">
            <p>
              In-game chat is bridged to{" "}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target text-blurple-text hover:text-ink"
              >
                Discord {DISCORD_BRIDGE_CHANNEL}
              </a>
            </p>
            <p>
              <a
                href={`${SITE_URL}/tos`}
                className="tap-target hover:text-ink"
              >
                Terms
              </a>
              {" · "}
              <Link href="/privacy" className="tap-target hover:text-ink">
                Privacy
              </Link>
              {" · "}
              <Link href="/cookies" className="tap-target hover:text-ink">
                Cookies
              </Link>
              {" · "}
              <span className="font-mono">{DISCORD_HANDLE}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
