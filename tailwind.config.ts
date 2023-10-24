import { type Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontSize: {
      //   sm: "0.750rem",
      //   base: "1rem",
      //   xl: "1.333rem",
      //   "2xl": "1.777rem",
      //   "3xl": "2.369rem",
      //   "4xl": "3.158rem",
      //   "5xl": "4.210rem",
      // },
      // colors: {
      //   'text': 'var(--text)',
      //   'background': 'var(--background)',
      //   'primary': 'var(--primary)',
      //   'secondary': 'var(--secondary)',
      //   'accent': 'var(--accent)',
      //  },
      fontFamily: {
        heading: "Sintony",
        body: "Sintony",
      },
      // fontFamily: {
      //   heading: 'Noto Sans Gothic',
      //   body: 'Noto Sans Gothic',
      // },
      // fontWeight: {
      //   normal: '400',
      //   bold: '700',
      // },
    },
  },
  plugins: [],
} satisfies Config;
