// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2D6A9F",
          secondary: "#6BBF59",
          accent: "#FFD166",
          ink: "#333333",
          milk: "#FFFFFF",
          cream: "#FAF9F6",
          deep: "#1A4F75",
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
