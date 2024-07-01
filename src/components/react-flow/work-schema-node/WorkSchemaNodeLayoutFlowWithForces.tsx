'use client';

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition
} from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  getOutgoers,
  Panel
} from 'reactflow';

import { EdgeWithDelete } from '@/react-flow/components/edges/EdgeWithDelete';
import { FlowOverlay } from '@/react-flow/components/generic/FlowOverlay';

import {
  DataLink,
  DataNodeDto,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  useDirectSimRefEditsDispatch,
  useGraphDispatch,
  useModalContent,
  useNodeLabelController
} from 'react-d3-force-wrapper';
import { AddRootNode } from '@/react-flow/components/nodes/AddRootNode';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { useEditableFlow } from '@/react-flow/hooks/useEditableFlow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import {
  determineLocalAllocation,
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
  BaseLazyDtoUiProps,
  DtoUiListSome,
  NamespacedHooks,
  useReadAnyDto
} from 'dto-stores';
import { EmptyArray } from '@/api/literals';
import { Spinner } from '@nextui-org/spinner';
import { Api } from '@/api/clientApi';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import { FlowEdge, FlowNode } from '@/react-flow/types';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { getIdFromLinkReference } from 'react-d3-force-wrapper/dist/editing/functions/resetLinks';
import { recalculateDepths } from '@/components/react-flow/work-schema-node/recalculateDepths';

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
    validateWorkSchemaNodeDataNodeDto
  );

  const { nodesFromContext, edgesFromContext } = contextData;

  const idToNodeMap = useMemo(() => {
    const map = new Map<string, FlowNode<WorkSchemaNodeDto>>();
    nodesFromContext.forEach((node) =>
      map.set(node.id, node as FlowNode<WorkSchemaNodeDto>)
    );
    return map;
  }, [nodesFromContext]);

  const idToEdgeMap = useMemo(() => {
    const map = new Map<string, FlowEdge<WorkSchemaNodeDto>>();
    edgesFromContext.forEach((edge) =>
      map.set(edge.id, edge as FlowEdge<WorkSchemaNodeDto>)
    );
    return map;
  }, [edgesFromContext]);

  const idToChildIdMap = useMemo(() => {
    const responseMap = new Map<string, Set<string>>();
    nodesFromContext.forEach((node) => {
      const idList = getOutgoers(
        node as FlowNode<WorkSchemaNodeDto>,
        nodesFromContext as FlowNode<WorkSchemaNodeDto>[],
        edgesFromContext as FlowEdge<WorkSchemaNodeDto>[]
      ).map((innerNode) => innerNode.id);
      responseMap.set(node.id, new Set(idList));
    });
    return responseMap;
  }, [edgesFromContext, nodesFromContext]);

  const readAnyOption = useReadAnyDto<CarouselOptionDto>(
    EntityClassMap.carousel
  );
  const readAnySchema = useReadAnyDto<WorkProjectSeriesSchemaDto>(
    EntityClassMap.carousel
  );

  const idToRollupTotalMap = useMemo(() => {
    const responseMap = new Map<string, number>();
    nodesFromContext.forEach((node) => {
      const { data } = node;
      const { resolutionMode } = data;
      if (['LEAF', 'CAROUSEL_OPTION'].includes(resolutionMode)) {
        responseMap.set(
          node.id,
          determineLocalAllocation(data, readAnySchema, readAnyOption)
        );
      } else if (resolutionMode === 'CAROUSEL') {
      } else {
      }
    });
    return responseMap;
  }, [nodesFromContext, readAnyOption, readAnySchema]);

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
              targetNodeList.push(targetNode);
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
        const interceptToValidateResolutionMode = (
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

        return { memoizedFunction: interceptToValidateResolutionMode };
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

export function UnassignedRootButton({
  entity
}: BaseLazyDtoUiProps<WorkSchemaNodeDto>) {
  const { dispatchNextSimVersion, nodeListRef, linkListRef } =
    useDirectSimRefEditsDispatch(`unassignedRootNode${entity.id}`);
  const [loaded, setLoaded] = useState(false);
  const [pending, startTransition] = useTransition();

  const onPress = useCallback(
    () =>
      startTransition(async () => {
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
        setLoaded(true);
      }),
    [nodeListRef, linkListRef, dispatchNextSimVersion, entity.id]
  );

  return (
    <Button
      onPress={onPress}
      isDisabled={loaded || pending}
      isLoading={pending}
    >
      WorkSchemaNode: {entity.name ?? entity.id}
    </Button>
  );
}
