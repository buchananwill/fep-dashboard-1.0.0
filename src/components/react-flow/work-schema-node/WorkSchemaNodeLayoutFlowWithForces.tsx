'use client';

import React, { memo, PropsWithChildren } from 'react';
import ReactFlow, { Background, BackgroundVariant } from 'reactflow';

import { EdgeWithDelete } from '@/react-flow/components/edges/EdgeWithDelete';
import { FlowOverlay } from '@/react-flow/components/generic/FlowOverlay';

import {
  DataLink,
  DataNodeDto,
  useModalContent,
  useNodeLabelController
} from 'react-d3-force-wrapper';
import { AddRootNode } from '@/react-flow/components/nodes/AddRootNode';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { useEditableFlow } from '@/react-flow/hooks/useEditableFlow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import WorkSchemaNode from '@/components/react-flow/work-schema-node/WorkSchemaNode';
import {
  validateWorkSchemaNodeDataNodeDto,
  workSchemaNodeCloneFunctionWrapper,
  workSchemaNodeGraphUpdater
} from '@/components/react-flow/work-schema-node/workSchemaNodeCallbacks';
import { convertToWorkSchemaFlowNode } from '@/react-flow/utils/adaptors';
import { EntityClassMap } from '@/api/entity-class-map';
import WorkSchemaNodeDetailsContent from '@/components/react-flow/work-schema-node/WorkSchemaNodeDetailsContent';

export function WorkSchemaNodeLayoutFlowWithForces({
  children
}: PropsWithChildren) {
  // 4. Call the hook to set up the layout with forces
  const { flowOverlayProps, isPending, reactFlowProps } =
    useEditableFlow<WorkSchemaNodeDto>(
      workSchemaNodeCloneFunctionWrapper,
      templateWorkSchemaFlowNode,
      templateWorkSchemaNodeLink,
      workSchemaNodeGraphUpdater,
      convertToWorkSchemaFlowNode,
      EntityClassMap.workSchemaNode,
      validateWorkSchemaNodeDataNodeDto
    );

  useModalContent(ModalMemo);
  useNodeLabelController();

  return (
    // 6. Pass the props to the ReactFlow component
    <ReactFlow
      {...reactFlowProps}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    >
      <PendingOverlay pending={isPending} />

      {reactFlowProps.nodes.length === 0 && <AddRootNode />}
      {children}
      {/* 7. Add a background */}
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      {/* 8. Pass the overlay props */}
      <FlowOverlay {...flowOverlayProps} />
    </ReactFlow>
  );
}

const NodeMemo = memo(WorkSchemaNode);

const ModalMemo = {
  memoizedFunction: WorkSchemaNodeDetailsContent
};

// 1. Define the node types and their components
const nodeTypes = {
  workSchemaNode: NodeMemo
};

// 2. Define the Edge types and their components
const edgeTypes = {
  default: EdgeWithDelete
};

const TemplateWorkSchemaNode: DataNodeDto<WorkSchemaNodeDto> = {
  data: {
    id: 0,
    name: 'Work Schema Node',
    dominanceFactor: 1,
    priority: 1,
    allowBundle: true,
    preferCarousel: false,
    workSchemaNodeAssignmentIds: []
  },
  id: 0,
  distanceFromRoot: 0
};

const templateWorkSchemaNodeLink: DataLink<WorkSchemaNodeDto> = {
  id: '0',
  closureType: 'WorkSchemaNodeClosure',
  source: 0,
  target: 0,
  value: 1,
  weighting: 1
};

const templateWorkSchemaFlowNode = convertToWorkSchemaFlowNode(
  TemplateWorkSchemaNode
);
