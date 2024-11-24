import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/functions/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    data: {
      pressed: 'pressed~="true"'
    },
    extend: {
      colors: {
        primary: {
          50: 'var(--mantine-color-primary-0)',
          100: 'var(--mantine-color-primary-1)',
          200: 'var(--mantine-color-primary-2)',
          300: 'var(--mantine-color-primary-3)',
          400: 'var(--mantine-color-primary-4)',
          500: 'var(--mantine-color-primary-5)',
          600: 'var(--mantine-color-primary-6)',
          700: 'var(--mantine-color-primary-7)',
          800: 'var(--mantine-color-primary-8)',
          900: 'var(--mantine-color-primary-9)'
        }
      }
    }
  }
};
export default config;
