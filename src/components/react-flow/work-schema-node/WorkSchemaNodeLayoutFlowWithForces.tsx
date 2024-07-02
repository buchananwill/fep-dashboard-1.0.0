'use client';

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo
} from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Panel
} from 'reactflow';

import { EdgeWithDelete } from '@/react-flow/components/edges/EdgeWithDelete';
import { FlowOverlay } from '@/react-flow/components/generic/FlowOverlay';

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
import { AddRootNode } from '@/react-flow/components/nodes/AddRootNode';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { useEditableFlow } from '@/react-flow/hooks/useEditableFlow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
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
  Identifier,
  NamespacedHooks,
  useReadAnyDto,
  useWriteAnyDto
} from 'dto-stores';
import { EmptyArray } from '@/api/literals';
import { Spinner } from '@nextui-org/spinner';
import { FlowEdge, FlowNode } from '@/react-flow/types';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { getIdFromLinkReference } from 'react-d3-force-wrapper/dist/editing/functions/resetLinks';
import { recalculateDepths } from '@/components/react-flow/work-schema-node/recalculateDepths';
import { UnassignedRootButton } from '@/components/react-flow/work-schema-node/UnassignedRootButton';
import { HasNumberId } from '@/api/types';
import { isNotUndefined } from '@/api/main';
import { isEqual } from 'lodash';

function useIdToNodeMapMemo<T extends HasNumberId>(
  nodesFromContext: DataNode<T>[]
) {
  return useMemo(() => {
    const map = new Map<string, DataNode<T>>();
    nodesFromContext.forEach((node) =>
      map.set(node.id, node as FlowNode<WorkSchemaNodeDto>)
    );
    return map;
  }, [nodesFromContext]);
}

function useIdToEdgeMapMemo<T extends HasNumberId>(
  edgesFromContext: DataLink<T>[]
) {
  return useMemo(() => {
    const map = new Map<string, DataLink<T>>();
    edgesFromContext.forEach((edge) => map.set(edge.id, edge as FlowEdge<T>));
    return map;
  }, [edgesFromContext]);
}

function useIdToChildIdMapMemo<T extends HasNumberId>(
  edgesFromContext: DataLink<T>[]
) {
  return useMemo(() => {
    const responseMap = new Map<string, Set<string>>();
    edgesFromContext.forEach((edge) => {
      const sourceId = getIdFromLinkReference(edge.source);
      const targetId = getIdFromLinkReference(edge.target);
      const childIdset = responseMap.get(sourceId) ?? new Set<string>();
      childIdset.add(targetId);
      responseMap.set(sourceId, childIdset);
    });

    return responseMap;
  }, [edgesFromContext]);
}

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
    validateWorkSchemaNodeDataNodeDto
  );

  const { nodesFromContext, edgesFromContext } = contextData;

  const idToNodeMap = useIdToNodeMapMemo(nodesFromContext);
  const idToEdgeMap = useIdToEdgeMapMemo(edgesFromContext);
  const idToChildIdMap = useIdToChildIdMapMemo(edgesFromContext);

  const readAnyOption = useReadAnyDto<CarouselOptionDto>(
    EntityClassMap.carouselOption
  );
  const readAnySchema = useReadAnyDto<WorkProjectSeriesSchemaDto>(
    EntityClassMap.workProjectSeriesSchema
  );

  const allocationRollupEntities = useMemo(() => {
    const responseMap = new Map<string, number>();
    const rootNodes = nodesFromContext.filter(
      (node) => node.distanceFromRoot === 0
    );
    const allocationEntities = rootNodes
      .map((rootNode) => {
        return resolveNodeAllocation(rootNode, rootNode.data.allowBundle, {
          readAnySchema,
          readAnyOption,
          idToChildIdMap,
          idToNodeMap
        });
      })
      .map((allocationMap) =>
        [...allocationMap.entries()].map(([id, allocationRollup]) => ({
          id,
          allocationRollup
        }))
      )
      .reduce((prev, curr) => [...prev, ...curr], []);
    console.log('in the memo:', allocationEntities);
    return allocationEntities;
  }, [
    idToNodeMap,
    idToChildIdMap,
    nodesFromContext,
    readAnyOption,
    readAnySchema
  ]);

  const writeAnyAllocationRollup = useWriteAnyDto<{
    id: Identifier;
    allocationRollup: number[];
  }>(AllocationRollupEntityClass);

  console.log(allocationRollupEntities);

  useEffect(() => {
    console.log(allocationRollupEntities);
    allocationRollupEntities.forEach((value, key) => {
      writeAnyAllocationRollup(value.id, (prevState) => {
        const rollupChanged = isEqual(
          prevState.allocationRollup,
          value.allocationRollup
        );
        console.log(rollupChanged);
        if (rollupChanged) {
          const updatedRollup = {
            ...prevState,
            allocationRollup: value.allocationRollup
          };
          console.log(updatedRollup);
          return updatedRollup;
        } else return prevState;
      });
    });
  }, [allocationRollupEntities, writeAnyAllocationRollup]);

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
      <EditAddDeleteDtoControllerArray
        entityClass={AllocationRollupEntityClass}
        dtoList={allocationRollupEntities}
        mergeInitialWithProp={true}
      />
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

interface GraphRollupData {
  readAnySchema: (id: Identifier) => WorkProjectSeriesSchemaDto | undefined;
  readAnyOption: (id: Identifier) => CarouselOptionDto | undefined;
  idToChildIdMap: Map<string, Set<string>>;
  idToNodeMap: Map<string, DataNode<WorkSchemaNodeDto>>;
}

function resolveNodeAllocation(
  node: DataNode<WorkSchemaNodeDto>,
  allowBundle: boolean,
  commonData: GraphRollupData
): Map<string, number[]> {
  const { readAnyOption, readAnySchema, idToChildIdMap, idToNodeMap } =
    commonData;
  const responseMap = new Map<string, number[]>();
  const { data, id } = node;
  const {
    workProjectSeriesSchemaId,
    carouselOptionId,
    resolutionMode,
    preferCarousel
  } = data;
  let schema: WorkProjectSeriesSchemaDto | undefined = undefined;
  let deliveryAllocationTokenList: number[] = [];

  // BASE CASES
  if (workProjectSeriesSchemaId) {
    schema = readAnySchema(workProjectSeriesSchemaId);
  } else if (carouselOptionId) {
    const option = readAnyOption(carouselOptionId);
    schema = option && readAnySchema(option.workProjectSeriesSchemaId);
  }
  if (schema) {
    deliveryAllocationTokenList = schema.deliveryAllocations
      .toSorted(
        (dev1, dev2) =>
          dev2.deliveryAllocationSize - dev1.deliveryAllocationSize
      )
      .map((devAl) =>
        Array.from({ length: devAl.count }, () => devAl.deliveryAllocationSize)
      )
      .reduce((prev, curr) => [...prev, ...curr], []);
  }

  function getChildrenRollupMap(
    childIdList: string[],
    propagatedBundlePermission: boolean
  ) {
    return childIdList
      .map((childId) => idToNodeMap.get(childId))
      .filter(isNotUndefined)
      .map((childNode) => {
        return resolveNodeAllocation(
          childNode,
          propagatedBundlePermission,
          commonData
        );
      })
      .reduce(
        (prevMap: Map<string, number[]>, currMap: Map<string, number[]>) => {
          currMap.forEach((value, key) => prevMap.set(key, value));
          return prevMap;
        },
        new Map<string, number[]>()
      );
  }

  const childIdSet = idToChildIdMap.get(id);
  const propagatedBundlePermission = resolutionMode === 'OPEN';

  if (childIdSet) {
    const childIdList = [...childIdSet.values()];
    const childrenRollupMap = getChildrenRollupMap(
      childIdList,
      propagatedBundlePermission
    );
    childrenRollupMap.forEach((value, key) => responseMap.set(key, value));
    // SERIAL OR OPEN RECURSION
    if (!preferCarousel) {
      deliveryAllocationTokenList = childIdList
        .map((childId) => childrenRollupMap.get(childId))
        .filter(isNotUndefined)
        .reduce((prev, curr) => [...prev, ...curr], [])
        .sort((a, b) => b - a);
    }

    // CAROUSEL RECURSION
    else {
      const childNumberLists = childIdList
        .map((childId) => childrenRollupMap.get(childId))
        .filter(isNotUndefined);
      let modification = childNumberLists.length > 0;
      while (modification) {
        let largestSize = 0;
        for (let childNumberList of childNumberLists) {
          if (childNumberList.length === 0) continue;
          const topNumber = childNumberList.splice(0, 1)[0];
          largestSize = Math.max(largestSize, topNumber);
        }
        modification = largestSize > 0;
        if (modification) {
          deliveryAllocationTokenList.push(largestSize);
        }
      }
    }
  }

  responseMap.set(id, deliveryAllocationTokenList);
  return responseMap;
}
