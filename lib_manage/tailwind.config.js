/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customgray: "#333333", // light gray
        customdark: "#1A1A1A", // dark theme black
      },
    },
  },
  plugins: [],
}
