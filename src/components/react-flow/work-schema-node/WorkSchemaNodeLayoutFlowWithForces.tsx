'use client';

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import {
  Background,
  BackgroundVariant,
  Connection,
  Panel,
  ReactFlow
} from '@xyflow/react';
import { FlowOverlay } from '@/components/react-flow/generic/components/generic/FlowOverlay';

import {
  DataLink,
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
import { WorkSchemaNodeDto as WSNimport } from '@/api/zod-schemas/WorkSchemaNodeDtoSchema_';
import {
  determineLocalResolution,
  validateHierarchy,
  validateWorkSchemaNodeDataNodeDto,
  workSchemaNodeCloneFunctionWrapper,
  workSchemaNodeGraphUpdater
} from '@/components/react-flow/work-schema-node/workSchemaNodeCallbacks';
import { convertToWorkSchemaFlowNode } from '@/components/react-flow/generic/utils/adaptors';
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
import { FlowNode, NodeValidator } from '@/components/react-flow/generic/types';
import { CarouselDto } from '@/api/generated-types/generated-types';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { getIdFromLinkReference } from 'react-d3-force-wrapper/dist/editing/functions/resetLinks';
import { recalculateDepths } from '@/components/react-flow/work-schema-node/recalculateDepths';
import { UnassignedRootButton } from '@/components/react-flow/work-schema-node/UnassignedRootButton';
import { useGlobalController } from 'selective-context';
import { RollupUpdater } from '@/components/react-flow/work-schema-node/RollupUpdater';
import { useIdToNodeMapMemo } from '@/components/react-flow/generic/hooks/useIdToNodeMapMemo';
import { useIdToEdgeMapMemo } from '@/components/react-flow/generic/hooks/useIdToEdgeMapMemo';
import { useIdToChildIdMapMemo } from '@/components/react-flow/generic/hooks/useIdToChildIdMapMemo';
import { useWorkSchemaNodeRollupMemo } from '@/components/react-flow/work-schema-node/useWorkSchemaNodeRollupMemo';
import { LeftToRightEdge } from '@/components/react-flow/generic/components/edges/LeftToRightEdge';
import { useHierarchicalDataLayoutMemo } from '@/components/react-flow/generic/hooks/useHierarchicalDataLayoutMemo';
import { HierarchicalDataOptions } from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';
import {
  hierarchicalLayoutMap,
  Layoutable
} from '@/components/react-flow/generic/hooks/useForces';
import { Simplify } from 'type-fest';

type WorkSchemaNodeDto = Simplify<WSNimport>;

export const AllocationRollupEntityClass = 'AllocationRollup';

const options: HierarchicalDataOptions = {
  nodeSize: [50, 400],
  orientation: 'horizontal'
};

export function usePreComputedPositionForce(
  layoutMemo: Map<string, Layoutable>
) {
  const layoutMemoRef = useRef(InitialMap as Map<string, Layoutable>);

  layoutMemoRef.current = layoutMemo;

  useGlobalController({
    contextKey: hierarchicalLayoutMap,
    listenerKey: 'workSchemaNodeLayout',
    initialValue: layoutMemoRef
  });
}

export function useHierarchicalTreeLayout(
  idToChildIdMap: Map<string, Set<string>>
) {
  const [layoutMemo] = useHierarchicalDataLayoutMemo(idToChildIdMap, options);
  usePreComputedPositionForce(layoutMemo as Map<string, Layoutable>);
}

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

  const { toggle, running } = flowOverlayProps;
  const runningRef = useRef(running);
  runningRef.current = running;

  const checkToggleFirstAndAfter = useCallback(() => {
    console.log('checking toggle');
    if (runningRef.current && toggle) {
      console.log('sim is running');
      toggle();
      console.log('current running status: ', runningRef.current);
    }
  }, [toggle]);

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

  const interceptedOnConnect = useCallback(
    (connection: Connection) => {
      checkToggleFirstAndAfter();
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
    [
      onConnect,
      idToNodeMap,
      readAnyCarousel,
      dispatchNodes,
      idToChildIdMap,
      checkToggleFirstAndAfter
    ]
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
