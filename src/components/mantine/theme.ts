import { createTheme, MantineThemeOverride, rem } from '@mantine/core';

const celestialLagoonColors = [
  '#e0ffff',
  '#cefafc',
  '#a3f2f6',
  '#73eaf0',
  '#4ee4eb',
  '#36e0e8',
  '#21dee7',
  '#01c5ce',
  '#00afb8',
  '#0098a0'
] as const;

const celestialLagoonColorsRGB = [
  '224, 255, 255',
  '206, 250, 252',
  '163, 242, 246',
  '115, 234, 240',
  '78, 228, 235',
  '54, 224, 232',
  '33, 222, 231',
  '1, 197, 206',
  '0, 175, 184',
  '0, 152, 160'
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
  '#ffeae9',
  '#ffd5d2',
  '#f7a9a5',
  '#f07a73',
  '#eb5249',
  '#e8392f',
  '#e72b21',
  '#ce1d15',
  '#b81611',
  '#a1090b'
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
  '#f9ebff',
  '#ead3fe',
  '#d1a5f6',
  '#b873f0',
  '#a249eb',
  '#942fe8',
  '#8d21e7',
  '#7a14ce',
  '#6d0fb9',
  '#5e07a3'
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
    primary: royalAmethystColors,
    secondary: celestialLagoonColors,
    secondaryRGB: celestialLagoonColorsRGB,
    success: mintColors,
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
