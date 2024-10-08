'use client';

import React, { memo, PropsWithChildren, useMemo } from 'react';
import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import { FlowOverlay } from '@/components/react-flow/generic/components/generic/FlowOverlay';
import {
  cloneFunctionWrapper,
  organizationGraphUpdater
} from '@/components/react-flow/organization/organizationCallbacks';

import {
  DataLink,
  DataNodeDto,
  MemoizedFunction,
  useNodeLabelController
} from 'react-d3-force-wrapper';
import { EntityClassMap } from '@/api/entity-class-map';
import { convertBackToDataNodeDtoOrganizationNode } from '@/components/react-flow/organization/convertBackToDataNodeDtoOrganizationNode';
import { AddRootNode } from '@/components/react-flow/generic/components/nodes/AddRootNode';
import { convertToOrganizationNode } from '@/components/react-flow/generic/utils/adaptors';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { useEditableFlow } from '@/components/react-flow/generic/hooks/useEditableFlow';
import { FlowNode } from '@/components/react-flow/generic/types';
import InputValueListNode from '@/components/react-flow/generator-graph/InputValueListNode';
import { LeftToRightEdge } from '@/components/react-flow/generic/components/edges/LeftToRightEdge';
import {
  OrganizationDto as OrgInterface,
  OrganizationTypeDto
} from '@/api/generated-types/generated-types';
// import { Simplify } from 'type-fest';

type Simplify<T> = {
  [Key in keyof T]: T[Key];
};

type OrganizationDto = Simplify<OrgInterface>;

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

const NodeMemo = memo(InputValueListNode);

// 1. Define the node types and their components
const nodeTypes = {
  textNode: NodeMemo
};

// 2. Define the Edge types and their components
const edgeTypes = {
  default: LeftToRightEdge
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
