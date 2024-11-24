import { ButtonProps } from '@mantine/core';

export const colorClassNames: Partial<{
  [Key in Exclude<ButtonProps['color'], undefined>]: string;
}> = {
  primary: 'text-primary-800  hover:bg-primary-100 outline-primary-400',
  danger: 'text-red-700  hover:bg-red-100 outline-red-400',
  warning: 'text-yellow-700  hover:bg-yellow-100 outline-yellow-400'
};
