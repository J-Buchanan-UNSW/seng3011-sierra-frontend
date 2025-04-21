/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        // Environmental colors (green)
        'env-50': '#f0fdf4',
        'env-100': '#dcfce7',
        'env-200': '#bbf7d0',
        'env-300': '#86efac',
        'env-400': '#4ade80',
        'env-500': '#22c55e',
        'env-600': '#16a34a',
        'env-700': '#15803d',
        'env-800': '#166534',
        'env-900': '#14532d',
        'env-950': '#052e16',

        // Social colors (blue)
        'soc-50': '#eff6ff',
        'soc-100': '#dbeafe',
        'soc-200': '#bfdbfe',
        'soc-300': '#93c5fd',
        'soc-400': '#60a5fa',
        'soc-500': '#3b82f6',
        'soc-600': '#2563eb',
        'soc-700': '#1d4ed8',
        'soc-800': '#1e40af',
        'soc-900': '#1e3a8a',
        'soc-950': '#172554',

        // Governance colors (red)
        'gov-50': '#fef2f2',
        'gov-100': '#fee2e2',
        'gov-200': '#fecaca',
        'gov-300': '#fca5a5',
        'gov-400': '#f87171',
        'gov-500': '#ef4444',
        'gov-600': '#dc2626',
        'gov-700': '#b91c1c',
        'gov-800': '#991b1b',
        'gov-900': '#7f1d1d',
        'gov-950': '#450a0a',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
};
