import { ButtonProps } from '@mantine/core';

export const colorClassNames: Partial<{
  [Key in Exclude<ButtonProps['color'], undefined>]: string;
}> = {
  primary: 'text-blue-500  hover:bg-blue-100 outline-blue-400',
  danger: 'text-red-500  hover:bg-red-100 outline-red-400',
  warning: 'text-yellow-500  hover:bg-yellow-100 outline-yellow-400'
};