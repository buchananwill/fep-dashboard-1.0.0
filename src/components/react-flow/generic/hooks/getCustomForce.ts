import { InitialMap } from 'dto-stores';
import { DataLink, DataNode, HasStringId } from 'react-d3-force-wrapper';
import { FlowEdge, FlowNode } from '@/components/react-flow/generic/types';
import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';
import { getHierarchyLayoutResolver } from '@/components/react-flow/generic/hooks/getTreeHierarchyLayoutResolver';
import {
  createIdToChildIdMap,
  createNestedWithStringId,
  getIdToNestedNodeMapList
} from '@/components/react-flow/generic/hooks/hierarchy-transforms';
import { HasNumberId } from '@/api/types';
import { HierarchicalDataOptions } from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';

export const refInitial = {
  current: InitialMap as Map<string, Layoutable>
};
export type HasPosition = {
  x: number;
  y: number;
};
export type Layoutable = HasPosition & HasStringId;
export const customForce = getCustomForce();

export function getCustomForce() {
  let strength: number = 0.01;
  let nodesReference = [] as DataNode<NodeDataType>[];
  let linksReference = [] as DataLink<NodeDataType>[];
  let layoutRef: Map<string, Layoutable> = new Map<string, Layoutable>();

  let xResolver = getHierarchyLayoutResolver({ current: layoutRef }, 'y');
  let yResolver = getHierarchyLayoutResolver({ current: layoutRef }, 'x');

  function buildLayoutRef(options?: HierarchicalDataOptions) {
    const idToChildIdMap = createIdToChildIdMap(linksReference);
    const nestedWithStringId = createNestedWithStringId(idToChildIdMap);
    const idToNestedNodeMapList = getIdToNestedNodeMapList(
      nestedWithStringId,
      options
    ) as Map<string, Layoutable>[];
    layoutRef =
      idToNestedNodeMapList.length > 0 ? idToNestedNodeMapList[0] : layoutRef;
    xResolver = getHierarchyLayoutResolver({ current: layoutRef }, 'y');
    yResolver = getHierarchyLayoutResolver({ current: layoutRef }, 'x');
  }

  function force(alpha: number) {
    for (
      let i = 0,
        n = nodesReference.length,
        node: DataNode<NodeDataType>,
        k = alpha * strength;
      i < n;
      ++i
    ) {
      node = nodesReference[i];
      const vxDelta = (xResolver(node, i) - (node.x || 0)) * k;
      const vyDelta = (yResolver(node, i) - (node.y || 0)) * k;
      node.vx =
        node.vx === undefined || isNaN(node.vx) ? vxDelta : node.vx + vxDelta;
      node.vy =
        node.vy === undefined || isNaN(node.vy) ? vyDelta : node.vy + vyDelta;
    }
  }

  force.links = (links?: DataLink<any>[]) => {
    if (links === undefined) {
      return linksReference;
    } else {
      if (links !== linksReference) {
        linksReference = links;
        buildLayoutRef();
      }
    }
  };

  force.updateLayout = (options: HierarchicalDataOptions) => {
    buildLayoutRef(options);
  };

  force.initialize = (
    nodes: FlowNode<NodeDataType>[],
    random: () => number
  ) => {
    nodesReference = nodes;
  };

  force.strength = (newStrength: number) => {
    strength = newStrength;
    return force;
  };

  return force;
}
