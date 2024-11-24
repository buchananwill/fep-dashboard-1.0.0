import { PropsWithChildren } from 'react';
import { NavTreeLinkWrapper } from '@/app/core/navigation/links/NavTreeLinkWrapper';
import { LinkTreeElementProps } from '@/app/core/navigation/links/types';
import { NoLinkHeader } from '@/components/navigation/NoLinkHeader';

export function WrappedHeader({
  children,
  displayLabel
}: PropsWithChildren & LinkTreeElementProps) {
  return (
    <NavTreeLinkWrapper label={<NoLinkHeader displayLabel={displayLabel} />}>
      {children}
    </NavTreeLinkWrapper>
  );
}
