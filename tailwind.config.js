/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#FAF8F5',
          100: '#F5F1EB',
          200: '#EADBC8',
          300: '#D4C4AB',
          400: '#B8A188',
          500: '#A97449',
          600: '#8B5E3C',
          700: '#7B4B28',
          800: '#5A3921',
          900: '#3D2817',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(123, 75, 40, 0.08)',
        'medium': '0 4px 16px rgba(123, 75, 40, 0.12)',
      },
    },
  },
  plugins: [],
}
