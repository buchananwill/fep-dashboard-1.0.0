import { HasNumberId } from '@/api/types';
import { DataNode } from 'react-d3-force-wrapper';
import { useMemo } from 'react';
import { FlowNode } from '@/react-flow/types';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';

export function useIdToNodeMapMemo<T extends HasNumberId>(
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