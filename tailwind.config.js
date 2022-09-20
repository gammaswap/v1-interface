/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#549AF0',
          grey: '#3E454F',
          black: '#121212'
        },
        accents: {
          royalBlue: '#5B57E1',
          dessertPeach: '#F09E6C'
        },
        secondary: {
          malibu: '#54BFF8',
          corn: '#FFED66',
          jungleGreen: '#43AA8B',
          jet: '#33312E',
          mediumPurple: '#9381FF',
          orangeRedCrayola: '#FF5E5B'
        },
        neutrals: {
          100: '#ECECED',
          200: '#D8DADC',
          300: '#C5C7CA',
          400: '#9FA2A7',
          500: '#787D84',
          600: '#656A72',
          700: '#383E47',
          800: '#2b3037',
          900: '#1f2328',
          1000: '#131518',
          1100: '#0C0E10',
          1200: '#060708',
        },
        semantic: {
          error: '#FF3131',
          warning: '#FF673A',
          success: '#23D86A',
          unavailable: '#ECECED'
        },
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
      fontFamily: {
        'sans': ['Inter', 'Montserrat'],
      },
    },
  },
  plugins: [],
}
