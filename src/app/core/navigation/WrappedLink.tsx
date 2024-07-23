import { PropsWithChildren } from 'react';
import { NavTreeLinkWrapper } from '@/app/core/navigation/NavTreeLinkWrapper';
import { LinkButtonThatJoinsList } from '@/app/core/navigation/LinkButtonThatJoinsList';
import { LinkTreeElementProps } from '@/app/core/navigation/types';

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
