'use client';

import React, { PropsWithChildren } from 'react';
import ReactFlow, { Background, BackgroundVariant } from 'reactflow';

import {
  NodeModalContentComponent,
  useAllEdits,
  useModalContent,
  useNodeEditing
} from 'react-d3-force-graph';
import { EdgeWithDelete } from '@/react-flow/components/edges/EdgeWithDelete';
import { FlowOverlay } from '@/react-flow/components/generic/FlowOverlay';
import { useLayoutFlowWithForces } from '@/react-flow/hooks/useLayoutFlowWithForces';
import { cloneFunctionWrapper } from '@/components/react-flow/organization/organizationCallbacks';
import OrganizationNode from '@/components/react-flow/organization/OrganizationNode';
import OrganizationDetailsContent from '@/components/react-flow/organization/OrganizationDetailsContent';

export function ClassHierarchyLayoutFlowWithForces({
  children
}: PropsWithChildren) {
  // 4. Call the hook to set up the layout with forces
  const { flowOverlayProps, reactFlowProps } = useLayoutFlowWithForces();

  // Set up the available edit hooks.
  useNodeEditing(cloneFunctionWrapper);
  useAllEdits();

  // useEffectSyncToMemo(dispatchWithoutListen, cloneFunctionWrapper);

  // 5. Call the hook to define the modal content
  useModalContent(memoizedContentComponent);

  return (
    // 6. Pass the props to the ReactFlow component
    <ReactFlow
      {...reactFlowProps}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    >
      {children}
      {/* 7. Add a background */}
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      {/* 8. Pass the overlay props */}
      <FlowOverlay {...flowOverlayProps} />
    </ReactFlow>
  );
}
// 1. Define the node types and their components
const nodeTypes = {
  organization: OrganizationNode
};

// 2. Define the Edge types and their components
const edgeTypes = {
  default: EdgeWithDelete
};

// 3. Define the content for the Node Details Modal
const memoizedContentComponent: NodeModalContentComponent = {
  memoizedFunction: OrganizationDetailsContent
};
