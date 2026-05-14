import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#000e29',
        'navy-deep': '#00040a',
        teal: {
          DEFAULT: '#03989e',
          light: '#21e0e0',
          dark: '#0f4d52',
          lowest: '#effefd',
        },
        slate: {
          700: '#334155',
          400: '#94a3b8',
          200: '#bdbdbd',
          50: '#f3f3f3',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'display-l': ['64px', { lineHeight: '80px', fontWeight: '700' }],
        'display-s': ['44px', { lineHeight: '56px', fontWeight: '700' }],
        'headline-l': ['40px', { lineHeight: '48px', fontWeight: '500' }],
        'headline-m': ['32px', { lineHeight: '40px', fontWeight: '500' }],
        'headline-s': ['24px', { lineHeight: '32px', fontWeight: '500' }],
        'title-l': ['22px', { lineHeight: '28px', fontWeight: '500' }],
        'title-m': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'label-xl': ['18px', { lineHeight: '26px', fontWeight: '500' }],
        'label-l': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'body-l': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-xl': ['18px', { lineHeight: '26px', fontWeight: '400' }],
        'body-s': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      backgroundImage: {
        'radial-teal': 'radial-gradient(ellipse at bottom left, #21e0e0 0%, #12bcbf 12%, #03989e 23%, #025e82 36%, #014174 42%, #002466 49%, #001948 61%, #000e29 73%, #000e29 100%)',
      },
      boxShadow: {
        btn: '0px 1px 3px rgba(0,0,0,0.05), inset 0px 3px 6px rgba(137,255,247,0.1)',
        input: '0px 1px 3px rgba(0,0,0,0.15)',
        card: '0px 4px 20px rgba(0,0,0,0.1)',
        glass: '0px 4px 15px rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
} satisfies Config
