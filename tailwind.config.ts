import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", lg: "2.5rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        crimson: { DEFAULT: "#A3162C", dark: "#7E0F21", soft: "#F4DADD" },
        ink: { DEFAULT: "#15213B", soft: "#3A4660", muted: "#5D6779" },
        cream: { DEFAULT: "#FAF6EF", deep: "#F2EBDF" },
        line: "#E4DCCD",
        blush: "#F7E4E1",
        mint: "#E0EFE5",
        sky: "#E1ECF6",
        butter: "#F8EED0",
        lavender: "#ECE6F5",
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      maxWidth: { prose: "68ch" },
      boxShadow: {
        soft: "0 1px 2px rgba(21,33,59,.04), 0 8px 24px -12px rgba(21,33,59,.12)",
        lift: "0 2px 4px rgba(21,33,59,.05), 0 18px 40px -18px rgba(21,33,59,.25)",
      },
      keyframes: {
        kenburns: { "0%": { transform: "scale(1.04) translate3d(0,0,0)" }, "100%": { transform: "scale(1.14) translate3d(-1.5%,-1%,0)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: { kenburns: "kenburns 9s ease-out forwards", shimmer: "shimmer 1.4s infinite" },
    },
  },
  plugins: [],
} satisfies Config;
