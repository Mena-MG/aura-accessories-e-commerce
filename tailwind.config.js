/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDFBF7',
          100: '#F7F3EC',
          200: '#EDE5D8',
          300: '#DED1BC',
          400: '#CBB79B',
          500: '#C5A059', // Primary luxury gold accent
          600: '#AB843E',
          700: '#8A672C',
          800: '#644A20',
          900: '#3D2C13',
          dark: '#161513',
        },
        cream: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#E9DFC6',
          300: '#DDD0B3',
        },
        noir: {
          800: '#23211E',
          900: '#141311',
          950: '#0C0B0A',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
        'luxe': '0 20px 40px -15px rgba(197, 160, 89, 0.15)',
        'floating': '0 30px 60px -12px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
