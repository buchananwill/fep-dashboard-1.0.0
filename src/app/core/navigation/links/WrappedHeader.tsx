import { PropsWithChildren } from 'react';
import { NavTreeLinkWrapper } from '@/app/core/navigation/links/NavTreeLinkWrapper';
import { NoLinkHeader } from '@/components/navigation/LinkButton';
import { LinkTreeElementProps } from '@/app/core/navigation/links/types';

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
