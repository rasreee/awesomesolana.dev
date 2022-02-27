/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily, colors } = require('tailwindcss/defaultTheme');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      fontFamily: {
        primary: ['Open Sans', ...fontFamily.sans],
        heading: ['Jost', 'sans-serif'],
        mono: ['monospace'],
        serif: ['sans-serif'],
      },
      colors: {
        primary: {
          50: '#F0FFF5',
          100: '#F0FFF5',
          200: '#CCFCE3',
          300: '#8CFAC7',
          400: '#2CE59B',
          500: '#00D68F',
          600: '#00B887',
          700: '#00997A',
          800: '#007D6C',
          900: '#004A45',
        },
        green: {
          ...colors.green,
          500: '#00D68F',
        },
        basic: { 600: '#8F9BB3' },
        dark: '#192038',
        base: {
          50: '#F8F9FC',
          100: '#F2F3F8',
          200: '#E6E9F2',
          300: '#CDD3E5',
          400: '#9AA8CB',
          500: '#687CB1',
          600: '#465886',
          700: '#2E3A59',
          800: '#222B45',
          900: '#192038',
          1000: '#151A30',
          1100: '#101426',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
      },
    },
  },
  variants: {
    typography: ['dark'],
    outline: ['focus', 'active', 'focus-within', 'focus-visible'],
    borderWidth: ['focus', 'active', 'focus-within', 'focus-visible'],
    borderColor: ['focus', 'active', 'focus-within', 'focus-visible'],
    color: ['disabled'],
    textOpacity: ['disabled'],
    opacity: ['disabled'],
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
