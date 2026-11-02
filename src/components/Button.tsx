import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export const BUTTON_VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand text-[#020202] font-bold hover:bg-brand-2 shadow-[0_10px_34px_-16px_rgba(153,225,217,0.55)]",
  secondary: "glass text-ink hover:bg-surface-hover hover:border-hairline-hover",
  ghost: "text-ink-muted hover:text-ink hover:bg-white/5",
};

export const BUTTON_SIZES: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;
  const classes = cn(
    BASE,
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    className,
  );

  if ("href" in props && typeof props.href === "string") {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
