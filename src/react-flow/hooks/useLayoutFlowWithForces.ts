"use client";
import { Connection, Node, useEdgesState, useNodesState } from "reactflow";
import { draggingNodeKey, useForces } from "@/react-flow/hooks/useForces";
import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useGlobalDispatch } from "selective-context";
import { FlowEdge, FlowNode } from "@/react-flow/types";
import {
  GraphSelectiveContextKeys,
  MemoizedFunction,
  undefinedDeleteLinks,
  useGraphListener,
  useLinkContext,
  useNodeContext,
} from "react-d3-force-graph";

const listenerKey = "layout-flow-with-forces";

export function useLayoutFlowWithForces() {
  const { nodes: initialNodes } = useNodeContext();
  const { links: initialEdges } = useLinkContext();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes as FlowNode[],
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdges as FlowEdge[],
  );
  const [initialized, toggle] = useForces();

  const { currentState: running } = useGraphListener(
    GraphSelectiveContextKeys.running,
    listenerKey,
    false,
  );

  const draggingNodeRef = useRef<Node | undefined>(undefined);
  const { dispatchWithoutListen } = useGlobalDispatch(draggingNodeKey);
  const {
    currentState: { memoizedFunction },
  } = useGraphListener<MemoizedFunction<string[], void>>(
    GraphSelectiveContextKeys.addLinks,
    listenerKey,
    undefinedDeleteLinks,
  );

  const onConnect = useCallback(
    ({ source, target }: Connection) => {
      if (source && target) memoizedFunction([source, target]);
    },
    [memoizedFunction],
  );

  useEffect(() => {
    dispatchWithoutListen(draggingNodeRef);
  }, [draggingNodeRef, dispatchWithoutListen]);

  const onNodeDragStart = useCallback(
    (_event: ReactMouseEvent, node: Node) => {
      draggingNodeRef.current = { ...node };
    },
    [draggingNodeRef],
  );

  const onNodeDragStop = useCallback(() => {
    draggingNodeRef.current = undefined;
  }, [draggingNodeRef]);

  const onNodeDrag = useCallback(
    (_event: ReactMouseEvent, node: Node) => {
      draggingNodeRef.current = { ...node };
    },
    [draggingNodeRef],
  );

  useEffect(() => {
    setNodes(initialNodes as FlowNode[]);
    setEdges(initialEdges as FlowEdge[]);
  }, [initialNodes, initialEdges, setEdges, setNodes]);

  return {
    reactFlowProps: {
      nodes,
      onNodesChange,
      edges,
      onEdgesChange,
      onConnect,
      onNodeDragStart,
      onNodeDragStop,
      onNodeDrag,
    },
    flowOverlayProps: {
      initialized,
      toggle,
      running,
    },
  };
}
