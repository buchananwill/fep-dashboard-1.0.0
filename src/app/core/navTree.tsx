import React, { ReactNode } from 'react';
import Home from '@/app/page';
import { notFound } from 'next/navigation';
import TestLeaf from '@/app/core/TestLeaf';

export interface LeafComponentProps {
  pathVariables: string[];
  depth: number;
}

export type LeafComponent = (props: LeafComponentProps) => ReactNode;

export interface NavTree {
  [key: string]: NavTreeBranch | NavTreeLeaf;
}

type NavTreeBranch = {
  type: 'branch';
  children: NavTree;
};

type NavTreeLeaf = {
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
  navTree: NavTree;
  pathVariables: string[];
  depth: number;
}) {
  console.log(navTree, depth, pathVariables);
  if (depth + 1 > pathVariables.length) notFound();
  const nextRootKey = pathVariables[depth];
  const navTreeElement = navTree[nextRootKey];
  if (!navTreeElement) notFound();
  if (navTreeElement.type === 'leaf') {
    const LeafNode = navTreeElement.component;
    return <LeafNode pathVariables={pathVariables} depth={depth} />;
  } else {
    const branchNode = navTreeElement.children;
    return (
      <ResolveNavTree
        depth={depth + 1}
        pathVariables={pathVariables}
        navTree={branchNode}
      />
    );
  }
}
