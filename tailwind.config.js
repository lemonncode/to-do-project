/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        retro: {
          beige: "#f3e9dc",
          pink: "#f2c6c2",
          blue: "#bcd4e6",
          yellow: "#f6e7b4",
          mint: "#c4e3cb",
          border: "#333333",
        },
      },
      fontFamily: {
        retro: ['"VT323"', "monospace"], // o Press Start 2P si te gusta más pixelado
      },
      borderRadius: {
        window: "0.375rem",
      },
    },
  },
  plugins: [],
};



