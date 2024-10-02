import { PropsWithChildren, ReactElement, ReactNode } from 'react';

export interface LeafComponentProps {
  pathVariables: string[];
  depth: number;
}

export type LeafComponent = (props: LeafComponentProps) => ReactNode;

export interface NavTreeChildren {
  [key: string]: NavTreeBranch;
}

export type NavTreeBranch = {
  children?: NavTreeChildren;
  component?: LeafComponent;
};

export type NavTreeTypes = NavTreeBranch | NavTreeChildren;

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
