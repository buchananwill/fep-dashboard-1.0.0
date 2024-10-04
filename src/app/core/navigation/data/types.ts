import { RequireAtLeastOne } from 'type-fest';
import { ReactNode } from 'react';

export interface LeafComponentProps {
  pathVariables: string[];
  depth: number;
}

export type LeafComponent = (props: LeafComponentProps) => ReactNode;

export interface NavTreeChildren {
  [key: string]: NavTreeNode;
}

export type NavTreeNode = RequireAtLeastOne<{
  children?: NavTreeChildren;
  component?: LeafComponent;
}>;
export type NavTreeTypes = NavTreeNode | NavTreeChildren;