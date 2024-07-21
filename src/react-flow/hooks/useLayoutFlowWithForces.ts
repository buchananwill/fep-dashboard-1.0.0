'use client';
import {
  Connection,
  Node,
  useEdgesState,
  useNodesState,
  useUpdateNodeInternals
} from '@xyflow/react';
import { draggingNodeKey, useForces } from '@/react-flow/hooks/useForces';
import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef
} from 'react';
import { useGlobalDispatch } from 'selective-context';
import { FlowEdge, FlowNode } from '@/react-flow/types';
import {
  GraphSelectiveContextKeys,
  MemoizedFunction,
  undefinedDeleteLinks,
  useGraphListener,
  useLinkContext,
  useNodeContext
} from 'react-d3-force-wrapper';
import { NodeDataType } from '@/react-flow/utils/adaptors';

const listenerKey = 'layout-flow-with-forces';

export function useLayoutFlowWithForces<T extends NodeDataType>() {
  const { nodes: nodesFromContext, dispatch: dispatchNodes } =
    useNodeContext<T>();
  const { links: edgesFromContext, dispatch: dispatchEdges } =
    useLinkContext<T>();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    nodesFromContext as FlowNode<T>[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    edgesFromContext as FlowEdge<T>[]
  );
  const [initialized, toggle] = useForces();
  const updateNodeInternals = useUpdateNodeInternals();

  const { currentState: running } = useGraphListener(
    GraphSelectiveContextKeys.running,
    listenerKey,
    false
  );

  const draggingNodeRef = useRef<Node | undefined>(undefined);
  const { dispatchWithoutListen } = useGlobalDispatch(draggingNodeKey);
  const {
    currentState: { memoizedFunction }
  } = useGraphListener<MemoizedFunction<string[], void>>(
    GraphSelectiveContextKeys.addLinks,
    listenerKey,
    undefinedDeleteLinks
  );

  const onConnect = useCallback(
    ({ source, target }: Connection) => {
      if (source && target) memoizedFunction([source, target]);
    },
    [memoizedFunction]
  );

  useEffect(() => {
    dispatchWithoutListen(draggingNodeRef);
  }, [draggingNodeRef, dispatchWithoutListen]);

  const onNodeDragStart = useCallback(
    (_event: ReactMouseEvent, node: Node) => {
      draggingNodeRef.current = { ...node };
    },
    [draggingNodeRef]
  );

  const onNodeDragStop = useCallback(() => {
    draggingNodeRef.current = undefined;
  }, [draggingNodeRef]);

  const onNodeDrag = useCallback(
    (_event: ReactMouseEvent, node: Node) => {
      draggingNodeRef.current = { ...node };
    },
    [draggingNodeRef]
  );

  useEffect(() => {
    console.log(
      'firing graph syncing hook',
      nodesFromContext,
      edgesFromContext
    );

    updateNodeInternals(nodesFromContext.map((n) => n.id));
    setNodes(nodesFromContext as FlowNode<T>[]);
    setEdges(edgesFromContext as FlowEdge<T>[]);
  }, [
    nodesFromContext,
    edgesFromContext,
    setEdges,
    setNodes,
    updateNodeInternals
  ]);

  return {
    reactFlowProps: {
      nodes,
      onNodesChange,
      edges,
      onEdgesChange,
      onConnect,
      onNodeDragStart,
      onNodeDragStop,
      onNodeDrag
    },
    flowOverlayProps: {
      initialized,
      toggle,
      running
    },
    contextData: {
      nodesFromContext,
      edgesFromContext
    },
    dispatchNodes,
    dispatchEdges
  };
}
