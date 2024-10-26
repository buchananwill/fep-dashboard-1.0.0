import Link from 'next/link';
import { LinkTreeElementProps } from '@/app/core/navigation/links/types';
import clsx from 'clsx';
import { ButtonProps } from '@mantine/core';
import { PropsWithChildren } from 'react';

export function LinkButton({
  href,
  children,
  className,
  color = 'primary'
}: Required<Pick<HTMLAnchorElement, 'href'>> & {
  className?: string;
  color?: ButtonProps['color'];
} & PropsWithChildren) {
  return (
    <Link
      href={href}
      className={clsx(
        className,
        'm-0.5 h-fit w-fit rounded-xl bg-transparent p-0.5 px-2 outline-offset-2 duration-250 transition-colors-opacity',
        colorClassNames[color]
      )}
    >
      {children}
    </Link>
  );
}

export function NoLinkHeader({ displayLabel }: LinkTreeElementProps) {
  return (
    <div
      className={
        'm-0.5 h-fit w-fit rounded-xl bg-gray-200 bg-transparent p-0.5 px-2 text-black '
      }
    >
      {displayLabel}
    </div>
  );
}

const colorClassNames: Partial<{
  [Key in Exclude<ButtonProps['color'], undefined>]: string;
}> = {
  primary: 'text-primary  hover:bg-blue-100 outline-blue-400',
  danger: 'text-danger  hover:bg-red-100 outline-red-400',
  warning: 'text-yellow  hover:bg-yellow-100 outline-yellow-400'
};
