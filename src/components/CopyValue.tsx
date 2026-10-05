"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "@/components/Button";
import { cn } from "@/lib/utils";

type CopyValueProps = {
  /** Text placed on the clipboard. */
  value: string;
  /** Visible label. */
  label?: string;
  /** Text announced to screen readers after a successful copy. */
  copiedLabel?: string;
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof BUTTON_SIZES;
  className?: string;
  /** Renders the value in a monospace block instead of a button. */
  asBlock?: boolean;
  onCopied?: (value: string) => void;
};

export function CopyValue({
  value,
  label = "Copy IP",
  copiedLabel = "Copied",
  variant = "primary",
  size = "md",
  className,
  asBlock = false,
  onCopied,
}: CopyValueProps) {
  const [state, setState] = useState<"idle" | "copied" | "fallback">("idle");
  const [announcement, setAnnouncement] = useState("");
  const [pendingSelect, setPendingSelect] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  // Unique per instance: the same value can appear more than once on a page,
  // and duplicate ids would be invalid HTML.
  const targetId = `copy-target-${useId().replace(/[^a-zA-Z0-9]+/g, "")}`;

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  // The fallback view only exists after the state change renders, so select
  // the value once it is actually in the document.
  useEffect(() => {
    if (!pendingSelect) return;
    const node = targetRef.current;
    if (!node) return;
    setPendingSelect(false);

    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  }, [pendingSelect, state]);

  const flash = useCallback((next: "copied" | "fallback", message: string) => {
    setState(next);
    setAnnouncement(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }, []);

  const handleCopy = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);

    const clipboard =
      typeof navigator !== "undefined" ? navigator.clipboard : undefined;

    if (clipboard?.writeText) {
      try {
        await clipboard.writeText(value);
        flash("copied", `${value} copied to clipboard`);
        onCopied?.(value);
        return;
      } catch {
        // Blocked by permissions or an insecure context: fall through.
      }
    }

    // Fallback for a missing or blocked Clipboard API. The value stays
    // selectable so the player can copy it by hand.
    flash("fallback", "Copying was blocked, the address is selected instead");
    onCopied?.(value);
    setPendingSelect(true);
  }, [flash, onCopied, value]);

  const isCopied = state === "copied";

  if (asBlock) {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "group flex w-full items-center justify-between gap-3 rounded-card border px-5 py-4 text-left",
            "transition-all duration-200 hover:-translate-y-0.5",
            isCopied
              ? "border-emerald/60 bg-emerald/10"
              : "border-hairline bg-surface/70 hover:border-brand/50"
          )}
        >
          <span className="min-w-0">
            <span className="label-mono block text-ink-muted">
              {isCopied ? copiedLabel : "Server address"}
            </span>
            <span
              id={targetId}
              ref={targetRef}
              className="mt-1 block select-all break-all font-mono text-lg font-bold text-ink sm:text-xl"
            >
              {value}
            </span>
          </span>
          <span
            className={cn(
              "label-mono flex shrink-0 items-center gap-1.5 rounded-pill px-3 py-1.5",
              isCopied
                ? "bg-emerald/20 text-emerald"
                : "bg-brand/15 text-brand group-hover:bg-brand/25"
            )}
          >
            {isCopied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
            {isCopied ? "Copied" : "Copy"}
          </span>
        </button>
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    );
  }

  if (state === "fallback") {
    // Clipboard was unavailable or refused. Show the value as selectable text
    // rather than leaving a button that silently does nothing.
    return (
      <span className={cn("inline-flex items-center gap-2", className)}>
        <span
          id={targetId}
          ref={targetRef}
          className="select-all rounded-control border border-amber/50 bg-amber/10 px-3 py-2 font-mono text-xs font-bold text-amber"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="label-mono rounded-control border border-hairline px-2.5 py-2 text-ink-muted transition-colors duration-200 hover:text-ink"
        >
          Retry
        </button>
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-all duration-200",
          BUTTON_VARIANTS[variant],
          BUTTON_SIZES[size],
          isCopied && "ring-2 ring-emerald/60",
          className,
        )}
      >
        {isCopied ? (
          <Check size={16} aria-hidden />
        ) : (
          <Copy size={16} aria-hidden />
        )}
        {isCopied ? copiedLabel : label}
      </button>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </>
  );
}
