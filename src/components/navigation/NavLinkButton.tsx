import { Button, ButtonProps } from '@nextui-org/button';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import {
  NavigationType,
  navLinkIcons
} from '@/components/navigation/navLinkIcons';
import { startCase } from 'lodash';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';
import { TooltipMemo } from '@/app/service-categories/[id]/roles/_components/SimpleTooltip';
import { Link } from '@nextui-org/link';
import { mainNavLinkList } from '@/components/navigation/navLinks';

export default function NavLinkButton({
  className,
  navigationType
}: { navigationType: NavigationType } & PropsWithChildren &
  Omit<ButtonProps, 'isIconOnly' | 'variant'>) {
  const rotate = navigationType === 'workSchemaNodeAssignments';
  const Icon = navLinkIcons[navigationType];
  const label = startCase(navigationType);

  const floatingTooltip = useFloatingTooltip(<TooltipMemo text={label} />);

  return (
    <Link href={mainNavLinkList[navigationType]}>
      <Button
        isIconOnly={true}
        className={clsx(
          'h-12 w-12 rounded-full p-1.5',
          className,
          rotate && 'rotate-90'
        )}
        variant={'light'}
        aria-label={label}
        {...floatingTooltip}
      >
        <Icon />
      </Button>
    </Link>
  );
}
