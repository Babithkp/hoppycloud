/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Figtree", "sans-serif"],
    },
    extend: {
      colors: {
        primaryColor: "#012a6e",
        secondaryColor: "#6fe0ff",
        tertiary: "#1c6fb0",
        /* Brand navy, tinted across the same hue as primaryColor (#012a6e = brand-900) for every highlight use (text, rings, icons). */
        brand: {
          50: "#ebf2ff",
          100: "#d7e6ff",
          200: "#a9c9fe",
          300: "#6ca3fe",
          400: "#2b7afd",
          500: "#0257e3",
          600: "#0246b6",
          700: "#013893",
          800: "#01307e",
          900: "#012a6e",
          950: "#011b47",
        },
        subHeadingColor: "#B9B9B9",
      },
      keyframes: {
        // Landing hero: the newly picked screenshot rises, sharpens and settles into place.
        "hero-swap": {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.985)", filter: "blur(6px)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)", filter: "blur(0)" },
        },
      },
      animation: {
        "hero-swap": "hero-swap 0.85s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
