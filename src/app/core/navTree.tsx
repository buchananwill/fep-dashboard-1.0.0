import React, { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import TestLeaf from '@/app/core/TestLeaf';
import { camelCase } from 'lodash';

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
  children: NavTree | NavTreeLeaf | NavTreeBranch;
  component?: LeafComponent;
};

export type NavTreeLeaf = {
  type: 'leaf';
  component: LeafComponent;
};

export const homePage: NavTree = {
  testLeaf: { type: 'leaf', component: TestLeaf }
};

export function ResolveNavTree({
  navTree,
  depth,
  pathVariables
}: {
  navTree: NavTreeBranch | NavTreeLeaf | NavTree;
  pathVariables: string[];
  depth: number;
}) {
  if (navTree.type === 'leaf') {
    console.log('leaf', depth, pathVariables);
    const LeafNode = navTree.component;
    return <LeafNode pathVariables={pathVariables} depth={depth} />;
  } else if (navTree.type === 'branch') {
    console.log('branch');
    if (pathVariables.length > depth) {
      const rootKey = getMatchString(pathVariables, depth);
      // const nextVariable = pathVariables[depth + 1];
      const nextTree = navTree.children;
      const nextMatch = nextTree[rootKey];
      if (nextMatch) {
        console.log('next match found');
        return (
          <ResolveNavTree
            navTree={nextMatch}
            pathVariables={pathVariables}
            depth={depth + 1}
          />
        );
      }
    }
    console.log('branch component fallback');
    const Component = navTree.component;
    if (!Component) notFound();
    return <Component pathVariables={pathVariables} depth={depth} />;
  } else {
    console.log('tree');
    if (pathVariables.length <= depth) {
      console.error('No path variable for this depth');
      notFound();
    }
    const rootKey = getMatchString(pathVariables, depth);
    const nextTreeNode = navTree[rootKey];
    if (!nextTreeNode) notFound();
    return (
      <ResolveNavTree
        navTree={nextTreeNode}
        pathVariables={pathVariables}
        depth={depth + 1}
      />
    );
  }
}

export function getMatchString(pathVariables: string[], depth: number) {
  return camelCase(pathVariables[depth]);
}
