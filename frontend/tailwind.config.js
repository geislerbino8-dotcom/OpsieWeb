// tailwind.config.js
export default {
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
<<<<<<< HEAD
  plugins: [require('tailwind-scrollbar-hide')],
=======
  plugins: [],
>>>>>>> ce0d012d2bfe38afad31dc5bdcba1e3c39f06cbc
};