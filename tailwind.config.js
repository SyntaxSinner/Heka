/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          500: '#6b4f99', // Custom violet color
        },
        green: {
          500: '#38a169', // Custom green color
        },
      },
    },
  },
  plugins: [],
};
