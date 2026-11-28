// tailwind.config.js – Exact design tokens from DreamPath Student Career Dashboard (Stitch)
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Stitch Exact Material-Surface Design System
        surface: {
          DEFAULT: '#fbf9f2',
          dim: '#dcdad3',
          bright: '#fbf9f2',
          container: {
            lowest: '#ffffff',
            low: '#f6f4ed',
            DEFAULT: '#f0eee7',
            high: '#eae8e1',
            highest: '#e4e2dc',
          },
          variant: '#e4e2dc',
          tint: '#4e6074',
        },
        'on-surface': {
          DEFAULT: '#1b1c18',
          variant: '#43474c',
        },
        'on-background': '#1b1c18',
        background: '#fbf9f2',
        outline: {
          DEFAULT: '#74777d',
          variant: '#c4c6cd',
        },
        primary: {
          DEFAULT: '#4e6074',
          container: '#cfe2fa',
          fixed: '#d1e4fc',
          'fixed-dim': '#b5c8e0',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#526579',
          fixed: '#091d2e',
          'fixed-variant': '#36485c',
        },
        secondary: {
          DEFAULT: '#506358',
          container: '#d3e8da',
          fixed: '#d3e8da',
          'fixed-dim': '#b7cbbe',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#56695e',
          fixed: '#0d1f17',
          'fixed-variant': '#394b41',
        },
        tertiary: {
          DEFAULT: '#6c5964',
          container: '#f3dae7',
          fixed: '#f5dce9',
          'fixed-dim': '#d8c0cd',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#715e69',
          fixed: '#251720',
          'fixed-variant': '#53424c',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#93000a',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 2px 14px -3px rgba(42, 36, 27, 0.04), 0 1px 4px -1px rgba(42, 36, 27, 0.02)',
        card: '0 8px 20px -4px rgba(40, 30, 20, 0.05), 0 2px 6px -2px rgba(40, 30, 20, 0.03)',
        float: '0 12px 28px -6px rgba(78, 96, 116, 0.25), 0 4px 10px -2px rgba(78, 96, 116, 0.15)',
        podium: '0 12px 30px -8px rgba(78, 96, 116, 0.18)',
      },
    },
  },
  plugins: [],
};
