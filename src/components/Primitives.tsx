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
    <div className="shell pt-16 sm:pt-24">
      <header className="max-w-[760px] border-b border-hairline py-8 sm:py-12">
        <p className="label-mono text-brand">{eyebrow}</p>
        <h1 className="mt-3 text-[clamp(2.8rem,7vw,6rem)] leading-[.94] tracking-[-.04em] text-[#fbffee]">
          {title}
        </h1>
        <div className="mt-5 max-w-2xl text-[1.08rem] leading-[1.75] text-ink-muted">
          {description}
        </div>
        {children ? <div className="mt-8">{children}</div> : null}
      </header>
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
        "max-w-[720px] space-y-5 text-[1.02rem] leading-[1.82] text-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ProseH2({ children }: { children: ReactNode }) {
  return <h2 className="pt-4 text-[1.7rem] leading-[1.15] text-[#fbffee]">{children}</h2>;
}

export function ProseH3({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-[1.25rem] text-[#fbffee]">{children}</h3>;
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
  return <div className="shell pt-12 pb-24 sm:pb-36">{children}</div>;
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
