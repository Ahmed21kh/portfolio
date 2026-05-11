/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#050A14',
          secondary: '#0A1628',
          card: '#0D1F3C',
        },
        accent: {
          blue: '#2563EB',
          cyan: '#06B6D4',
          glow: '#3B82F6',
        },
        text: {
          primary: '#F0F6FF',
          secondary: '#94A3B8',
          muted: '#475569',
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)",
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.25) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(13,31,60,0.8) 0%, rgba(10,22,40,0.9) 100%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(37,99,235,0.3)',
        'glow-sm': '0 0 15px rgba(37,99,235,0.2)',
        'card': '0 4px 40px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
