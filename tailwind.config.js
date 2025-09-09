/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // light gray
        input: 'var(--color-input)', // pure white
        ring: 'var(--color-ring)', // deep blue
        background: 'var(--color-background)', // warm off-white
        foreground: 'var(--color-foreground)', // rich charcoal
        primary: {
          DEFAULT: 'var(--color-primary)', // deep blue
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // sophisticated slate
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // clear red
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-50
          foreground: 'var(--color-muted-foreground)', // muted slate
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // success-oriented green
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // pure white
          foreground: 'var(--color-popover-foreground)', // rich charcoal
        },
        card: {
          DEFAULT: 'var(--color-card)', // pure white
          foreground: 'var(--color-card-foreground)', // rich charcoal
        },
        success: {
          DEFAULT: 'var(--color-success)', // deeper green
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // warm amber
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // clear red
          foreground: 'var(--color-error-foreground)', // white
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0, 0, 0, 0.1)',
        elevated: '0 10px 25px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        smooth: '200ms',
        layout: '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}