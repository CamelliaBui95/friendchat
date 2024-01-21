/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bgLanding: "var(--bg-landingPage)",
        bgGradient: "var(--bg-gradient)",
      },
      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};

