/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef0f6',
          100: '#fdd7e7',
          200: '#fcb0cf',
          300: '#fa88b7',
          400: '#f861a0',
          500: '#f13c77',
          600: '#f13c77',
          700: '#d9215f',
          800: '#b11849',
          900: '#891135',
        },
        secondary: {
          50: '#fffdf8',
          100: '#fefbf0',
          200: '#fdf6db',
          300: '#fbf1c7',
          400: '#f8ecb7',
          500: '#f5e6ad',
          600: '#f5e6ad',
          700: '#e6d494',
          800: '#d4bf7a',
          900: '#c2aa60',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
