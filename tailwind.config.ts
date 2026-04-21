import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Familjen Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'ui-serif', 'cursive'],
      },
      colors: {
        // cozy-journal palette: warm cream paper, ink, tangerine marker, sage leaves
        paper: {
          DEFAULT: '#F5EBD8',
          soft: '#FBF3E2',
          warm: '#EFDFBF',
          deep: '#E6D1A6',
        },
        ink: {
          DEFAULT: '#2B2014',
          soft: '#4A3A26',
          muted: '#6E5B42',
          faded: '#98866B',
        },
        tangerine: {
          DEFAULT: '#E85D23',
          soft: '#F08A5D',
          light: '#FAD6B5',
          deep: '#B8431A',
        },
        sage: {
          DEFAULT: '#8AA579',
          soft: '#C5D3B2',
          deep: '#5E7A50',
        },
        marker: {
          yellow: '#F6D365',
          peach: '#FABC96',
          mint: '#B9DAB3',
        },
        ribbon: '#C53B2A',
      },
      boxShadow: {
        paper: '0 1px 0 rgba(43,32,20,0.08), 0 8px 24px -12px rgba(43,32,20,0.18)',
        tab: '2px 2px 0 rgba(43,32,20,0.12)',
        card: '0 2px 0 rgba(43,32,20,0.05), 0 12px 32px -18px rgba(43,32,20,0.25)',
        pressed: 'inset 0 2px 6px rgba(43,32,20,0.15)',
      },
      backgroundImage: {
        'lined-paper':
          'repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(138,165,121,0.22) 31px, rgba(138,165,121,0.22) 32px)',
        'paper-grain':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.17 0 0 0 0 0.13 0 0 0 0 0.08 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        'draw-underline': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'drift': {
          '0%,100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-4px) rotate(1deg)' },
        },
      },
      animation: {
        'draw-underline': 'draw-underline 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        'drift': 'drift 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
