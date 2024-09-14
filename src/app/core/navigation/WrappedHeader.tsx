import { PropsWithChildren } from 'react';
import { NavTreeLinkWrapper } from '@/app/core/navigation/NavTreeLinkWrapper';
import { NoLinkHeader } from '@/components/LinkButton';
import { LinkTreeElementProps } from '@/app/core/navigation/types';

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
