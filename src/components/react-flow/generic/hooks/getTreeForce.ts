import { InitialMap } from 'dto-stores';
import { DataLink, DataNode, HasStringId } from 'react-d3-force-wrapper';
import { FlowNode } from '@/components/react-flow/generic/types';
import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';
import { getHierarchyLayoutResolver } from '@/components/react-flow/generic/hooks/getTreeHierarchyLayoutResolver';
import {
  createIdToChildIdMap,
  createNestedWithStringId,
  getIdToNestedNodeMapList,
  NestedWithStringId
} from '@/components/react-flow/generic/hooks/hierarchy-transforms';
import { HierarchicalDataOptions } from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';
import { HierarchyPointNode } from 'd3';

export const refInitial = {
  current: InitialMap as Map<string, Layoutable>
};
export type HasPosition = {
  x: number;
  y: number;
};
export type Layoutable = HasPosition & HasStringId;
export const treeForce = getTreeForce();

function addNodesWithNoEdges(
  nodesReference: DataNode<NodeDataType>[],
  idToChildIdMap: Map<string, Set<string>>
) {
  nodesReference.forEach((n) => {
    const inMap =
      idToChildIdMap.has(n.id) ||
      idToChildIdMap.values().some((set) => set.has(n.id));
    if (!inMap) {
      idToChildIdMap.set(n.id, new Set());
    }
  });
}

export function getTreeForce() {
  let optionsCache = {} as HierarchicalDataOptions;
  let strength: number = 0.01;
  let nodesReference = [] as DataNode<NodeDataType>[];
  let linksReference = [] as DataLink<NodeDataType>[];
  let layoutRef: Map<string, HierarchyPointNode<NestedWithStringId>>[] = [];
  let nodeIndexToLayoutMapIndexArray = [] as number[];
  let depthOffsetList = [] as number[];

  let xResolver = getHierarchyLayoutResolver(
    layoutRef,
    nodeIndexToLayoutMapIndexArray,
    'x',
    depthOffsetList
  );
  let yResolver = getHierarchyLayoutResolver(
    layoutRef,
    nodeIndexToLayoutMapIndexArray,
    'y',
    depthOffsetList
  );

  function setResolvers() {
    xResolver = getHierarchyLayoutResolver(
      layoutRef,
      nodeIndexToLayoutMapIndexArray,
      'x',
      depthOffsetList
    );
    yResolver = getHierarchyLayoutResolver(
      layoutRef,
      nodeIndexToLayoutMapIndexArray,
      'y',
      depthOffsetList
    );
  }

  function createNodeToLayoutIndex() {
    const numLeavesMap = new Map<number, number>();
    nodeIndexToLayoutMapIndexArray = [];
    let found = false;
    for (let i = 0; i < nodesReference.length; i++) {
      const id = nodesReference[i].id;
      found = false;
      for (let j = 0; j < layoutRef.length; j++) {
        if (layoutRef[j].has(id)) {
          nodeIndexToLayoutMapIndexArray.push(j);
          const leaves = layoutRef[j].get(id)?.leaves().length || 1;
          numLeavesMap.set(j, Math.max(numLeavesMap.get(j) || 0, leaves + 2));
          found = true;
          break;
        }
      }
      if (!found) {
        nodeIndexToLayoutMapIndexArray.push(-1);
      }
      found = false;
    }

    depthOffsetList = [];
    const cumulativeOffsetList = [];

    for (let i = 0; i < layoutRef.length; i++) {
      const nodeSize = optionsCache?.nodeSize;
      let width = nodeSize ? nodeSize[0] : 0;
      const totalWidth = ((numLeavesMap.get(i) || 1) + 1) * width;
      depthOffsetList.push(totalWidth);
    }
    for (let i = 0; i <= depthOffsetList.length; i++) {
      const cumulativeOffset = depthOffsetList
        .slice(0, i)
        .reduce((prev, curr, index) => prev + curr, 0);
      cumulativeOffsetList.push(cumulativeOffset);
    }

    depthOffsetList = cumulativeOffsetList;
    console.log(depthOffsetList);
  }

  function buildLayoutRef(options?: HierarchicalDataOptions) {
    optionsCache = options ? options : optionsCache;
    const idToChildIdMap = createIdToChildIdMap(linksReference);

    addNodesWithNoEdges(nodesReference, idToChildIdMap);
    const nestedWithStringId = createNestedWithStringId(idToChildIdMap);
    layoutRef = getIdToNestedNodeMapList(nestedWithStringId, options);
    createNodeToLayoutIndex();
    setResolvers();
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
    console.log({ links });
    if (links === undefined) {
      return linksReference;
    } else {
      if (links !== linksReference || links.length !== linksReference.length) {
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
