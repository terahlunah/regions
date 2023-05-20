/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 60s linear infinite',
      },
      colors: {
        'primary': '#869afc',
        'primary-variant': '#0b35c4',
        'secondary': '#03DAC6',
        'secondary-variant': '#008f6f',
        'surface': '#3b3737',
        'background': '#212121',
        'on-surface': '#FFFFFF',
        'on-background': '#FFFFFF',
        'on-primary': '#000000',
        'on-secondary': '#000000',
      }
    },
  },
  plugins: [],
}

