import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#2b1c14",
        paper: "#f7f1e6",
        "paper-2": "#fffdf9",
        "sidebar-top": "#3a2a3f",
        "sidebar-bottom": "#241621",
        burgundy: {
          DEFAULT: "#8B2E20",
          dark: "#6e2418",
        },
        gold: "#c98a3a",
        muted: "#8a7d6f",
        line: "#e7ddc9",
        amber: {
          bg: "#fbeee0",
          line: "#e7c48f",
          text: "#8a5a1f",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        card: "18px",
      },
    },
  },
  plugins: [],
};

export default config;
