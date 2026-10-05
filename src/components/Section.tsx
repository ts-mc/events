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
      <p className="label-mono text-brand">{eyebrow}</p>
      <Heading
        id={`${id}-heading`}
        className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.08]"
      >
        {title}
      </Heading>
      {description ? (
        <div className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
          {description}
        </div>
      ) : null}
      <div className="mt-10">{children}</div>
    </section>
  );
}
