'use client';

import React, { memo, PropsWithChildren, useMemo } from 'react';
import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import { FlowOverlay } from '@/components/react-flow/generic/components/generic/FlowOverlay';
import {
  cloneFunctionWrapper,
  organizationGraphUpdater
} from '@/components/react-flow/organization/organizationCallbacks';
import OrganizationDetailsContent from '@/components/react-flow/organization/OrganizationDetailsContent';

import {
  DataLink,
  DataNodeDto,
  MemoizedFunction,
  NodeModalContentComponent,
  useModalContent,
  useNodeLabelController
} from 'react-d3-force-wrapper';
import { AllocationTotal } from '@/components/react-flow/organization/allocationTotal';
import { OrganizationNode } from '@/components/react-flow/organization/OrganizationNode';
import {
  EditAddDeleteDtoControllerArray,
  NamespacedHooks,
  useEffectSyncDeepEqualWithDispatch
} from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { OrganizationDto as OrgDto } from '@/api/generated-types/generated-types';
import { OrganizationTypeDto } from '@/api/generated-types/generated-types';
import { EntityClassMap } from '@/api/entity-class-map';
import { convertBackToDataNodeDtoOrganizationNode } from '@/components/react-flow/organization/convertBackToDataNodeDtoOrganizationNode';
import { AddRootNode } from '@/components/react-flow/generic/components/nodes/AddRootNode';
import { convertToOrganizationNode } from '@/components/react-flow/generic/utils/adaptors';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { useEditableFlow } from '@/components/react-flow/generic/hooks/useEditableFlow';
import { TopToBottomEdge } from '@/components/react-flow/generic/components/edges/TopToBottomEdge';
import { FlowNode } from '@/components/react-flow/generic/types';
import { useOrientedDepthLayout } from '@/components/react-flow/organization/useOrientedDepthLayout';
import { Simplify } from 'type-fest';

type OrganizationDto = Simplify<OrgDto>;

export function ClassHierarchyLayoutFlowWithForces({
  children,
  typeData
}: PropsWithChildren & { typeData: OrganizationTypeDto }) {
  const organizationTemplateNode = useMemo(() => {
    const typedTemplate = {
      ...TemplateOrganizationNode,
      data: {
        ...TemplateOrganizationNode.data,
        type: typeData,
        name: typeData.name
      }
    };
    return convertToOrganizationNode(typedTemplate);
  }, [typeData]);
  const { flowOverlayProps, reactFlowProps, isPending } =
    useEditableFlow<OrganizationDto>(
      cloneFunctionWrapper as MemoizedFunction<
        FlowNode<OrganizationDto>,
        FlowNode<OrganizationDto>
      >,
      organizationTemplateNode,
      TemplateOrganizationLink,
      organizationGraphUpdater,
      convertToOrganizationNode,
      EntityClassMap.organization,
      convertBackToDataNodeDtoOrganizationNode
    );

  const { nodes } = reactFlowProps;
  useOrientedDepthLayout(nodes, 400, 'vertical');

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
      <EditAddDeleteDtoControllerArray
        dtoList={allocationTotalList}
        entityClass={'allocationTotal'}
      />
      {reactFlowProps.nodes.length === 0 && <AddRootNode />}
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
  default: TopToBottomEdge
};

// 3. Define the content for the Node Details Modal
const memoizedContentComponent: NodeModalContentComponent = {
  memoizedFunction: OrganizationDetailsContent
};

const TemplateOrganizationNode: DataNodeDto<OrganizationDto> = {
  data: {
    id: 0,
    name: 'Organization',
    type: {
      id: 0,
      name: 'type name'
    },
    workSchemaNodeAssignment: {
      id: 0,
      organizationId: 0,
      workSchemaNodeId: 0
    }
  },
  id: 0,
  distanceFromRoot: 0
};

const TemplateOrganizationLink: DataLink<OrganizationDto> = {
  id: '0',
  closureType: 'OrganizationRelationship',
  source: 0,
  target: 0,
  value: 1,
  weighting: 1
};
