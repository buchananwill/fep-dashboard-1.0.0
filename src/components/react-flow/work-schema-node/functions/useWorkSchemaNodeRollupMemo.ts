import { DataNode } from 'react-d3-force-wrapper';
import { WorkSchemaDto } from '@/api/generated-types/generated-types_';
import { useMemo } from 'react';
import { resolveNodeAllocation } from '@/components/react-flow/work-schema-node/functions/resolveNodeAllocation';
import { AllocationRollup } from '@/components/react-flow/work-schema-node/functions/useLeafNodeRollUpListener';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';

export function useWorkSchemaNodeRollupMemo(
  nodesFromContext: DataNode<WorkSchemaNodeDto>[],
  leafToSchemaMap: Map<string, WorkSchemaDto>,
  idToChildIdMap: Map<string, Set<string>>,
  idToNodeMap: Map<string, DataNode<WorkSchemaNodeDto>>
) {
  let allocationRollupEntities: AllocationRollup[];
  allocationRollupEntities = useMemo(() => {
    const rootNodes = nodesFromContext.filter((node) => {
      return !idToChildIdMap.values().some((set) => set.has(node.id));
    });
    const maps = rootNodes.map((rootNode) => {
      return resolveNodeAllocation(
        rootNode,
        rootNode.data.childrenAs !== 'CAROUSEL',
        {
          readLeafSchema: (id: string) => leafToSchemaMap.get(id),
          idToChildIdMap,
          idToNodeMap
        }
      );
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
