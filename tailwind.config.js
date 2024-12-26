/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        fadeOut: "fadeOut 0.3s ease-in-out",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#007BFF",
        secondary: "#ECF5FF",
        success: "#0CAF60",
        warning: "#ffbb33",
        danger: "#FD6A6A",
        info: "#33b5e5",
        grayE:'#718096'
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
