import { LinkProps } from '@nextui-org/link';
import Link from 'next/link';
import { LinkTreeElementProps } from '@/app/core/navigation/links/types';
import clsx from 'clsx';
import { ButtonProps } from '@nextui-org/button';
import LinkTransitionOverlay from '@/components/navigation/LinkTransitionOverlay';
import Transitions from '@/components/navigation/transitions';

export function LinkButton({
  href,
  children,
  className,
  color = 'primary'
}: Required<Pick<LinkProps, 'href' | 'children'>> & {
  className?: string;
  color?: ButtonProps['color'];
}) {
  return (
    <Transitions>
      <Link
        href={href}
        className={clsx(
          className,
          'relative m-0.5 h-fit w-fit rounded-xl bg-transparent p-0.5 px-2 outline-offset-2 duration-250 transition-colors-opacity',
          colorClassNames[color]
        )}
      >
        <div
          className={
            'absolute left-0 top-0 h-full w-full overflow-clip rounded-xl'
          }
        >
          <LinkTransitionOverlay />
        </div>
        {children}
      </Link>
    </Transitions>
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
  primary: 'text-primary  hover:bg-primary-100 outline-primary-400',
  danger: 'text-danger  hover:bg-danger-100 outline-danger-400',
  warning: 'text-warning  hover:bg-warning-100 outline-warning-400'
};
