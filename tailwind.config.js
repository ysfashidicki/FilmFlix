/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  daisyui: {
    themes: ["acid", "coffee"],
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
