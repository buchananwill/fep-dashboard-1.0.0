import { PropsWithChildren, ReactElement, ReactNode } from 'react';

export interface LeafComponentProps {
  pathVariables: string[];
  depth: number;
}

export type LeafComponent = (props: LeafComponentProps) => ReactNode;

export interface NavTree {
  [key: string]: NavTreeBranch | NavTreeLeaf;
}

export type NavTreeBranch = {
  type: 'branch';
  children: NavTree;
  component?: LeafComponent;
};

export type NavTreeLeaf = {
  type: 'leaf';
  component: LeafComponent;
};

export type NavTreeNode = NavTreeBranch | NavTreeLeaf | NavTree;

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
