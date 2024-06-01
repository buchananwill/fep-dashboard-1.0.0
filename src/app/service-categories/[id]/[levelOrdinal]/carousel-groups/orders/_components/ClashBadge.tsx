import { Badge, BadgeProps } from '@nextui-org/badge';
import clsx from 'clsx';

export function ClashBadge({
  show,
  className,
  children,
  ...otherProps
}: Omit<BadgeProps, 'color'> & { show: boolean }) {
  return (
    <Badge
      className={clsx(show ? '' : 'hidden')}
      color={'danger'}
      {...otherProps}
    >
      {children}
    </Badge>
  );
}
