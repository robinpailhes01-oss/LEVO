import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FAF7F0", dark: "#F0EBE0" },
        navy: { DEFAULT: "#0B1F4A", mid: "#1E3A6E", light: "#2D5299" },
        electric: { DEFAULT: "#005FFF", light: "#4D8FFF" },
        border: { DEFAULT: "#E2D9C8", strong: "#C9BFA8" },
        text: {
          primary: "#0B1F4A",
          secondary: "#4A5568",
          muted: "#9AA5B4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      fontSize: {
        "5xl": "3rem",
        "6xl": "3.75rem",
        "7xl": "4.5rem",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(11, 31, 74, 0.08)",
        md: "0 4px 16px rgba(11, 31, 74, 0.08)",
        lg: "0 8px 32px rgba(11, 31, 74, 0.08)",
        xl: "0 16px 64px rgba(11, 31, 74, 0.08)",
      },
      transitionTimingFunction: {
        hero: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
