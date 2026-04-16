// tailwind.config.js
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        anton: ["Anton", "sans-serif"],
        scheherazade: ["Scheherazade New", "serif"],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};