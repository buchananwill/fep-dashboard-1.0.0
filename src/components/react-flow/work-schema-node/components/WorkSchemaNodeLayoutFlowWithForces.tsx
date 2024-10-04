'use client';

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo
} from 'react';
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
  determineLocalResolution,
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
import { FlowNode, NodeValidator } from '@/components/react-flow/generic/types';
import {
  CarouselDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types';
import { getIdFromLinkReference } from 'react-d3-force-wrapper/dist/editing/functions/resetLinks';
import { recalculateDepths } from '@/components/react-flow/generic/utils/recalculateDepths';
import { UnassignedRootButton } from '@/components/react-flow/work-schema-node/components/UnassignedRootButton';
import { useGlobalController } from 'selective-context';
import { RollupUpdater } from '@/components/react-flow/work-schema-node/components/RollupUpdater';
import { useIdToNodeMapMemo } from '@/components/react-flow/generic/hooks/useIdToNodeMapMemo';
import { useIdToEdgeMapMemo } from '@/components/react-flow/generic/hooks/useIdToEdgeMapMemo';
import { useIdToChildIdMapMemo } from '@/components/react-flow/generic/hooks/useIdToChildIdMapMemo';
import { useWorkSchemaNodeRollupMemo } from '@/components/react-flow/work-schema-node/functions/useWorkSchemaNodeRollupMemo';
import { LeftToRightEdge } from '@/components/react-flow/generic/components/edges/LeftToRightEdge';
import { useValidateAndUpdateDepth } from '@/components/react-flow/generic/hooks/useValidateAndUpdateDepth';
import { useCheckToggleFirstAndAfter } from '@/components/react-flow/generic/hooks/useCheckToggleFirstAndAfter';
import { useHierarchicalTreeLayout } from '@/components/react-flow/generic/hooks/useHierarchicalTreeLayout';

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
  const checkToggleFirstAndAfter =
    useCheckToggleFirstAndAfter(flowOverlayProps);

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
  useHierarchicalTreeLayout(idToChildIdMap);

  const { onConnect, ...otherProps } = reactFlowProps;

  const readAnyCarousel = useReadAnyDto<CarouselDto>(EntityClassMap.carousel);

  const validateWorkSchemaNodeHierarchy = useCallback(
    (
      source: DataNode<WorkSchemaNodeDto> | undefined,
      target: DataNode<WorkSchemaNodeDto> | undefined
    ) => {
      return validateHierarchy(source?.data, target?.data, readAnyCarousel);
    },
    [readAnyCarousel]
  );

  const interceptedOnConnect = useValidateAndUpdateDepth(
    checkToggleFirstAndAfter,
    idToNodeMap,
    onConnect,
    dispatchNodes,
    idToChildIdMap,
    validateWorkSchemaNodeHierarchy
  );

  const { dispatchWithoutListen: dispatchDeleteLinksFunction } =
    useGraphDispatch<MemoizedFunction<string[], void>>(
      GraphSelectiveContextKeys.deleteLinks
    );

  useEffect(() => {
    dispatchDeleteLinksFunction(({ memoizedFunction }) => {
      checkToggleFirstAndAfter();
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
    checkToggleFirstAndAfter,
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
        checkToggleFirstAndAfter();
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
  }, [dispatchWithoutListen, checkToggleFirstAndAfter]);

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
