import { notFound } from 'next/navigation';
import React from 'react';
import { camelCase } from 'lodash';
import { NavTreeNode } from '@/app/core/navigation/types';
import NavigationBreadcrumbs from '@/components/navigation/NavigationBreadcrumbs';

export function ResolveNavTree({
  navTree,
  depth,
  pathVariables = []
}: {
  navTree: NavTreeNode;
  pathVariables: string[];
  depth: number;
}) {
  if (navTree.type === 'leaf') {
    const LeafNode = navTree.component;
    return (
      <>
        <NavigationBreadcrumbs pathVariables={pathVariables} depth={depth} />
        <LeafNode pathVariables={pathVariables} depth={depth} />
      </>
    );
  } else if (navTree.type === 'branch') {
    if (pathVariables.length > depth) {
      const rootKey = getMatchString(pathVariables, depth);
      const nextTree = navTree.children;
      const nextMatch =
        nextTree[rootKey as keyof Omit<typeof nextTree, 'component' | 'type'>];
      if (nextMatch) {
        return (
          <ResolveNavTree
            navTree={nextMatch}
            pathVariables={pathVariables}
            depth={depth + 1}
          />
        );
      }
    }
    const Component = navTree.component;
    if (!Component) notFound();
    return (
      <>
        <NavigationBreadcrumbs pathVariables={pathVariables} depth={depth} />
        <Component pathVariables={pathVariables} depth={depth} />
      </>
    );
  } else {
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
