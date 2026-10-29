/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#141414',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
        'text-muted': '#666666',
        'border-primary': '#2a2a2a',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-premium': 'var(--ease-out-premium)',
        'in-out-premium': 'var(--ease-in-out-premium)',
      },
      scale: {
        '97': '0.97',
        '98': '0.98',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
