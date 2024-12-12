/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/frontend/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 2px 6px #0000001a',
      },
      width: {
        128: '32rem', // 512px
        144: '36rem', // 576px
      },
    },
  },
  plugins: [],
};
