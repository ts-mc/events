import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-base": "var(--bg-base)",
        "bg-elev": "var(--bg-elev)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        hairline: "var(--border)",
        "hairline-hover": "var(--border-hover)",
        ink: "var(--text)",
        "ink-muted": "var(--text-muted)",
        "ink-dim": "var(--text-dim)",
        brand: "var(--brand)",
        "brand-hi": "var(--brand-hi)",
        "brand-2": "var(--brand-2)",
        lime: "var(--lime)",
        emerald: "var(--emerald)",
        amber: "var(--amber)",
        orange: "var(--orange)",
        rose: "var(--rose)",
        crimson: "var(--crimson)",
        magenta: "var(--magenta)",
        violet: "var(--violet)",
        indigo: "var(--indigo)",
        sky: "var(--sky)",
        teal: "var(--teal)",
        blurple: "var(--blurple)",
        "blurple-text": "var(--blurple-text)",
        "indigo-text": "var(--indigo-text)",
      },
      fontFamily: {
        sans: ["Trebuchet MS", "Lucida Sans Unicode", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        panel: "6px",
        card: "4px",
        control: "4px",
        /*
         * Pills (badges, arena IDs, stat captions) are used with `rounded-pill`
         * across a dozen components. Without this entry the class emits no CSS
         * at all and every pill renders as a sharp-cornered rectangle.
         */
        pill: "9999px",
      },
      fontSize: {
        mono: ["0.6875rem", { lineHeight: "1rem" }],
      },
      maxWidth: {
        shell: "1200px",
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "dot-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.85)" },
        },
        "cta-sweep": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "dot-pulse": "dot-pulse 3s ease-in-out infinite",
        "cta-sweep": "cta-sweep 6s linear infinite",
        "rise-in": "rise-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
