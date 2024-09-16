import { WorkNodeHierarchy } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { HasId } from '@/api/types';

export function normalizePaths(
  node: WorkNodeHierarchy,
  parent?: WorkNodeHierarchy
) {
  if (parent?.type === 'leaf') throw Error('leaf cannot be parent');
  switch (node.type) {
    case 'leaf': {
      if (parent) node.path = makeChildPathWithChild(parent, node);
      break;
    }
    case 'leafList': {
      if (node.children.length > 0) {
        const size = node.children[0].size;
        node.path = parent ? `${parent.path}:${size}` : String(size);
        node.children.forEach((child) => normalizePaths(child, node));
      } else if (parent) {
        node.path = makeChildPathWithChild(parent, node);
      }
      break;
    }
    default: {
      if (parent) node.path = makeChildPathWithChild(parent, node);
      node.children.forEach((child) => normalizePaths(child, node));
    }
  }
}

type HasChildren = { children: any[] };

function findIndexOfChild<T>(parent: HasChildren, child: T) {
  return parent.children.indexOf(child);
}

function makeChildPathWithChild<T>(
  parent: HasChildren & { path: string },
  child: T
) {
  return `${parent.path}:${findIndexOfChild(parent, child)}`;
}
