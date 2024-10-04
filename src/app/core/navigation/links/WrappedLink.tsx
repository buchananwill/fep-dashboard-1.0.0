import { PropsWithChildren } from 'react';
import { NavTreeLinkWrapper } from '@/app/core/navigation/links/NavTreeLinkWrapper';
import { LinkButtonThatJoinsList } from '@/app/core/navigation/links/LinkButtonThatJoinsList';
import { LinkTreeElementProps } from '@/app/core/navigation/links/types';

export function WrappedLink({
  link,
  displayLabel,
  children
}: PropsWithChildren & { link: string[] } & LinkTreeElementProps) {
  return (
    <NavTreeLinkWrapper
      label={
        <LinkButtonThatJoinsList link={link} displayLabel={displayLabel} />
      }
    >
      {children}
    </NavTreeLinkWrapper>
  );
}
