'use client';

import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { Background, BackgroundVariant, Panel, ReactFlow } from '@xyflow/react';
import { FlowOverlay } from '@/components/react-flow/generic/components/generic/FlowOverlay';

import {
  DataLink,
  DataNode,
  DataNodeDto,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  useGraphDispatch,
  useModalContent,
  useNodeLabelController
} from 'react-d3-force-wrapper';
import { AddRootNode } from '@/components/react-flow/generic/components/nodes/AddRootNode';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { useEditableFlow } from '@/components/react-flow/generic/hooks/useEditableFlow';
import {
  validateHierarchy,
  validateWorkSchemaNodeDataNodeDto,
  workSchemaNodeCloneFunctionWrapper,
  workSchemaNodeGraphUpdater
} from '@/components/react-flow/work-schema-node/functions/workSchemaNodeCallbacks';
import {
  convertToWorkSchemaFlowNode,
  WorkSchemaNodeDto
} from '@/components/react-flow/generic/utils/adaptors';
import { EntityClassMap } from '@/api/entity-class-map';
import WorkSchemaNodeDetailsContent from '@/components/react-flow/work-schema-node/components/WorkSchemaNodeDetailsContent';
import { workSchemaNodeTypesUi } from '@/components/react-flow/work-schema-node/workSchemaNodeTypesUi';
import { Button, Loader, Popover } from '@mantine/core';
import {
  DtoUiListSome,
  EditAddDeleteDtoControllerArray,
  NamespacedHooks,
  useReadAnyDto
} from 'dto-stores';
import { EmptyArray } from '@/api/client-literals';
import { NodeValidator } from '@/components/react-flow/generic/types';
import {
  CarouselDto,
  WorkSchemaDto
} from '@/api/generated-types/generated-types_';
import { UnassignedRootButton } from '@/components/react-flow/work-schema-node/components/UnassignedRootButton';
import { RollupUpdater } from '@/components/react-flow/work-schema-node/components/RollupUpdater';
import { useIdToNodeMapMemo } from '@/components/react-flow/generic/hooks/useIdToNodeMapMemo';
import { useIdToEdgeMapMemo } from '@/components/react-flow/generic/hooks/useIdToEdgeMapMemo';
import { useIdToChildIdMapMemo } from '@/components/react-flow/generic/hooks/useIdToChildIdMapMemo';
import { useWorkSchemaNodeRollupMemo } from '@/components/react-flow/work-schema-node/functions/useWorkSchemaNodeRollupMemo';
import { LeftToRightEdge } from '@/components/react-flow/generic/components/edges/LeftToRightEdge';
import { useValidateConnection } from '@/components/react-flow/generic/hooks/useValidateConnection';
import { useCheckToggleFirstAndAfter } from '@/components/react-flow/generic/hooks/useCheckToggleFirstAndAfter';
import { useHierarchicalTreeLayout } from '@/components/react-flow/generic/hooks/useHierarchicalTreeLayout';
import { isNotUndefined } from '@/api/main';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { useGlobalController } from 'selective-context';
import { HierarchicalDataOptions } from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';
import { collide } from '@/components/react-flow/generic/utils/collide';
import { treeForce } from '@/components/react-flow/generic/hooks/getTreeForce';
import { UseForcesParams } from '@/components/react-flow/generic/hooks/useForces';
import { useInterceptNodeDataUpdate } from '@/components/react-flow/work-schema-node/functions/UseInterceptNodeDataUpdate';

export const AllocationRollupEntityClass = 'AllocationRollup';

const options: HierarchicalDataOptions = {
  nodeSize: [60, 400],
  orientation: 'horizontal'
};

const forcesParams: UseForcesParams = {
  applyFitView: false,
  forceFunctions: {
    collide: collide.strength(0),
    custom: treeForce.strength(0.01)
  },
  hierarchyOptions: options
};

export function WorkSchemaNodeLayoutFlowWithForces({
  children
}: PropsWithChildren) {
  // 4. Call the hook to set up the layout with forces
  const { flowOverlayProps, isPending, reactFlowProps, contextData } =
    useEditableFlow<WorkSchemaNodeDto>(
      workSchemaNodeCloneFunctionWrapper,
      templateWorkSchemaFlowNode,
      templateWorkSchemaNodeLink,
      workSchemaNodeGraphUpdater,
      convertToWorkSchemaFlowNode,
      EntityClassMap.workSchemaNode,
      validateWorkSchemaNodeDataNodeDto as NodeValidator<WorkSchemaNodeDto>,
      forcesParams
    );
  const checkToggleFirstAndAfter =
    useCheckToggleFirstAndAfter(flowOverlayProps);

  const { nodesFromContext, edgesFromContext } = contextData;

  const idToNodeMap = useIdToNodeMapMemo(nodesFromContext);
  const idToEdgeMap = useIdToEdgeMapMemo(edgesFromContext);
  const idToChildIdMap = useIdToChildIdMapMemo(edgesFromContext);

  const schemaIdList = useMemo(() => {
    return nodesFromContext
      .map((node) => node.data.workSchemaId)
      .filter(isNotUndefined);
  }, [nodesFromContext]);

  const { data } = useQuery({
    queryKey: [EntityClassMap.workSchema, 'leafNodes', ...schemaIdList],
    queryFn: () => Api.WorkSchema.getDtoListByBodyList(schemaIdList)
  });

  const schemaMap = useMemo(() => {
    if (!data) return new Map<number, WorkSchemaDto>();
    return data.reduce((prev, curr) => prev.set(curr.id, curr), new Map());
  }, [data]);

  const leafToSchemaMap = useMemo(() => {
    return nodesFromContext.reduce((prev, curr) => {
      const leafSchemaId = curr.data.workSchemaId;
      if (leafSchemaId !== undefined) {
        const schema = schemaMap.get(leafSchemaId);
        if (schema) {
          prev.set(curr.id, schema);
        }
      }
      return prev;
    }, new Map<string, WorkSchemaDto>());
  }, [nodesFromContext, schemaMap]);

  const allocationRollupEntities = useWorkSchemaNodeRollupMemo(
    nodesFromContext,
    leafToSchemaMap,
    idToChildIdMap,
    idToNodeMap
  );
  useHierarchicalTreeLayout(idToChildIdMap);

  const { onConnect, ...otherProps } = reactFlowProps;

  const readAnyCarousel = useReadAnyDto<CarouselDto>(EntityClassMap.carousel);

  const validateWorkSchemaNodeHierarchy = useCallback(
    (
      source: DataNode<WorkSchemaNodeDto> | undefined,
      target: DataNode<WorkSchemaNodeDto> | undefined
    ) => {
      if (
        edgesFromContext.some(
          (edge) =>
            edge.target === target?.id ||
            (edge.target as DataNode<any>).id === target?.id
        )
      ) {
        return false;
      }
      return validateHierarchy(source?.data, target?.data, readAnyCarousel);
    },
    [readAnyCarousel, edgesFromContext]
  );

  useGlobalController({
    contextKey: `workSchemaNode:customStrength-label`,
    listenerKey: 'wsn-graph',
    initialValue: 'Hierarchy Strength'
  });

  const interceptedOnConnect = useValidateConnection(
    checkToggleFirstAndAfter,
    idToNodeMap,
    onConnect,
    validateWorkSchemaNodeHierarchy
  );

  const { dispatchWithoutListen: dispatchDeleteLinksFunction } =
    useGraphDispatch<MemoizedFunction<string[], void>>(
      GraphSelectiveContextKeys.deleteLinks
    );

  const { dispatchWithoutListen } = useGraphDispatch<
    MemoizedFunction<WorkSchemaNodeDto, void>
  >(GraphSelectiveContextKeys.editNodeData);
  useInterceptNodeDataUpdate(dispatchWithoutListen, checkToggleFirstAndAfter);

  const mergedReactFlowProps = useMemo(() => {
    return { onConnect: interceptedOnConnect, ...otherProps };
  }, [interceptedOnConnect, otherProps]);

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
      {...mergedReactFlowProps}
      minZoom={0.2}
      fitView
      nodeTypes={workSchemaNodeTypesUi}
      edgeTypes={edgeTypes}
    >
      <EditAddDeleteDtoControllerArray
        entityClass={AllocationRollupEntityClass}
        dtoList={EmptyArray}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workSchema}
        dtoList={EmptyArray}
      />
      <RollupUpdater allocationRollupEntities={allocationRollupEntities} />
      <PendingOverlay pending={isPending} />
      <Panel position={'top-center'}>
        <Popover>
          <Popover.Target>
            <Button variant={'light'}>Add Unassigned Root</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <DtoUiListSome
              entityIdList={currentState}
              entityClass={EntityClassMap.workSchemaNode}
              whileLoading={() => <Loader />}
              renderAs={UnassignedRootButton}
            />
          </Popover.Dropdown>
        </Popover>
      </Panel>
      {reactFlowProps.nodes.length === 0 && <AddRootNode />}
      {children}
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <FlowOverlay {...flowOverlayProps} />
    </ReactFlow>
  );
}

const ModalMemo = {
  memoizedFunction: WorkSchemaNodeDetailsContent
};

// 2. Define the Edge types and their components
const edgeTypes = {
  default: LeftToRightEdge
};

const TemplateWorkSchemaNode: DataNodeDto<WorkSchemaNodeDto> = {
  data: {
    id: 0,
    name: 'Work Schema Node',
    dominanceFactor: 1,
    priority: 1,
    childrenAs: 'BUNDLE',
    resolutionMode: 'OPEN'
  },
  id: 0
};

export const templateWorkSchemaNodeLink: DataLink<WorkSchemaNodeDto> = {
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
