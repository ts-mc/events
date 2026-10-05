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
