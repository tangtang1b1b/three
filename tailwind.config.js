/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.{js,ts,vue}",
    "./utils/transition.js"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
      '4xl': '2400px',
      '5xl': '3500px',
      '6xl': '4400px'
    },
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      Montserrat: ['Montserrat', 'sans-serif']
      // Cinzel: ['Cinzel', 'serif'], // 英文優先
      // Noto: ['Noto Serif TC', 'serif'], // 中文優先
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
        sm: '20px',
        md: '40px'
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px'
      }
    },
    zIndex: {
      '-10': '-10',
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      25: 25,
      50: 50,
      75: 75,
      100: 100,
      auto: 'auto'
    },
    transitionTimingFunction: {
      easeInCubic: 'cubic-bezier(0.32, 0, 0.67, 0)',
      easeOutQuint: 'cubic-bezier(0.33, 1, 0.68, 1)'
    },
    extend: {
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        pr: {
          light: '#C8F5FF',
          DEFAULT: '#00B2FF',
          dark: '#0A74A1'
        },
        sec: {
          DEFAULT: '#FFF4CE',
          dark: '#FFB647'
        },
        success: {
          DEFAULT: '#ABE06D',
          dark: '#61A035'
        },
        alert: {
          light: '#F0923E',
          DEFAULT: '#E34E1F'
        },
        bgc: {
          paper: '#FCFCFC',
          DEFAULT: '#D9D9D9'
        },
        ad: {
          DEFAULT: '#5A78FF',
          light: '#00F0FF',
          btn: '#104E88'
        },
        gray: {
          100: '#F2F4F7',
          200: '#E4E7EC',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#475467',
          700: '#1D2939',
          800: '#101828'
        },
        txt: {
          'super-light': '#75fa90',
          light: '#1DA539',
          DEFAULT: '#353437', // 預設文字顏色
          sec: '#FAD23B'
        },
      },
      spacing: {
        px: '1px',
        0: '0',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        30: '7.5rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem'
      },
      boxShadow: {
        btn: '0px 4px 10px rgba(46, 46, 46, 0.1)',
        card: '0px 4px 10px rgba(57, 87, 132, 0.2)',
        filter: '0px 4px 25px rgba(12, 12, 12, 0.1)',
        nav: '0px 2px 8px rgba(0, 0, 0, 0.15)',
        popup: '0px 4px 12px rgba(0, 0, 0, 0.1)'
      },
      borderRadius: {
        none: '0',
        sm: '.125rem',
        DEFAULT: '.25rem',
        lg: '.5rem',
        full: '9999px'
      },
      fontSize: {
        'dt/menu': [
          '18px',
          {
            lineHeight: '26.06px',
            letterSpacing: '6.4px',
            fontWeight: '500'
          }
        ],
        'dt/btn': [
          '24px',
          {
            lineHeight: '34.75px',
            fontWeight: '500'
          }
        ],
      }
    }
  },
  plugins: [],
}

