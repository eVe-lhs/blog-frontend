/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        extra: "#DFFFF9",
        primary: "#59B2A2",
        secondary: "#7FFFD4",
        secondary_assent: "#FFA87F",
        primary_assent: "#B37659",
      },
      fontFamily: {
        header: ["Nunito", "sans-serif"],
        body: ["Nunito", "sans-serif"],
        temp: ["Play", "sans-serif"],
      },
    },
  },
  plugins: [],
};