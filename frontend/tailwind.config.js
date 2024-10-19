/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "sky-blue": "var(--sky-blue)",
        "blue-green": "var(--blue-green)",
        "prussian-blue": "var(--prussian-blue)",
        "selective-yellow": "var(--selective-yellow)",
        "ut-orange": "var(--ut-orange)",
      },
      backgroundImage: {
        'index-hero': "url('./src/assets/index-background.jpg')",
      }
    },
  },
  plugins: [],
}