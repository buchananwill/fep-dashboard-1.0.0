import { PropsWithChildren, ReactElement, ReactNode } from 'react';

export interface NavLinkTree {
  displayName: string;
  link: string[];
  disableLinkThisLevel?: boolean;
  indexList: number[];
  children: NavLinkTree[];
}

export interface LinkTreeElementProps {
  displayLabel: string | ReactElement;
}

export type HeaderWithoutLink = (
  props: PropsWithChildren & LinkTreeElementProps
) => ReactNode;
export type LinkWithChildLinks = (
  props: PropsWithChildren & { link: string[] } & LinkTreeElementProps
) => ReactNode;
