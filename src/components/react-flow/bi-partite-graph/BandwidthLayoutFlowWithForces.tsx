'use client';

import React, {
  memo,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useTransition
} from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  OnSelectionChangeParams,
  useOnSelectionChange
} from 'reactflow';

import { EdgeWithDelete } from '@/react-flow/components/edges/EdgeWithDelete';
import { FlowOverlay } from '@/react-flow/components/generic/FlowOverlay';
import { useLayoutFlowWithForces } from '@/react-flow/hooks/useLayoutFlowWithForces';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import ClassificationNode, {
  Classification
} from '@/components/react-flow/bi-partite-graph/ClassificationNode';
import { useMaxProjectionController } from '@/components/react-flow/bi-partite-graph/useMaxProjectionController';
import { FlowEdge, FlowNode } from '@/react-flow/types';
import { SelectItem } from '@nextui-org/select';
import {
  GraphSelectiveContextKeys,
  useGraphController
} from 'react-d3-force-wrapper';
import { useGlobalController } from 'selective-context';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';

export function BandwidthLayoutFlowWithForces({ children }: PropsWithChildren) {
  // 4. Call the hook to set up the layout with forces
  const { flowOverlayProps, reactFlowProps, dispatchNodes, dispatchEdges } =
    useLayoutFlowWithForces();
  const [isPending, startTransition] = useTransition();

  useMaxProjectionController();

  return (
    // 6. Pass the props to the ReactFlow component
    <ReactFlow
      {...reactFlowProps}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    >
      <SelectionChangeTraversalUpdater />
      <PendingOverlay pending={isPending} />
      {children}
      {/* 7. Add a background */}
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      {/* 8. Pass the overlay props */}
      <FlowOverlay {...flowOverlayProps} />
    </ReactFlow>
  );
}

const NodeMemo = memo(ClassificationNode);

// 1. Define the node types and their components
const nodeTypes = {
  classificationNode: NodeMemo
};

// 2. Define the Edge types and their components
const edgeTypes = {
  default: EdgeWithDelete
};

export interface WorkTaskTypeProjection {
  totalTaskVolume: number;
  id: number;
}

const InitialSet = new Set();
export const InitialSetRef = { current: InitialSet };

function SelectionChangeTraversalUpdater() {
  const listenerKey = useUuidListenerKey();
  const selectedSetRef = useRef(new Set());
  const { dispatch } = useGlobalController({
    contextKey: 'selectedNodeIdSet',
    listenerKey,
    initialValue: selectedSetRef
  });

  // the passed handler has to be memoized, otherwise the hook will not work correctly
  const onChange = useMemo(() => {
    const onChange = ({ nodes, edges }: OnSelectionChangeParams) => {
      const strings = nodes.map((n) => n.id);
      if (nodes.length === 0) {
        console.log('removing traversal mappings');
        // remove mappings
      } else if (nodes.length === 1) {
        console.log('adding traversal mappings');
        // setup traversal mapping
      } else {
        // do nothing for now. Could possibly try to resolve in the future?
      }
      selectedSetRef.current = new Set(strings);
    };
    return { onChange };
  }, [selectedSetRef]);

  useOnSelectionChange(onChange);
  return null;
}
