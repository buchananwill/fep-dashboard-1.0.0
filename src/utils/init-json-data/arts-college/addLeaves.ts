import { WorkNodeHierarchy } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

import {
  addLeafToThisList,
  findOrCreateList
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/knowledgeLevelGroupFunctions';

export function addLeaves(node: WorkNodeHierarchy, size: number) {
  switch (node.type) {
    case 'leaf': {
      break;
    }
    case 'knowledgeDomainGroup': {
      const listNode = findOrCreateList(node, size);
      addLeafToThisList(listNode, size);
      break;
    }
    default: {
      node.children.forEach((child) => addLeaves(child, size));
      break;
    }
  }
}
