/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'tyranids': {
          100: '#EEEFEF',
          200: '#8E908F',
          300: '#7D7A79',
          400: '#616365',
          500: '#393836',
        },
        'dark': {
          100: '#121212',
          200: '#282828',
          300: '#3f3f3f',
          400: '#575757',
          500: '#717171',
          600: '#8b8b8b',
        },
      },
    },
  },
  plugins: [
  ],
}

