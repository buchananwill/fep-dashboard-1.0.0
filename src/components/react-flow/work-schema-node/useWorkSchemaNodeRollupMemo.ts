import { DataNode } from 'react-d3-force-wrapper';
import { WorkSchemaNodeDto } from '@/api/generated-types/generated-types';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { useMemo } from 'react';
import { resolveNodeAllocation } from '@/components/react-flow/work-schema-node/resolveNodeAllocation';
import { AllocationRollup } from '@/components/react-flow/work-schema-node/useLeafNodeRollUpListener';

export function useWorkSchemaNodeRollupMemo(
  nodesFromContext: DataNode<WorkSchemaNodeDto>[],
  leafToSchemaMap: Map<string, WorkProjectSeriesSchemaDto>,
  idToChildIdMap: Map<string, Set<string>>,
  idToNodeMap: Map<string, DataNode<WorkSchemaNodeDto>>
) {
  let allocationRollupEntities: AllocationRollup[];
  allocationRollupEntities = useMemo(() => {
    const rootNodes = nodesFromContext.filter(
      (node) => node.distanceFromRoot === 0
    );
    const maps = rootNodes.map((rootNode) => {
      return resolveNodeAllocation(rootNode, rootNode.data.allowBundle, {
        readLeafSchema: (id: string) => leafToSchemaMap.get(id),
        idToChildIdMap,
        idToNodeMap
      });
    });

    return maps
      .map((allocationMap) =>
        [...allocationMap.entries()].map(([id, allocationRollup]) => ({
          id,
          allocationRollup
        }))
      )
      .reduce((prev, curr) => [...prev, ...curr], []);
  }, [idToNodeMap, idToChildIdMap, nodesFromContext, leafToSchemaMap]);
  return allocationRollupEntities;
}
