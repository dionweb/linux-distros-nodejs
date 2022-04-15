module.exports = {
  content: ["./views/**/*.{html,ejs}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["Ubuntu", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "mono"],
      },
    },
  },
  plugins: [],
};
