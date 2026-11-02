import { type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type IconComponent = LucideIcon;

/**
 * One tile in the home page's live stat strip: a coloured icon, a mono label
 * and the value itself.
 */
export function StatTile({
  icon: Icon,
  label,
  value,
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
    <div className="px-3 py-5 sm:px-5">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="inline-flex size-5 items-center justify-center text-brand"
        >
          <Icon size={16} />
        </span>
        <span className="label-mono text-ink-muted">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-black tracking-tight text-ink">
        {value}
      </p>
      {detail ? <p className="mt-1 text-sm text-ink-muted">{detail}</p> : null}
      {children}
    </div>
  );
}
