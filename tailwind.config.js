/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "kanvas-pink": "#9F204C",
        "kanvas-blue": "#028AD0",
        "kanvas-grey": "#EFEFEF",
        "kanvas-darker-grey": "#777777",
        "kanvas-text-grey": "#4A4A4A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
