/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        navy: '#111E31',
        coral: '#FFAEB2',
        mint: '#B2D7C8',
        olive: '#658E74',
        offwhite: '#FAFAFA',
        text: '#111E31',
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 32px rgba(17, 30, 49, 0.08)',
        glow: '0 0 40px rgba(178, 215, 200, 0.35)',
        coral: '0 8px 24px rgba(255, 174, 178, 0.35)',
        olive: '0 8px 24px rgba(101, 142, 116, 0.35)',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
