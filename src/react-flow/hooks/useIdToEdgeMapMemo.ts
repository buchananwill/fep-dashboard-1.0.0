import { HasNumberId } from '@/api/types';
import { DataLink } from 'react-d3-force-wrapper';
import { useMemo } from 'react';
import { FlowEdge } from '@/react-flow/types';

export function useIdToEdgeMapMemo<T extends HasNumberId>(
  edgesFromContext: DataLink<T>[]
) {
  return useMemo(() => {
    const map = new Map<string, DataLink<T>>();
    edgesFromContext.forEach((edge) => map.set(edge.id, edge as FlowEdge<T>));
    return map;
  }, [edgesFromContext]);
}