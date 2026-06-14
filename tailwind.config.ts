import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#030712",
        panel: "#0f172a",
        line: "#22304a",
        electric: "#2563eb",
        glow: "#3b82f6",
        ember: "#f97316",
      },
      boxShadow: {
        glow: "0 0 40px rgba(37, 99, 235, 0.18)",
      },
      keyframes: {
        pulsebar: {
          "0%, 100%": { opacity: "0.5", transform: "scaleX(.75)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(48px,48px,0)" },
        },
      },
      animation: {
        pulsebar: "pulsebar 2.4s ease-in-out infinite",
        drift: "drift 7s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
