import Link from 'next/link';
import clsx from 'clsx';
import { ButtonProps } from '@mantine/core';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { colorClassNames } from '@/components/navigation/ColorClassNames';
import { LinkScrollTo } from '@/components/navigation/LinkScrollTo';
import { SetRequired } from 'type-fest';

export function LinkButton({
  href,
  children,
  className,
  color = 'primary',
  ...props
}: SetRequired<ComponentPropsWithoutRef<'a'>, 'href'> & {
  className?: string;
  color?: ButtonProps['color'];
} & PropsWithChildren) {
  if (href.startsWith('#')) {
    return (
      <LinkScrollTo
        href={href}
        {...props}
        className={clsx(
          className,
          'duration-250 transition-colors-opacity -m-1 inline-block h-fit w-fit whitespace-nowrap rounded-xl bg-transparent  px-1 outline-offset-2',
          colorClassNames[color]
        )}
      >
        {children}
      </LinkScrollTo>
    );
  }

  return (
    <Link
      {...props}
      href={href}
      className={clsx(
        className,
        'duration-250 transition-colors-opacity -m-1 inline-block h-fit w-fit whitespace-nowrap rounded-xl bg-transparent  px-1 outline-offset-2',
        colorClassNames[color]
      )}
    >
      {children}
    </Link>
  );
}
