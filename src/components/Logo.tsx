import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-hairline bg-bg-elev",
        className,
      )}
    >
      <Image
        src="/logo.gif"
        alt="TheySix Events logo"
        width={528}
        height={528}
        className="size-full object-cover"
        // Animated GIF: the optimiser skips these anyway, and asking it to
        // would only emit a warning per render.
        unoptimized
        priority
      />
    </span>
  );
}
