/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        navy: {
          950: '#060f1e',
          900: '#0a1628',
          800: '#0d1f3c',
          700: '#1B2A6B',
          600: '#2d4a99',
        },
        brand: {
          orange: '#F5A623',
          'orange-dark': '#d4890e',
        },
      },
    },
  },
  plugins: [],
}
