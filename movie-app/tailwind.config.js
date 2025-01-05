/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter'],
        'jura': ['Jura'],
        'playwrite': ['Playwrite CO Guides'],
        'pacifico': ['Pacifico'],
        'poppins': ['Poppins'],
      },
    },
  },
  plugins: [],
}

