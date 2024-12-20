import { createTheme, MantineThemeOverride, rem } from '@mantine/core';

const blueColors = [
  '#e7f5ff',
  '#d0ebff',
  '#a5d8ff',
  '#74c0fc',
  '#4dabf7',
  '#339af0',
  '#228be6',
  '#1c7ed6',
  '#1971c2',
  '#1864ab'
] as const;

const mintColors = [
  '#e3fff2',
  '#d0fce6',
  '#a3f6ce',
  '#73f0b3',
  '#4cec9d',
  '#32e98e',
  '#21e886',
  '#0dcd73',
  '#00b765',
  '#009e54'
] as const;

const redColors = [
  '#fff5f5',
  '#ffe3e3',
  '#ffc9c9',
  '#ffa8a8',
  '#ff8787',
  '#ff6b6b',
  '#fa5252',
  '#f03e3e',
  '#e03131',
  '#c92a2a'
] as const;

const amberSunriseColors = [
  '255, 244, 226',
  '254, 231, 207',
  '248, 205, 162',
  '242, 178, 113',
  '237, 155, 72',
  '234, 140, 45',
  '234, 132, 29',
  '208, 113, 15',
  '185, 100, 8',
  '162, 85, 0'
] as const;

const amberSunriseColorsHex = [
  '#fff4e2',
  '#fee7cf',
  '#f8cda2',
  '#f2b271',
  '#ed9b48',
  '#ea8c2d',
  '#ea841d',
  '#d0710f',
  '#b96408',
  '#a25500'
] as const;

const royalAmethystColors = [
  '#f8eaff',
  '#e9d3ff',
  '#cea4f8',
  '#b272f2',
  '#9b48ed',
  '#8c2dea',
  '#851eea',
  '#7212d0',
  '#650dbb',
  '#5705a5'
] as const;

const grayColors = [
  '#f8f9fa',
  '#f1f3f5',
  '#e9ecef',
  '#dee2e6',
  '#ced4da',
  '#adb5bd',
  '#868e96',
  '#495057',
  '#343a40',
  '#212529'
] as const;

const MantineTheme: MantineThemeOverride = {
  autoContrast: true,
  spacing: {
    xxs: '0.4rem'
  },
  primaryColor: 'primary',
  colors: {
    success: mintColors,
    secondary: amberSunriseColors,
    primary: royalAmethystColors,
    danger: redColors,
    default: grayColors
  },
  lineHeights: {
    xxs: rem('16px'),
    xs: rem('20px'),
    sm: rem('24px'),
    md: rem('28px'),
    lg: rem('32px')
  },
  defaultRadius: 'lg',
  components: {
    Card: {
      defaultProps: { shadow: 'sm', withBorder: true }
    },
    Popover: {
      defaultProps: { shadow: 'md' }
    },
    Button: {
      defaultProps: { radius: 'md' }
    }
  }
};

export const defaultTheme = createTheme(MantineTheme);
