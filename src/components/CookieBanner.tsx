"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "theysix-events:cookie-consent";

/**
 * Cookie banner for the single preference this site stores: whether you have
 * seen it. Nothing is set until you close it.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // Storage blocked: show the banner anyway rather than silently assuming consent.
      setVisible(true);
    }
  }, []);

  const dismiss = (remember: boolean) => {
    if (remember) {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ acknowledgedAt: Date.now() }),
        );
      } catch {
        // Ignore: the banner still closes for this session.
      }
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-panel border border-hairline bg-surface/95 p-5 shadow-[0_-10px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="label-mono text-brand">One local preference</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            This site sets no cookies. Dismissing this notice records your
            choice in your browser&apos;s local storage so we do not ask again.
            No analytics, no advertising, no tracking.
          </p>
          <Link
            href="/cookies"
            className="tap-target mt-1 inline-block text-sm font-medium text-brand underline-offset-4 hover:text-brand-hi hover:underline"
          >
            Read the cookie policy
          </Link>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => dismiss(false)}
            className="h-10 flex-1 rounded-control border border-hairline px-4 text-sm font-semibold text-ink-muted transition-colors duration-200 hover:bg-white/5 hover:text-ink sm:flex-none"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={() => dismiss(true)}
            className="h-10 flex-1 rounded-control bg-brand px-4 text-sm font-semibold text-[#070A12] transition-all duration-200 hover:bg-brand-hi sm:flex-none"
          >
            Got it
          </button>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        Cookie notice shown. It stores no cookies.
      </span>
    </div>
  );
}
