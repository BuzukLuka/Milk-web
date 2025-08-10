import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2D6A9F", // Dairy Blue
          secondary: "#6BBF59", // Fresh Green
          accent: "#FFD166", // Golden Cream (hover/accent)
          ink: "#333333", // Text
          milk: "#FFFFFF",
          cream: "#FAF9F6", // Background
          deep: "#1A4F75", // Link hover / dark primary
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
  plugins: [],
};
export default config;
