import { HasNumberId } from '@/api/types';
import { DataNode } from 'react-d3-force-wrapper';
import { useMemo } from 'react';
import { FlowNode } from '@/react-flow/types';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema_';

export function useIdToNodeMapMemo<T extends HasNumberId>(
  dataNodeList: DataNode<T>[]
) {
  return useMemo(() => {
    const map = new Map<string, DataNode<T>>();
    dataNodeList.forEach((node) => map.set(node.id, node as DataNode<T>));
    return map;
  }, [dataNodeList]);
}
