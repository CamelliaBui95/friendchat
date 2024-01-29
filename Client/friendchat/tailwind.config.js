/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

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
      colors: {
        darkBlue: withOpacity("--dark-blue"),
      },
    },
  },
  plugins: [],
};
