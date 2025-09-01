/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          dark: '#002c6d',
          light: '#2a6db0',
        }
      },
      animation: {
        'scroll': 'scroll 30s linear infinite',
      }
    },
  },
  plugins: [],
};