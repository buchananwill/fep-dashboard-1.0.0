import { useNodesInitialized, useReactFlow } from '@xyflow/react';
import { MutableRefObject, useCallback, useMemo, useRef } from 'react';

import { useGlobalController, useGlobalListener } from 'selective-context';

import { FlowNode } from '@/components/react-flow/generic/types';
import {
  DirectSimRefEditsDispatchReturn,
  GraphSelectiveContextKeys,
  useD3ForceSimulationMemo,
  useDirectSimRefEditsDispatch,
  useGraphController
} from 'react-d3-force-wrapper';
import { collide } from '@/components/react-flow/generic/utils/collide';
import { InitialMap } from 'dto-stores';
import { hierarchicalLayoutMap } from '@/components/react-flow/generic/hooks/useHierarchicalTreeLayout';
import { getTickFunction } from '@/components/react-flow/generic/hooks/getTickFunction';
import { HasNumberId } from '@/api/types';
import {
  customForce,
  getCustomForce,
  Layoutable,
  refInitial
} from '@/components/react-flow/generic/hooks/getCustomForce';
import { HierarchicalDataOptions } from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';

export const draggingNodeKey = 'dragging-node';

const listenerKey = 'use-layouted-elements';

const options: HierarchicalDataOptions = {
  nodeSize: [60, 400],
  orientation: 'horizontal'
};

export function useForces(
  applyFitView?: boolean
): [
  boolean,
  (() => void) | undefined,
  undefined | DirectSimRefEditsDispatchReturn<HasNumberId>['nodeListRef']
] {
  const { getNodes, setNodes, fitView } = useReactFlow();
  const { currentState: running, dispatch } = useGraphController<boolean>(
    GraphSelectiveContextKeys.running,
    false
  );
  const runningRef = useRef(running);
  runningRef.current = running;
  const isRunning = useCallback(() => {
    return runningRef.current;
  }, []);
  const initialised = useNodesInitialized();

  const { currentState } = useGlobalListener({
    contextKey: hierarchicalLayoutMap,
    initialValue: refInitial,
    listenerKey
  });

  const localRef = useRef(InitialMap as Map<string, Layoutable>);
  localRef.current = currentState.current;

  const overrideForces = useMemo(() => {
    // const customForce = getCustomForce(localRef);

    return {
      forceFunctions: {
        collide,
        custom: customForce
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

  const tickFunction = useMemo(() => {
    let nodes = getNodes().map((node) => ({
      ...node,
      x: node.position?.x || 0,
      y: node.position?.y || 0
    })) as FlowNode<any>[];

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
      return undefined;
    }

    simRef.current.stop();
    // Copy any internals to the nodeListRef so we don't lose those properties.
    for (let i = 0; i < nodes.length; i++) {
      Object.assign(nodeListRef.current[i], nodes[i]);
    }
    customForce.links(linkListRef.current);
    customForce.updateLayout(options);

    return getTickFunction(
      isRunning,
      simRef,
      nodeListRef,
      draggingNode,
      setNodes,
      applyFitView,
      fitView
    );
  }, [
    getNodes,
    initialised,
    nodeListRef,
    linkListRef,
    simRef,
    isRunning,
    draggingNode,
    setNodes,
    applyFitView,
    fitView
  ]);

  const toggle = useCallback(() => {
    if (nodeListRef === null || tickFunction === undefined) return;
    const scopedNodes = nodeListRef.current;
    const aboutToRun = !isRunning();
    dispatch(aboutToRun);

    if (aboutToRun) {
      getNodes().forEach((node, index) => {
        const scopedNode = scopedNodes[index];
        scopedNode.x = node.position.x || 0;
        scopedNode.y = node.position.y || 0;
      });
      window.requestAnimationFrame(tickFunction);
    }
  }, [dispatch, getNodes, isRunning, nodeListRef, tickFunction]);
  return [tickFunction !== undefined, toggle, nodeListRef];
}
