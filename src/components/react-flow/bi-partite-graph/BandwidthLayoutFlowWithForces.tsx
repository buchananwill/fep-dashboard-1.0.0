'use client';

import React, { memo, PropsWithChildren, useTransition } from 'react';
import ReactFlow, { Background, BackgroundVariant } from 'reactflow';

import { EdgeWithDelete } from '@/react-flow/components/edges/EdgeWithDelete';
import { FlowOverlay } from '@/react-flow/components/generic/FlowOverlay';
import { useLayoutFlowWithForces } from '@/react-flow/hooks/useLayoutFlowWithForces';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import ClassificationNode from '@/components/react-flow/bi-partite-graph/ClassificationNode';
import { useMaxProjectionController } from '@/components/react-flow/bi-partite-graph/useMaxProjectionController';

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
