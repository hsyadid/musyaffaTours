import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      
      keyframes: {
        'tirai-kiri': {
          '0%': { transform: 'translateX(0)' },
          '40%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(0)' }
        },
        'tirai-kanan': {
          '0%': { transform: 'translateX(0)' },
          '40%': { transform: 'translateX(200px)' },
          '100%': { transform: 'translateX(0)' }
        },
        'padestal': {
          '0%': { transform: 'translateY(0) ' },
          '50%': { transform: 'translateY(50px)' },
          '100%': { transform: 'translateY(0)' }
        },
        wiggle: {
          '0%, 100%': {
              transform: 'rotate(-0.7deg)'
          },
          '50%': {
              transform: 'rotate(0.7deg)'
          },
        },
      },
      animation: {
        'tirai-kiri': 'tirai-kiri 0.5s ease-in-out',
        'tirai-kanan': 'tirai-kanan 0.5s ease-in-out',
        'padestal': 'padestal 0.5s ease-in-out',
        'left-1/2': 'left-1/2 -translate-x-1/2 0.5s ease-in-out',
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;
