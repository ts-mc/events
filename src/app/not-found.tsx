import Link from "next/link";

import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="shell py-24 sm:py-32">
      <div className="max-w-[760px] text-left">
        <p className="label-mono text-crimson">404 · Not found</p>
        <h1 className="mt-5 text-[clamp(2rem,6vw,3.5rem)] leading-tight">
          <span className="text-gradient">Wrong arena.</span>
        </h1>
        <p className="mt-5 max-w-[45rem] text-[1.08rem] leading-[1.75] text-ink-muted">
          That page does not exist. Nothing broken &mdash; just a link that
          never pointed anywhere.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
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
