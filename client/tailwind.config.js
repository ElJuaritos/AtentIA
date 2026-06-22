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
        navy: '#0D1B2A',
        coral: '#FF6B6B',
        gold: '#FFD93D',
        mint: '#6BCB77',
        offwhite: '#F9F7F4',
        text: '#1A1A2E',
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 32px rgba(13, 27, 42, 0.08)',
        glow: '0 0 40px rgba(107, 203, 119, 0.35)',
        coral: '0 8px 24px rgba(255, 107, 107, 0.35)',
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
