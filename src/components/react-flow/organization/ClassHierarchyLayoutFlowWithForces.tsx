'use client';

import React, {
  memo,
  PropsWithChildren,
  useCallback,
  useMemo,
  useTransition
} from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  useReactFlow
} from 'reactflow';

import { EdgeWithDelete } from '@/react-flow/components/edges/EdgeWithDelete';
import { FlowOverlay } from '@/react-flow/components/generic/FlowOverlay';
import { useLayoutFlowWithForces } from '@/react-flow/hooks/useLayoutFlowWithForces';
import {
  cloneFunctionWrapper,
  organizationGraphUpdater
} from '@/components/react-flow/organization/organizationCallbacks';
import OrganizationDetailsContent from '@/components/react-flow/organization/OrganizationDetailsContent';

import {
  DataLink,
  DataNodeDto,
  GraphDtoPutRequestBody,
  GraphSelectiveContextKeys,
  NodeModalContentComponent,
  useAllEdits,
  useGraphDispatch,
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
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import { OrganizationTypeDto } from '@/api/dtos/OrganizationTypeDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { useGlobalDispatch } from 'selective-context';
import { useHasChangesFlagCallback } from 'dto-stores/dist/hooks/internal/useHasChangesFlagCallback';
import { revalidateOrganizationNode } from '@/components/react-flow/organization/revalidateOrganizationNode';
import { AddRootNode } from '@/react-flow/components/nodes/AddRootNode';
import { convertToOrganizationNode } from '@/react-flow/utils/adaptors';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import { PendingOverlay } from '@/components/overlays/pending-overlay';

export function ClassHierarchyLayoutFlowWithForces({
  children,
  typeData
}: PropsWithChildren & { typeData: OrganizationTypeDto }) {
  // 4. Call the hook to set up the layout with forces
  const { flowOverlayProps, reactFlowProps, dispatchNodes, dispatchEdges } =
    useLayoutFlowWithForces();
  const [isPending, startTransition] = useTransition();
  const { fitView } = useReactFlow();
  const { dispatchWithoutListen: dispatchDeletedLinkIds } = useGraphDispatch(
    GraphSelectiveContextKeys.deletedLinkIds
  );
  const { dispatchWithoutListen: dispatchDeletedNodeIds } = useGraphDispatch(
    GraphSelectiveContextKeys.deletedNodeIds
  );
  const { dispatchWithoutListen: dispatchUnsavedGraph } = useGraphDispatch(
    GraphSelectiveContextKeys.unsavedNodeData
  );

  const updateGraphAndSyncUi = useCallback(
    async (request: GraphDtoPutRequestBody<OrganizationDto>) => {
      startTransition(async () => {
        organizationGraphUpdater(request).then((graphDto) => {
          const { dataNodes, dataLinks } = convertGraphDtoToReactFlowState(
            graphDto,
            convertToOrganizationNode
          );
          dispatchNodes(dataNodes);
          dispatchEdges(() => {
            return dataLinks.filter((link) => link.value === 1);
          });
          dispatchDeletedLinkIds([]);
          dispatchDeletedNodeIds([]);
          dispatchUnsavedGraph(false);
          fitView();
        });
      });
    },
    [
      dispatchNodes,
      dispatchEdges,
      dispatchDeletedNodeIds,
      dispatchDeletedLinkIds,
      dispatchUnsavedGraph,
      fitView
    ]
  );

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

  // Set up the available edit hooks.
  const { unsavedChanges, onConfirm } = useNodeEditing(
    cloneFunctionWrapper,
    organizationTemplateNode,
    TemplateOrganizationLink,
    updateGraphAndSyncUi,
    revalidateOrganizationNode
  );
  useAllEdits();

  const { dispatchWithoutListen: changesDispatch } =
    useGlobalDispatch('unsavedChanges');

  useHasChangesFlagCallback(
    onConfirm,
    unsavedChanges,
    changesDispatch,
    `${EntityClassMap.organization}-graph`
  );

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
  default: EdgeWithDelete
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
    workSeriesBundleAssignment: {
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
