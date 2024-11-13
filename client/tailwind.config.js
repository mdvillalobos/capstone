/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'NuButton': '#41518d',
        'NuButtonHover': '#7784e1',
        'NuBlue': '#35408e',
        'NuYellow': '#ffd41c',
        'nav': '#4b538f',
        'borderColor': '#f0f0f0',
        'highlight': '#c0454c',
        'backgroundColor': '#274546',
        'active': '#e3f2fd',
        'text-active': '#37a0f4',
      },

      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
        'Montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

