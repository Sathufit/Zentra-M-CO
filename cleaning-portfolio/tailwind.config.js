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
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      colors: {
        gold: {
          light: '#FCF6BA',
          DEFAULT: '#BF953F',
          dark: '#B38728',
        }
      },
      backgroundColor: {
        'rich-black': '#1A1A1A',
        'off-black': '#222222',
      }
    }
  },
  plugins: [],
}
}
