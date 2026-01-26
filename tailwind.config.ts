import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          vibrant: "#22c55e", // More balanced green (Tailwind green-500)
          deep: "#052e16",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        'xxs': '0.625rem', // 10px
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
