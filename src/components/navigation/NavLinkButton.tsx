'use client';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import {
  NavigationType,
  navLinkIcons
} from '@/components/navigation/navLinkIcons';
import { startCase } from 'lodash';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';
import { TooltipMemo } from '@/app/service-categories/[id]/roles/_components/SimpleTooltip';
import { mainNavLinkList } from '@/components/navigation/navLinks';
import Link, { LinkProps } from 'next/link';

export default function NavLinkButton({
  className,
  navigationType
}: { navigationType: NavigationType; className?: string } & PropsWithChildren &
  Omit<LinkProps, 'href'>) {
  const rotate = navigationType === 'workSchemaNodeAssignments';
  const Icon = navLinkIcons[navigationType];
  const label = startCase(navigationType);

  const floatingTooltip = useFloatingTooltip(<TooltipMemo text={label} />);

  return (
    <Link
      href={mainNavLinkList[navigationType]}
      className={clsx(
        'h-12 w-12 rounded-full bg-transparent p-1.5 outline-offset-2 outline-primary-400 duration-250 transition-colors-opacity hover:bg-primary-100',
        className,
        rotate && 'rotate-90'
      )}
      aria-label={label}
      {...floatingTooltip}
    >
      <Icon />
    </Link>
  );
}
