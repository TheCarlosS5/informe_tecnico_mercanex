/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mercanex: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          accent: '#10B981',
          dark: '#059669',
          light: '#E6F9F0',
        },
        surface: {
          pure: '#ffffff',
          subtle: '#f8fafc',
          card: '#ffffff',
          elevated: '#f1f5f9',
          border: '#e2e8f0',
          borderStrong: '#cbd5e1',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
        'elevated': '0 20px 30px -10px rgba(15, 23, 42, 0.08)',
        'mint': '0 4px 20px rgba(16, 185, 129, 0.15)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      }
    },
  },
  plugins: [],
}
