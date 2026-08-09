export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F6F1E7",
        paper: "#FFFDF8",
        ink: "#2C2620",
        inkSoft: "#5C5348",
        terracotta: "#C1734E",
        terracottaDeep: "#A85C3B",
        sage: "#8B9A7C",
        sageDeep: "#6E7D60",
        line: "#E4DBC9",
      },
      boxShadow: {
        soft: "0 18px 44px -20px rgba(44,38,32,.22)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-14px) rotate(-1deg)" },
        },
        shine: {
          "0%": { transform: "translateX(-120%) skewX(-15deg)" },
          "100%": { transform: "translateX(220%) skewX(-15deg)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(.22,.61,.36,1) both",
        floatY: "floatY 6s ease-in-out infinite",
        shine: "shine 0.85s ease forwards",
      },
    },
  },
  plugins: [],
};
