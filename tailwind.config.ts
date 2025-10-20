import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF2F2',
          100: '#FFE6E6',
          200: '#FFCCCC',
          300: '#FFB3B3',
          400: '#FF8E8E',
          500: '#FF6B6B',
          600: '#E85555',
          700: '#D84444',
          800: '#C03333',
          900: '#A82222',
          DEFAULT: '#FF6B6B',
        },
        secondary: {
          50: '#ECFDFB',
          100: '#D1FAF5',
          200: '#A7F3E8',
          300: '#6FD9D1',
          400: '#4ECDC4',
          500: '#3CB8AF',
          600: '#2FA39A',
          700: '#267A73',
          800: '#1F615C',
          900: '#1A504C',
          DEFAULT: '#4ECDC4',
        },
        accent: {
          50: '#FFFEF0',
          100: '#FFFAD6',
          200: '#FFF4AD',
          300: '#FFED8F',
          400: '#FFE66D',
          500: '#F5D84A',
          600: '#E0C230',
          700: '#B89E20',
          800: '#8F7A18',
          900: '#6B5C12',
          DEFAULT: '#FFE66D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
export default config