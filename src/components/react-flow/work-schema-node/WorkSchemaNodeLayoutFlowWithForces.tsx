'use client';

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo
} from 'react';
import {
  Background,
  BackgroundVariant,
  Connection,
  Panel,
  ReactFlow
} from '@xyflow/react';
import { FlowOverlay } from '@/react-flow/components/generic/FlowOverlay';

import {
  DataLink,
  DataNodeDto,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  useGraphDispatch,
  useModalContent,
  useNodeLabelController
} from 'react-d3-force-wrapper';
import { AddRootNode } from '@/react-flow/components/nodes/AddRootNode';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { useEditableFlow } from '@/react-flow/hooks/useEditableFlow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema_';
import {
  determineLocalResolution,
  validateHierarchy,
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
  DtoUiListSome,
  EditAddDeleteDtoControllerArray,
  InitialMap,
  NamespacedHooks,
  useReadAnyDto
} from 'dto-stores';
import { EmptyArray } from '@/api/literals';
import { Spinner } from '@nextui-org/spinner';
import { FlowNode, NodeValidator } from '@/react-flow/types';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { getIdFromLinkReference } from 'react-d3-force-wrapper/dist/editing/functions/resetLinks';
import { recalculateDepths } from '@/components/react-flow/work-schema-node/recalculateDepths';
import { UnassignedRootButton } from '@/components/react-flow/work-schema-node/UnassignedRootButton';
import { useGlobalController } from 'selective-context';
import { RollupUpdater } from '@/components/react-flow/work-schema-node/RollupUpdater';
import { useIdToNodeMapMemo } from '@/react-flow/hooks/useIdToNodeMapMemo';
import { useIdToEdgeMapMemo } from '@/react-flow/hooks/useIdToEdgeMapMemo';
import { useIdToChildIdMapMemo } from '@/react-flow/hooks/useIdToChildIdMapMemo';
import { useWorkSchemaNodeRollupMemo } from '@/components/react-flow/work-schema-node/useWorkSchemaNodeRollupMemo';
import { LeftToRightEdge } from '@/react-flow/components/edges/LeftToRightEdge';
import { AllocationRollup } from '@/components/react-flow/work-schema-node/useLeafNodeRollUpListener';

export const AllocationRollupEntityClass = 'AllocationRollup';

export function WorkSchemaNodeLayoutFlowWithForces({
  children
}: PropsWithChildren) {
  // 4. Call the hook to set up the layout with forces
  const {
    flowOverlayProps,
    isPending,
    reactFlowProps,
    contextData,
    dispatchNodes
  } = useEditableFlow<WorkSchemaNodeDto>(
    workSchemaNodeCloneFunctionWrapper,
    templateWorkSchemaFlowNode,
    templateWorkSchemaNodeLink,
    workSchemaNodeGraphUpdater,
    convertToWorkSchemaFlowNode,
    EntityClassMap.workSchemaNode,
    validateWorkSchemaNodeDataNodeDto as NodeValidator<WorkSchemaNodeDto>
  );

  const { nodesFromContext, edgesFromContext } = contextData;

  const idToNodeMap = useIdToNodeMapMemo(nodesFromContext);
  const idToEdgeMap = useIdToEdgeMapMemo(edgesFromContext);
  const idToChildIdMap = useIdToChildIdMapMemo(edgesFromContext);
  const { currentState: leafToSchemaMap } = useGlobalController({
    contextKey: 'leafToSchemaMap',
    listenerKey: 'controller',
    initialValue: InitialMap as Map<string, WorkProjectSeriesSchemaDto>
  });

  const allocationRollupEntities = useWorkSchemaNodeRollupMemo(
    nodesFromContext,
    leafToSchemaMap,
    idToChildIdMap,
    idToNodeMap
  );

  const { onConnect, ...otherProps } = reactFlowProps;

  const readAnyCarousel = useReadAnyDto<CarouselDto>(EntityClassMap.carousel);

  const interceptedOnConnect = useCallback(
    (connection: Connection) => {
      const { source, target } = connection;
      if (source && target) {
        const nodeSource = idToNodeMap.get(source);
        const nodeTarget = idToNodeMap.get(target);

        const validation =
          nodeTarget?.distanceFromRoot === 0 &&
          validateHierarchy(
            nodeSource?.data,
            nodeTarget?.data,
            readAnyCarousel
          );
        if (validation && nodeSource && nodeTarget) {
          onConnect(connection);
          dispatchNodes((prevNodes) =>
            recalculateDepths(
              prevNodes,
              nodeTarget,
              idToChildIdMap,
              idToNodeMap,
              nodeSource.distanceFromRoot
            )
          );
        }
      }
    },
    [onConnect, idToNodeMap, readAnyCarousel, dispatchNodes, idToChildIdMap]
  );

  const { dispatchWithoutListen: dispatchDeleteLinksFunction } =
    useGraphDispatch<MemoizedFunction<string[], void>>(
      GraphSelectiveContextKeys.deleteLinks
    );

  useEffect(() => {
    dispatchDeleteLinksFunction(({ memoizedFunction }) => {
      const interceptAndUpdateDepth = (linkIds: string[]) => {
        memoizedFunction(linkIds);
        const targetNodeList: FlowNode<WorkSchemaNodeDto>[] = [];
        linkIds.forEach((linkId) => {
          const edge = idToEdgeMap.get(linkId);
          if (edge) {
            const idFromLinkReference = getIdFromLinkReference(edge.target);
            const targetNode = idToNodeMap.get(idFromLinkReference);
            if (targetNode) {
              targetNodeList.push(targetNode as FlowNode<WorkSchemaNodeDto>);
            }
          }
        });
        targetNodeList.forEach((targetNode) => {
          dispatchNodes((prevNodes) =>
            recalculateDepths(
              prevNodes,
              targetNode,
              idToChildIdMap,
              idToNodeMap,
              -1
            )
          );
        });
      };
      return { memoizedFunction: interceptAndUpdateDepth };
    });
  }, [
    dispatchDeleteLinksFunction,
    idToNodeMap,
    dispatchNodes,
    idToChildIdMap,
    idToEdgeMap
  ]);

  const { dispatchWithoutListen } = useGraphDispatch<
    MemoizedFunction<WorkSchemaNodeDto, void>
  >(GraphSelectiveContextKeys.editNodeData);

  useEffect(() => {
    dispatchWithoutListen(
      (prevFunction: MemoizedFunction<WorkSchemaNodeDto, void>) => {
        const { memoizedFunction } = prevFunction;
        const interceptValidateResolutionMode = (
          updatedNode: WorkSchemaNodeDto
        ) => {
          const localResolution = determineLocalResolution(updatedNode);
          let interceptedNode = updatedNode;
          if (localResolution !== updatedNode.resolutionMode) {
            interceptedNode = {
              ...updatedNode,
              resolutionMode: localResolution
            };
          }
          return memoizedFunction(interceptedNode);
        };

        return { memoizedFunction: interceptValidateResolutionMode };
      }
    );
  }, [dispatchWithoutListen]);

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
      <RollupUpdater allocationRollupEntities={allocationRollupEntities} />
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
              renderAs={UnassignedRootButton}
            />
          </PopoverContent>
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
