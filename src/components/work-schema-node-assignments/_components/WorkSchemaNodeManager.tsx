'use client';
import { useIdToNodeMapMemo } from '@/react-flow/hooks/useIdToNodeMapMemo';
import { useIdToEdgeMapMemo } from '@/react-flow/hooks/useIdToEdgeMapMemo';
import { useIdToChildIdMapMemo } from '@/react-flow/hooks/useIdToChildIdMapMemo';
import { useGlobalController } from 'selective-context';
import { EditAddDeleteDtoControllerArray, InitialMap } from 'dto-stores';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useWorkSchemaNodeRollupMemo } from '@/components/react-flow/work-schema-node/useWorkSchemaNodeRollupMemo';
import { DataLink, DataNode } from 'react-d3-force-wrapper';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema_';
import { RollupUpdater } from '@/components/react-flow/work-schema-node/RollupUpdater';
import WorkSchemaNodeLeafController from '@/components/work-schema-node-assignments/_components/WorkSchemaNodeLeafController';
import React, { memo, useMemo, useRef } from 'react';
import { isEqual } from 'lodash';
import { AllocationRollupEntityClass } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';

export default function WorkSchemaNodeManager({
  nodeList,
  linkList
}: {
  nodeList: DataNode<WorkSchemaNodeDto>[];
  linkList: DataLink<WorkSchemaNodeDto>[];
}) {
  const nodeListRef = useRef(nodeList);
  const linkListRef = useRef(linkList);

  const { memoNodes, memoLinks } = useMemo(() => {
    console.log('Checking lists.');
    const nodesMatch = nodeList.every((nodeDto) => {
      const oldNode = nodeListRef.current.find(
        (prevNode) => prevNode.id === nodeDto.id
      );
      const equal = isEqual(nodeDto, oldNode);
      if (!equal) console.log('Node changed.');
      return equal;
    });
    const linksMatch = linkList.every((linkDto) => {
      const oldLink = linkListRef.current.find(
        (prevLink) => prevLink.id === linkDto.id
      );
      const equal = isEqual(linkDto, oldLink);
      if (!equal) console.log('Link changed.');
      return equal;
    });
    if (nodesMatch && linksMatch)
      return { memoNodes: nodeListRef.current, memoLinks: linkListRef.current };
    else {
      nodeListRef.current = nodeList;
      linkListRef.current = linkList;
      return { memoNodes: nodeList, memoLinks: linkList };
    }
  }, [nodeList, linkList]);

  const idToNodeMap = useIdToNodeMapMemo(memoNodes);
  const idToEdgeMap = useIdToEdgeMapMemo(memoLinks);
  const idToChildIdMap = useIdToChildIdMapMemo(memoLinks);
  const { currentState: leafToSchemaMap } = useGlobalController({
    contextKey: 'leafToSchemaMap',
    listenerKey: 'controller',
    initialValue: InitialMap as Map<string, WorkProjectSeriesSchemaDto>
  });

  const allocationRollupEntities = useWorkSchemaNodeRollupMemo(
    memoNodes,
    leafToSchemaMap,
    idToChildIdMap,
    idToNodeMap
  );

  const LeafControllers = useMemo(() => {
    return memoNodes.map((node) => (
      <MemoWorkSchemaNodeLeafController node={node} key={node.id} />
    ));
  }, [memoNodes]);

  // const dispatchMasterList = NamespacedHooks.useDispatch(
  //   AllocationRollupEntityClass,
  //   KEY_TYPES.MASTER_LIST
  // );
  //
  // useEffectSyncDeepEqualWithDispatch(
  //   allocationRollupEntities,
  //   dispatchMasterList
  // );

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={AllocationRollupEntityClass}
        dtoList={allocationRollupEntities}
        mergeInitialWithProp={false}
      />
      {...LeafControllers}
      <MemoRollupUpdater allocationRollupEntities={allocationRollupEntities} />
    </>
  );
}

const MemoRollupUpdater = memo(RollupUpdater);
const MemoWorkSchemaNodeLeafController = memo(WorkSchemaNodeLeafController);
