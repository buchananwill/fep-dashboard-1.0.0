'use client';
import {
  Connection,
  Node,
  useEdgesState,
  useNodesState,
  useUpdateNodeInternals,
  XYPosition
} from '@xyflow/react';
import {
  draggingNodeKey,
  useForces,
  UseForcesParams
} from '@/components/react-flow/generic/hooks/useForces';
import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef
} from 'react';
import { useGlobalDispatch } from 'selective-context';
import { FlowEdge, FlowNode } from '@/components/react-flow/generic/types';
import {
  DataNode,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  undefinedDeleteLinks,
  useGraphListener,
  useLinkContext,
  useNodeContext
} from 'react-d3-force-wrapper';
import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';

const listenerKey = 'layout-flow-with-forces';

export function useLayoutFlowWithForces<T extends NodeDataType>(
  params: UseForcesParams
) {
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
  const [initialized, toggle, nodeRefList] = useForces(params);
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
    if (running || !running) {
      dispatchWithoutListen(draggingNodeRef);
    }
    return () => dispatchWithoutListen(undefined);
  }, [running, draggingNodeRef, dispatchWithoutListen]);

  const onNodeDragStart = useCallback(
    (_event: ReactMouseEvent, node: Node) => {
      draggingNodeRef.current = { ...node, selected: !!node.selectable };
    },
    [draggingNodeRef]
  );

  const runningRef = useRef(running);
  runningRef.current = running;

  const onNodeDragStop = useCallback(() => {
    if (!runningRef.current && nodeRefList) {
      // Copying the position to the mutable node so it won't be overwritten by topology edits while sim is not running.
      const mutableNode = nodeRefList.current.find(
        (n) => n.id === draggingNodeRef.current?.id
      );
      if (mutableNode) {
        mutableNode.x = draggingNodeRef.current?.position.x;
        mutableNode.y = draggingNodeRef.current?.position.y;
        (mutableNode as DataNode<any> & { position?: XYPosition }).position =
          draggingNodeRef.current?.position;
      }
    }
    draggingNodeRef.current = undefined;
  }, [draggingNodeRef, nodeRefList]);

  const onNodeDrag = useCallback(
    (_event: ReactMouseEvent, node: Node) => {
      draggingNodeRef.current = { ...node };
    },
    [draggingNodeRef]
  );

  useEffect(() => {
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
