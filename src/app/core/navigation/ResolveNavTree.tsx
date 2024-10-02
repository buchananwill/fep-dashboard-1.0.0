import { notFound } from 'next/navigation';
import React from 'react';
import { camelCase } from 'lodash';
import { NavTreeNode } from '@/app/core/navigation/types';
import NavigationBreadcrumbs from '@/components/navigation/NavigationBreadcrumbs';

export function ResolveNavTree({
  currentNode,
  depth,
  pathVariables = [],
  rootNode
}: {
  currentNode: NavTreeNode;
  rootNode: NavTreeNode;
  pathVariables: string[];
  depth: number;
}) {
  const { component: Component, children } = currentNode;
  const rootKey = pathVariables[depth]
    ? camelCase(pathVariables[depth])
    : undefined;
  // Case 1: Recurse deeper if there are more path variables, AND we can assign one directly to a child
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
  // Case 2: Render the Component at this node if present, passing the list of variables to the Component.
  if (Component) {
    return (
      <>
        <NavigationBreadcrumbs pathVariables={pathVariables} depth={depth} />
        <Component pathVariables={pathVariables} depth={depth} />
      </>
    );
  }
  // Case 3: Remove the last variable and start over.
  if (pathVariables.length > 0) {
    const slicedPathVariable = pathVariables.slice(0, -1);
    return (
      <ResolveNavTree
        currentNode={rootNode}
        pathVariables={slicedPathVariable}
        depth={0}
        rootNode={rootNode}
      />
    );
  }
  notFound(); // Handle unresolved paths
}
