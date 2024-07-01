'use client';

import React, { PropsWithChildren, useCallback } from 'react';
import ReactFlow, { Background, BackgroundVariant, Panel } from 'reactflow';

import { EdgeWithDelete } from '@/react-flow/components/edges/EdgeWithDelete';
import { FlowOverlay } from '@/react-flow/components/generic/FlowOverlay';

import {
  DataLink,
  DataNodeDto,
  useDirectSimRefEditsDispatch,
  useModalContent,
  useNodeLabelController
} from 'react-d3-force-wrapper';
import { AddRootNode } from '@/react-flow/components/nodes/AddRootNode';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { useEditableFlow } from '@/react-flow/hooks/useEditableFlow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import {
  validateWorkSchemaNodeDataNodeDto,
  workSchemaNodeCloneFunctionWrapper,
  workSchemaNodeGraphUpdater
} from '@/components/react-flow/work-schema-node/workSchemaNodeCallbacks';
import { convertToWorkSchemaFlowNode } from '@/react-flow/utils/adaptors';
import { EntityClassMap } from '@/api/entity-class-map';
import WorkSchemaNodeDetailsContent from '@/components/react-flow/work-schema-node/WorkSchemaNodeDetailsContent';
import { workSchemaNodeTypesUi } from '@/components/react-flow/work-schema-node/workSchemaNodeTypesUi';
import { Button } from '@nextui-org/button';
import { PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Popover } from '@nextui-org/react';
import {
  BaseLazyDtoUiProps,
  DtoUiListSome,
  LazyDtoUiListSome,
  NamespacedHooks
} from 'dto-stores';
import { EmptyArray } from '@/api/literals';
import { Spinner } from '@nextui-org/spinner';
import { useGlobalListener } from 'selective-context';
import { Api } from '@/api/clientApi';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';

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

  const { currentState } = NamespacedHooks.useListen(
    EntityClassMap.workSchemaNode,
    'idList',
    'layout-flow',
    EmptyArray as number[]
  );

  return (
    // 6. Pass the props to the ReactFlow component
    <ReactFlow
      {...reactFlowProps}
      minZoom={0.2}
      fitView
      nodeTypes={workSchemaNodeTypesUi}
      edgeTypes={edgeTypes}
    >
      <PendingOverlay pending={isPending} />
      <Panel position={'top-center'}>
        <Popover>
          <PopoverTrigger>
            <Button variant={'light'}>Add Unassigned Root</Button>
          </PopoverTrigger>
          <PopoverContent>
            <DtoUiListSome
              entityIdList={currentState}
              entityClass={EntityClassMap.workSchemaNode}
              whileLoading={() => <Spinner />}
              renderAs={WorkSchemaNodeSummary}
            />
          </PopoverContent>
        </Popover>
      </Panel>
      {reactFlowProps.nodes.length === 0 && <AddRootNode />}
      {children}
      {/* 7. Add a background */}
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      {/* 8. Pass the overlay props */}
      <FlowOverlay {...flowOverlayProps} />
    </ReactFlow>
  );
}

const ModalMemo = {
  memoizedFunction: WorkSchemaNodeDetailsContent
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
    workSchemaNodeAssignmentIds: [],
    resolutionMode: 'OPEN'
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

export function WorkSchemaNodeSummary({
  entity
}: BaseLazyDtoUiProps<WorkSchemaNodeDto>) {
  const { dispatchNextSimVersion, nodeListRef, linkListRef } =
    useDirectSimRefEditsDispatch(`unassignedRootNode${entity.id}`);

  const onPress = useCallback(async () => {
    if (nodeListRef === null || linkListRef === null) return;
    const graphDto = await Api.WorkSchemaNode.getGraphByRootId({
      rootId: entity.id
    });

    graphDto.closureDtos = graphDto.closureDtos.filter(
      (closure) => closure.value === 1
    );
    const { dataNodes, dataLinks } = convertGraphDtoToReactFlowState(
      graphDto,
      convertToWorkSchemaFlowNode
    );
    const nodes = [...nodeListRef.current, ...dataNodes];
    const links = [...linkListRef.current, ...dataLinks];
    dispatchNextSimVersion(nodes, links);
  }, [nodeListRef, linkListRef, dispatchNextSimVersion, entity.id]);

  return (
    <Button onPress={onPress}>
      WorkSchemaNode: {entity.name ?? entity.id}
    </Button>
  );
}
