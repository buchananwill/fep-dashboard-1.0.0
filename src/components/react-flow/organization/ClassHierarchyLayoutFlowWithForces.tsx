'use client';

import React, { memo, PropsWithChildren, useMemo } from 'react';
import ReactFlow, { Background, BackgroundVariant } from 'reactflow';

import { EdgeWithDelete } from '@/react-flow/components/edges/EdgeWithDelete';
import { FlowOverlay } from '@/react-flow/components/generic/FlowOverlay';
import { useLayoutFlowWithForces } from '@/react-flow/hooks/useLayoutFlowWithForces';
import {
  cloneFunctionWrapper,
  organizationGraphUpdater
} from '@/components/react-flow/organization/organizationCallbacks';
import OrganizationDetailsContent from '@/components/react-flow/organization/OrganizationDetailsContent';

import {
  NodeModalContentComponent,
  useAllEdits,
  useModalContent,
  useNodeEditing
} from 'react-d3-force-wrapper';
import { AllocationTotal } from '@/components/react-flow/organization/allocationTotal';
import { OrganizationNode } from '@/components/react-flow/organization/OrganizationNode';
import {
  EditAddDeleteDtoControllerArray,
  NamespacedHooks,
  useEffectSyncDeepEqualWithDispatch
} from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';

export function ClassHierarchyLayoutFlowWithForces({
  children
}: PropsWithChildren) {
  // 4. Call the hook to set up the layout with forces
  const { flowOverlayProps, reactFlowProps } = useLayoutFlowWithForces();

  // Set up the available edit hooks.
  useNodeEditing(cloneFunctionWrapper, organizationGraphUpdater);
  useAllEdits();

  const { nodes } = reactFlowProps;

  const allocationTotalList: AllocationTotal[] = useMemo(
    () =>
      nodes.map((n) => ({
        id: n.data.id,
        amount: 0
      })),
    [nodes]
  );

  const dispatchWithoutListen = NamespacedHooks.useDispatch(
    'allocationTotal',
    KEY_TYPES.MASTER_LIST
  );

  useEffectSyncDeepEqualWithDispatch(
    allocationTotalList,
    dispatchWithoutListen
  );

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
      <EditAddDeleteDtoControllerArray
        dtoList={allocationTotalList}
        entityClass={'allocationTotal'}
      />
      {children}
      {/* 7. Add a background */}
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      {/* 8. Pass the overlay props */}
      <FlowOverlay {...flowOverlayProps} />
    </ReactFlow>
  );
}

const NodeMemo = memo(OrganizationNode);

// 1. Define the node types and their components
const nodeTypes = {
  organization: NodeMemo
};

// 2. Define the Edge types and their components
const edgeTypes = {
  default: EdgeWithDelete
};

// 3. Define the content for the Node Details Modal
const memoizedContentComponent: NodeModalContentComponent = {
  memoizedFunction: OrganizationDetailsContent
};
