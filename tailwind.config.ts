// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0284c7",
          secondary: "#22c55e",
          accent: "#38bdf8",
          ink: "#0f172a",
          milk: "#f0f9ff",
          cream: "#f8fafc",
          deep: "#0369a1",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Montserrat", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,.08)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [typography], // <<< enable it
};
export default config;
