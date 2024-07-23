import { notFound } from 'next/navigation';
import React from 'react';
import { camelCase } from 'lodash';
import { NavTreeNodes } from '@/app/core/navTree';

export function ResolveNavTree({
  navTree,
  depth,
  pathVariables
}: {
  navTree: NavTreeNodes;
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
      const nextMatch =
        nextTree[rootKey as keyof Omit<typeof nextTree, 'component' | 'type'>];
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
