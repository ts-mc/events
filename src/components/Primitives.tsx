import { Timer, Trophy, Users } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconComponent = typeof Timer;

export function StatTile({
  icon: Icon,
  label,
  value,
  color,
  detail,
  children,
}: {
  icon: IconComponent;
  label: string;
  value: ReactNode;
  color: string;
  detail?: string;
  children?: ReactNode;
}) {
  return (
    <div className="px-6 py-7 sm:px-7">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="inline-flex size-8 items-center justify-center rounded-[10px]"
          style={{
            color,
            backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
            border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
          }}
        >
          <Icon size={16} />
        </span>
        <span className="label-mono text-ink-muted">{label}</span>
      </div>
      <p className="mt-3 font-mono text-3xl font-extrabold tracking-tight text-ink">
        {value}
      </p>
      {detail ? <p className="mt-1 text-sm text-ink-muted">{detail}</p> : null}
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="relative isolate overflow-hidden border-b border-hairline bg-bg-elev/40">
      <span
        aria-hidden
        className="glow-orb -left-24 -top-28"
        style={{ width: 340, height: 340, background: "var(--brand)", opacity: 0.11 }}
      />
      <span
        aria-hidden
        className="glow-orb -right-16 top-8"
        style={{ width: 260, height: 260, background: "var(--violet)", opacity: 0.09 }}
      />
      <div className="shell relative py-14 sm:py-18 lg:py-20">
        <p className="label-mono text-brand">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.05]">
          {title}
        </h1>
        <div className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </div>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </div>
  );
}

export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-5 text-base leading-relaxed text-ink-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ProseH2({ children }: { children: ReactNode }) {
  return <h2 className="pt-4 text-2xl text-ink">{children}</h2>;
}

export function ProseH3({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-lg text-ink">{children}</h3>;
}

export function ProseP({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function ProseList({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-brand">{children}</ul>
  );
}

export function Bullet({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}

export function Callout({
  tone = "brand",
  title,
  children,
}: {
  tone?: "brand" | "amber" | "crimson";
  title: string;
  children: ReactNode;
}) {
  const color =
    tone === "amber"
      ? "var(--amber)"
      : tone === "crimson"
        ? "var(--crimson)"
        : "var(--brand)";

  return (
    <aside
      className="rounded-card border p-5"
      style={{
        borderColor: `color-mix(in srgb, ${color} 32%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${color} 8%, transparent)`,
      }}
    >
      <p className="label-mono" style={{ color }}>
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-ink-muted">{children}</div>
    </aside>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="shell py-16 sm:py-20">{children}</div>;
}

export function TextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const classes =
    "tap-target font-medium text-brand underline-offset-4 transition-colors duration-200 hover:text-brand-hi hover:underline";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
