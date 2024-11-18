import { FlowEdge, FlowNode } from '@/components/react-flow/generic/types';
import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';
import { createIdToChildIdMap } from '@/components/react-flow/generic/hooks/hierarchy-transforms';
import { HierarchicalDataOptions } from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';
import dagre from '@dagrejs/dagre';
import { Layoutable } from '@/components/react-flow/generic/hooks/getTreeForce';
import { DataNode } from 'react-d3-force-wrapper';

export const dagreForce = getDagreForce();

function addNodesWithNoEdges(
  nodesReference: FlowNode<NodeDataType>[],
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

export function getDagreForce() {
  let optionsCache = {} as HierarchicalDataOptions;
  let strength: number = 0.01;
  let nodesReference = [] as FlowNode<NodeDataType>[];
  let linksReference = [] as FlowEdge<NodeDataType>[];
  const dagreLayout = new Map<string, Layoutable>();

  const xResolver = (n: DataNode<any>, index: number) =>
    dagreLayout.get(n.id)?.x || 0;
  const yResolver = (n: DataNode<any>, index: number) =>
    dagreLayout.get(n.id)?.y || 0;

  function buildLayoutRef(options?: HierarchicalDataOptions) {
    dagreLayout.clear();
    optionsCache = options ? options : optionsCache;
    const idToChildIdMap = createIdToChildIdMap(linksReference);
    addNodesWithNoEdges(nodesReference, idToChildIdMap);

    const g = new dagre.graphlib.Graph();
    g.setGraph({});
    g.setDefaultEdgeLabel(function () {
      return {};
    });

    nodesReference.forEach((n) => {
      g.setNode(n.id, {
        label: n.id,
        width: n.measured?.width,
        height: n.measured?.height
      });
    });

    linksReference.forEach((l) => {
      g.setEdge(l.source, l.target);
    });

    dagre.layout(g, {
      ranker: 'tight-tree'
      // 'network-simplex'
    });

    g.nodes().forEach((n) => dagreLayout.set(n, { ...g.node(n), id: n }));
  }

  function force(alpha: number) {
    for (
      let i = 0,
        n = nodesReference.length,
        node: FlowNode<NodeDataType>,
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

  force.links = (links?: FlowEdge<any>[]) => {
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
    random?: () => number
  ) => {
    nodesReference = nodes;
  };

  force.strength = (newStrength: number) => {
    strength = newStrength;
    return force;
  };

  return force;
}
