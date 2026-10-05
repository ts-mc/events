import Link from "next/link";

import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="relative isolate overflow-hidden">
      <span
        aria-hidden
        className="glow-orb -left-24 -top-28"
        style={{ width: 320, height: 320, background: "var(--brand)", opacity: 0.1 }}
      />
      <div className="shell relative py-28 text-center">
        <p className="label-mono text-crimson">404 · Not found</p>
        <h1 className="mt-5 text-[clamp(2rem,6vw,3.5rem)] leading-tight">
          <span className="text-gradient">Wrong arena.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-muted">
          That page does not exist. Nothing broken &mdash; just a link that
          never pointed anywhere.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            Back home
          </Button>
          <Button href="/games" variant="secondary" size="lg">
            Browse the games
          </Button>
        </div>
        <p className="mt-8">
          <Link
            href="/how-to-play"
            className="text-sm font-medium text-brand underline-offset-4 hover:text-brand-hi hover:underline"
          >
            Or read the how to play guide
          </Link>
        </p>
      </div>
    </div>
  );
}
