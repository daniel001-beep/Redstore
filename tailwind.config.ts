import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        foreground: "#e2e8f0",
        card: {
          DEFAULT: "rgba(15, 23, 42, 0.6)",
          foreground: "#e2e8f0",
        },
        primary: {
          DEFAULT: "#10b981",
          foreground: "#020617",
        },
        accent: {
          DEFAULT: "#3b82f6",
          foreground: "#020617",
        },
        muted: {
          DEFAULT: "#1e293b",
          foreground: "#94a3b8",
        },
        border: "#1e293b",
        ring: "#10b981",
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fef2f2",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
    },
  },
  plugins: [],
};

export default config;
