'use client';
import { PropsWithChildren, useTransition } from 'react';
import clsx from 'clsx';
import {
  NavigationType,
  iconDefinitions
} from '@/components/navigation/iconDefinitions';
import { startCase } from 'lodash';
import { usePopoverSingleton } from '@/components/tooltip/usePopoverSingleton';
import { TooltipMemo } from '@/components/tooltip/SimpleTooltip';
import { mainNavLinkList } from '@/components/navigation/navLinks';
import Link, { LinkProps } from 'next/link';
import { getDomainAlias } from '@/api/getDomainAlias';
import { useRouter } from 'next/navigation';
import { PendingOverlay } from '@/components/overlays/pending-overlay';

export default function NavLinkButton({
  className,
  navigationType
}: { navigationType: NavigationType; className?: string } & PropsWithChildren &
  Omit<LinkProps, 'href'>) {
  const Icon = iconDefinitions[navigationType];
  const label = startCase(getDomainAlias(navigationType));
  const [isPending, startTransition] = useTransition();
  const appRouterInstance = useRouter();

  const floatingTooltip = usePopoverSingleton(<TooltipMemo text={label} />);

  return (
    <Link
      href={mainNavLinkList[navigationType]}
      onClick={(event) => {
        event.preventDefault();
        startTransition(() =>
          appRouterInstance.push(mainNavLinkList[navigationType])
        );
      }}
      className={clsx(
        'duration-250 transition-colors-opacity h-12 w-12 rounded-full bg-transparent p-1.5 outline-offset-2 outline-blue-400 hover:bg-blue-100',
        className
      )}
      aria-label={label}
      {...floatingTooltip}
    >
      <PendingOverlay pending={isPending} />
      <Icon />
    </Link>
  );
}
