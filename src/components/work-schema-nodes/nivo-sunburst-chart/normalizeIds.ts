import { WorkNodeHierarchy } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { HasId } from '@/api/types';

export function normalizeIds(
  node: WorkNodeHierarchy,
  parent?: WorkNodeHierarchy
) {
  if (parent?.type === 'leaf') throw Error('leaf cannot be parent');
  switch (node.type) {
    case 'leaf': {
      if (parent) node.id = makeChildIdWithChild(parent, node);
      break;
    }
    case 'leafList': {
      if (node.children.length > 0) {
        const size = node.children[0].size;
        node.id = parent ? `${parent.id}:${size}` : String(size);
        node.children.forEach((child) => normalizeIds(child, node));
      } else if (parent) {
        node.id = makeChildIdWithChild(parent, node);
      }
      break;
    }
    default: {
      if (parent) node.id = makeChildIdWithChild(parent, node);
      node.children.forEach((child) => normalizeIds(child, node));
    }
  }
}

type HasChildren = { children: any[] };

function findIndexOfChild<T>(parent: HasChildren, child: T) {
  return parent.children.indexOf(child);
}

function makeChildIdWithChild<T>(parent: HasChildren & HasId, child: T) {
  return `${parent.id}:${findIndexOfChild(parent, child)}`;
}
