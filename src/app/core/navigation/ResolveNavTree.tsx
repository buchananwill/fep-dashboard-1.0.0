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
  if (currentNode.type === 'leaf') {
    const LeafNode = currentNode.component;
    return (
      <>
        <NavigationBreadcrumbs pathVariables={pathVariables} depth={depth} />
        <LeafNode pathVariables={pathVariables} depth={depth} />
      </>
    );
  } else if (currentNode.type === 'branch') {
    if (pathVariables.length > depth) {
      const rootKey = getMatchString(pathVariables, depth);
      const nextTree = currentNode.children;
      const nextMatch =
        nextTree[rootKey as keyof Omit<typeof nextTree, 'component' | 'type'>];
      if (nextMatch) {
        return (
          <ResolveNavTree
            currentNode={nextMatch}
            pathVariables={pathVariables}
            depth={depth + 1}
            rootNode={rootNode}
          />
        );
      }
    }
    const Component = currentNode.component;
    if (!Component) {
      if (pathVariables.length === 0) {
        console.error('no path variables');
        notFound();
      } else {
        const fewerVariables = [...pathVariables];
        fewerVariables.pop();
        return (
          <ResolveNavTree
            currentNode={rootNode}
            rootNode={rootNode}
            pathVariables={fewerVariables}
            depth={depth - 1}
          />
        );
      }
    }

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
    const nextTreeNode = currentNode[rootKey];
    if (!nextTreeNode) notFound();
    return (
      <ResolveNavTree
        currentNode={nextTreeNode}
        pathVariables={pathVariables}
        depth={depth + 1}
        rootNode={rootNode}
      />
    );
  }
}

export function getMatchString(pathVariables: string[], depth: number) {
  return camelCase(pathVariables[depth]);
}
