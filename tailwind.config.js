/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "kanvas-pink": "#9F204C",
        "kanvas-blue": "#028AD0",
        "kanvas-grey": "#EFEFEF",
        "kanvas-darker-grey": "#777777",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
