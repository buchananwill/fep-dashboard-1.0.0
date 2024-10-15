import { Badge } from '@nextui-org/react';
import clsx from 'clsx';
import { UseBadgeProps } from '@nextui-org/badge/dist/use-badge';

export function ClashBadge({
  show,
  className,
  children,
  ...otherProps
}: Pick<UseBadgeProps, 'className' | 'children' | 'content'> & {
  show: boolean;
}) {
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
