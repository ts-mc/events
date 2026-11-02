import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Heading level, so each page keeps a correct outline. */
  as?: "h2" | "h3";
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  as: Heading = "h2",
}: SectionProps) {
  return (
    <section id={id} className={className} aria-labelledby={`${id}-heading`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-hairline pb-3">
        <p className="label-mono text-brand">{eyebrow}</p>
        <Heading id={`${id}-heading`} className="max-w-2xl text-[1.35rem] leading-[1.2] tracking-[-.02em] text-ink">
          {title}
        </Heading>
      </div>
      {description ? (
        <div className="mt-4 max-w-[45rem] text-[1.02rem] leading-[1.75] text-ink-muted">
          {description}
        </div>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}
