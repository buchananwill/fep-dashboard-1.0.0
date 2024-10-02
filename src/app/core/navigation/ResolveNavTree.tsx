import { notFound } from 'next/navigation';
import React from 'react';
import { camelCase } from 'lodash';
import { NavTreeBranch } from '@/app/core/navigation/types';
import NavigationBreadcrumbs from '@/components/navigation/NavigationBreadcrumbs';

export function ResolveNavTree({
  currentNode,
  depth,
  pathVariables = [],
  rootNode
}: {
  currentNode: NavTreeBranch;
  rootNode: NavTreeBranch;
  pathVariables: string[];
  depth: number;
}) {
  const { component: Component, children } = currentNode;
  const rootKey = pathVariables[depth]
    ? camelCase(pathVariables[depth])
    : undefined;
  // Case 1: Recurse deeper if there are more path variables and children exist
  if (rootKey && children && children[rootKey]) {
    return (
      <ResolveNavTree
        currentNode={children[rootKey]}
        pathVariables={pathVariables}
        depth={depth + 1}
        rootNode={rootNode}
      />
    );
  }
  // Case 2: Render component if present, else backtrack or not found
  if (Component) {
    return (
      <>
        {' '}
        <NavigationBreadcrumbs
          pathVariables={pathVariables}
          depth={depth}
        />{' '}
        <Component pathVariables={pathVariables} depth={depth} />{' '}
      </>
    );
  }
  // Case 3: Backtrack to previous level or trigger notFound
  if (depth > 0) {
    return (
      <ResolveNavTree
        currentNode={rootNode}
        pathVariables={pathVariables.slice(0, -1)}
        depth={depth - 1}
        rootNode={rootNode}
      />
    );
  }
  notFound(); // Handle unresolved paths
}

export function getMatchString(pathVariables: string[], depth: number) {
  return camelCase(pathVariables[depth]);
}
