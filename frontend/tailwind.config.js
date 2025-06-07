/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Noto Sans KR", "sans-serif"],
        noto: ["Noto Sans KR", "sans-serif"],
      },
      colors: {
        "deep-navy": "#0a2d4a",
        "off-white": "#fefbf6",
      },
    },
  },
  plugins: [],
};
