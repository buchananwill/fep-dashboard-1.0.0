import { useNodesInitialized, useReactFlow } from '@xyflow/react';
import { MutableRefObject, useMemo, useRef } from 'react';
import { forceX, forceY, HierarchyPointNode, Simulation } from 'd3';

import { useGlobalController, useGlobalListener } from 'selective-context';

import { FlowNode } from '@/components/react-flow/generic/types';
import {
  GraphSelectiveContextKeys,
  HasStringId,
  useD3ForceSimulationMemo,
  useDirectSimRefEditsDispatch,
  useGraphDispatch
} from 'react-d3-force-wrapper';
import { InitialSetRef } from '@/components/react-flow/bi-partite-graph/BandwidthLayoutFlowWithForces';
import { collide } from '@/components/react-flow/generic/utils/collide';
import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';
import { get } from 'lodash';
import { InitialMap } from 'dto-stores';

export const draggingNodeKey = 'dragging-node';

const listenerKey = 'use-layouted-elements';

const forceSimParams = { forceFunctions: { collide: collide } };

const refInitial = {
  current: InitialMap as Map<string, Layoutable>
};

export type HasPosition = {
  x: number;
  y: number;
};

export type Layoutable = HasPosition & HasStringId;

function getHierarchyLayoutResolver<T extends NodeDataType>(
  layoutMap: MutableRefObject<Map<string, Layoutable>>,
  dimension: keyof Pick<HierarchyPointNode<any>, 'x' | 'y'>
) {
  return (node: FlowNode<T>, index: number) => {
    const hasPosition = layoutMap.current.get(node.id);
    return hasPosition ? get(hasPosition, dimension, 0) : 0;
  };
}

export const hierarchicalLayoutMap = 'hierarchicalLayoutMap';

export function useForces(
  applyFitView?: boolean
): [boolean, (() => void) | undefined, (() => boolean) | undefined] {
  const { getNodes, setNodes, fitView } = useReactFlow();
  const { dispatchWithoutListen } = useGraphDispatch<boolean>(
    GraphSelectiveContextKeys.running
  );
  const initialised = useNodesInitialized(); // useStore((store) => [...store.nodeLookup.values()].every((node) => node.width && node.height));
  const { currentState: selectionRef } = useGlobalListener({
    contextKey: 'selectedNodeIdSet',
    initialValue: InitialSetRef as MutableRefObject<Set<string>>,
    listenerKey
  });

  const { currentState } = useGlobalListener({
    contextKey: hierarchicalLayoutMap,
    initialValue: refInitial,
    listenerKey
  });

  const localRef = useRef(InitialMap as Map<string, Layoutable>);
  localRef.current = currentState.current;

  const overrideForces = useMemo(() => {
    const xResolver = getHierarchyLayoutResolver(localRef, 'y');
    const yResolver = getHierarchyLayoutResolver(localRef, 'x');
    const forceXCreated = forceX(xResolver);
    const forceYCreated = forceY(yResolver);
    return {
      forceFunctions: {
        collide,
        forceX: forceXCreated,
        forceY: forceYCreated
      }
    };
  }, []);

  useD3ForceSimulationMemo(overrideForces);
  const { currentState: draggingNode } = useGlobalController<
    MutableRefObject<FlowNode<any>> | undefined
  >({
    contextKey: draggingNodeKey,
    listenerKey: 'controller',
    initialValue: undefined
  });
  const { nodeListRef, linkListRef, simRef } =
    useDirectSimRefEditsDispatch(listenerKey);

  return useMemo(() => {
    let nodes = getNodes().map((node) => ({
      ...node,
      x: node.position.x || 0,
      y: node.position.y || 0
    })) as FlowNode<any>[];
    let running = false;
    let simulation: Simulation<any, any>;

    // If React Flow hasn't initialised our nodes with a width and height yet, or
    // if there are no nodes in the flow, then we can't run the simulation!
    if (
      !initialised ||
      nodes.length === 0 ||
      !nodeListRef ||
      !linkListRef ||
      !simRef ||
      nodeListRef.current.length !== nodes.length // These arrays should match, because the top-level context should sync them.
    ) {
      return [false, undefined, undefined];
    }

    // Copy any internals to the nodeListRef so we don't lose those properties.
    for (let i = 0; i < nodes.length; i++) {
      Object.assign(nodeListRef.current[i], nodes[i]);
    }
    simRef.current.stop();

    // The tick function is called every animation frame while the simulation is
    // running and progresses the simulation one step forward each time.
    const tick = async () => {
      let nodeIndex = NaN;
      simulation = simRef.current;
      const scopedNodes = nodeListRef.current;

      let foundDrag = false;
      for (let i = 0; i < scopedNodes.length; i++) {
        const node = scopedNodes[i];

        const dragging = draggingNode?.current?.id === node?.id;
        // Setting the fx/fy properties of a node tells the simulation to "fix"
        // the node at that position and ignore any forces that would normally
        // cause it to move.
        if (dragging) {
          foundDrag = true;
          nodeIndex = i;
          // Copy the current position from the ref
          node.fx = draggingNode?.current.position.x;
          node.fy = draggingNode?.current.position.y;
        } else if (node) {
          delete node.fx;
          delete node.fy;
        }
      }

      simulation.tick();

      setNodes(
        scopedNodes.map(
          (node) =>
            ({
              ...node,
              position: {
                x: node.fx || node.x || 0,
                y: node.fy || node.y || 0
              },
              selected: selectionRef.current.has(node.id)
            }) as FlowNode<any>
        )
      );

      window.requestAnimationFrame(async () => {
        // Give React and React Flow a chance to update and render the new node
        // positions before we fit the viewport to the new layout.
        if (applyFitView) fitView();

        // If the simulation hasn't been stopped, schedule another tick.
        if (running) await tick();
      });
    };

    const toggle = () => {
      const scopedNodes = nodeListRef.current;
      running = !running;
      if (running) {
        getNodes().forEach((node, index) => {
          const scopedNode = scopedNodes[index];
          scopedNode.x = node.position.x || 0;
          scopedNode.y = node.position.y || 0;
        });
        window.requestAnimationFrame(tick);
      }
      dispatchWithoutListen(running);
    };

    const isRunning = () => running;

    return [true, toggle, isRunning];
  }, [
    selectionRef,
    applyFitView,
    draggingNode,
    simRef,
    initialised,
    fitView,
    getNodes,
    setNodes,
    linkListRef,
    nodeListRef,
    dispatchWithoutListen
  ]);
}
