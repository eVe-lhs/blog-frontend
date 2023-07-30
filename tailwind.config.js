/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        extra: "#DFFFF9",
        primary: "#59B2A2",
        secondary: "#7FFFD4",
        primary_assent: "#FFA87F",
        secondary_assent: "#B37659"
      },
    },
  },
  plugins: [],
};