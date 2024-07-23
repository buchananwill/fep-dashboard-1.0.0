import { LinkProps } from '@nextui-org/link';
import Link from 'next/link';
import { LinkTreeElementProps } from '@/app/core/navigation/types';
import clsx from 'clsx';

export function LinkButton({
  href,
  children,
  className
}: Required<Pick<LinkProps, 'href' | 'children'>> & { className?: string }) {
  return (
    <Link
      href={href}
      className={clsx(
        className,
        'm-0.5 h-fit w-fit rounded-xl bg-transparent p-0.5 px-2 text-primary outline-offset-2 outline-primary-400 duration-250 transition-colors-opacity hover:bg-primary-100'
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
