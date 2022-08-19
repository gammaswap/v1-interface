/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryV1: {
          1: '#5631F1',
          2: '#172F5E',
          3: '#936DFF',
          4: '#DBD5F6',
          5: '#9AA3C7',
          6: '#FF6663',
          7: '#69DC9E',
        },
        primaryV2: {
          1: '#74B3CE',
          2: '#508991',
          3: '#172A3A',
          4: '#004346',
          5: '#09BC8A',
        },
        primaryV3: {
          1: '#274060',
          2: '#335C81',
          3: '#65AFFF',
          4: '#1B2845',
          5: '#5899E2',
        },
        textV1: {
          1: '#F9FAFB',
          2: '#E5E7EB',
          3: '#D1D5DB',
          4: '#9CA3AF',
          5: '#6B7280',
          6: '#1F2937',
        },
        textV2: {
          1: '#F5F5F5',
          2: '#E5E5E5',
          3: '#D4D4D4',
          4: '#737373',
          5: '#404040',
          6: '#171717',
        },

      },
      fontFamily:{
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        //'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
