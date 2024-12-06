'use client';

import React, { memo, PropsWithChildren, useMemo } from 'react';
import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import { FlowOverlay } from '@/components/react-flow/generic/components/generic/FlowOverlay';
import {
  cloneFunctionWrapper,
  organizationGraphUpdater
} from '@/components/react-flow/organization/functions/organizationCallbacks';
import OrganizationDetailsContent from '@/components/react-flow/organization/components/OrganizationDetailsContent';

import {
  DataLink,
  DataNodeDto,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  NodeModalContentComponent,
  useGraphDispatch,
  useModalContent,
  useNodeLabelController
} from 'react-d3-force-wrapper';
import { OrganizationNode } from '@/components/react-flow/organization/components/OrganizationNode';
import {
  EditAddDeleteDtoControllerArray,
  NamespacedHooks,
  useEffectSyncDeepEqualWithDispatch
} from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import {
  OrganizationDto as OrgDto,
  OrganizationTypeDto
} from '@/api/generated-types/generated-types_';
import { EntityClassMap } from '@/api/entity-class-map';
import { convertBackToDataNodeDtoOrganizationNode } from '@/components/react-flow/organization/functions/convertBackToDataNodeDtoOrganizationNode';
import { AddRootNode } from '@/components/react-flow/generic/components/nodes/AddRootNode';
import { convertToOrganizationNode } from '@/components/react-flow/generic/utils/adaptors';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { useEditableFlow } from '@/components/react-flow/generic/hooks/useEditableFlow';
import { TopToBottomEdge } from '@/components/react-flow/generic/components/edges/TopToBottomEdge';
import { FlowNode } from '@/components/react-flow/generic/types';
import { Simplify } from 'type-fest';
import { AllocationTotal } from '@/components/react-flow/organization/types';
import { HierarchicalDataOptions } from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';
import { UseForcesParams } from '@/components/react-flow/generic/hooks/useForces';
import { collide } from '@/components/react-flow/generic/utils/collide';
import { dagreForce } from '@/components/react-flow/generic/hooks/getDagreForce';

type OrganizationDto = Simplify<OrgDto>;

const initialValue: HierarchicalDataOptions = {
  orientation: 'vertical',
  nodeSize: [300, 300],
  algorithm: 'dagre'
};

export const hierarchyOptionsContextKey = 'hierarchyOptions';

const forcesParams: UseForcesParams = {
  applyFitView: false,
  forceFunctions: {
    collide: collide.strength(0.01),
    custom: dagreForce
  },
  hierarchyOptions: initialValue
};

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
      convertBackToDataNodeDtoOrganizationNode,
      forcesParams
    );

  const { nodes } = reactFlowProps;
  // useOrientedDepthLayout(nodes, 400, 'vertical', edges);

  const allocationTotalList: AllocationTotal[] = useMemo(
    () =>
      nodes.map((n) => ({
        id: n.data.id,
        amount: 0
      })),
    [nodes]
  );

  useGraphDispatch(GraphSelectiveContextKeys.dimensions);

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
  id: 0
};

const TemplateOrganizationLink: DataLink<OrganizationDto> = {
  id: '0',
  closureType: 'OrganizationRelationship',
  source: 0,
  target: 0,
  value: 1,
  weighting: 1
};
