import { MantineThemeOverride } from '@mantine/core';

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
export const MantineTheme: MantineThemeOverride = {
  colors: {
    primary: blueColors,
    danger: redColors
  },
  defaultRadius: 'lg',
  components: {
    Card: {
      defaultProps: { shadow: 'md' }
    },
    Popover: {
      defaultProps: { shadow: 'md' }
    }
  }
};