import { Badge, BadgeProps } from '@nextui-org/badge';
import clsx from 'clsx';

export function ClashBadge({
  show,
  className,
  children,
  content,
  ...otherProps
}: Omit<BadgeProps, 'color'> & { show: boolean }) {
  return (
    <div className={'relative inline-block h-full w-full'}>
      {children}
      {show && (
        <span
          className={
            'absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white'
          }
        >
          {content}
        </span>
      )}
    </div>
  );
}
