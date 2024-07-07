'use client';
import { useIdToNodeMapMemo } from '@/react-flow/hooks/useIdToNodeMapMemo';
import { useIdToEdgeMapMemo } from '@/react-flow/hooks/useIdToEdgeMapMemo';
import { useIdToChildIdMapMemo } from '@/react-flow/hooks/useIdToChildIdMapMemo';
import { useGlobalController } from 'selective-context';
import { EmptyArray, InitialMap } from 'dto-stores';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useWorkSchemaNodeRollupMemo } from '@/components/react-flow/work-schema-node/useWorkSchemaNodeRollupMemo';
import { DataLink, DataNode } from 'react-d3-force-wrapper';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import { RollupUpdater } from '@/components/react-flow/work-schema-node/RollupUpdater';
import WorkSchemaNodeLeafController from '@/app/service-categories/[id]/[levelOrdinal]/work-schema-node-assignments/_components/WorkSchemaNodeLeafController';

export default function WorkSchemaNodeManager({
  nodeList,
  linkList
}: {
  nodeList: DataNode<WorkSchemaNodeDto>[];
  linkList: DataLink<WorkSchemaNodeDto>[];
}) {
  const idToNodeMap = useIdToNodeMapMemo(nodeList);
  const idToEdgeMap = useIdToEdgeMapMemo(linkList);
  const idToChildIdMap = useIdToChildIdMapMemo(linkList);
  const { currentState: leafToSchemaMap } = useGlobalController({
    contextKey: 'leafToSchemaMap',
    listenerKey: 'controller',
    initialValue: InitialMap as Map<string, WorkProjectSeriesSchemaDto>
  });

  const allocationRollupEntities = useWorkSchemaNodeRollupMemo(
    nodeList,
    leafToSchemaMap,
    idToChildIdMap,
    idToNodeMap
  );

  return (
    <>
      {nodeList.map((node) => (
        <WorkSchemaNodeLeafController node={node} key={node.id} />
      ))}
      <RollupUpdater allocationRollupEntities={allocationRollupEntities} />
    </>
  );
}
