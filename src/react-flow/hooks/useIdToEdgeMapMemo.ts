import { HasNumberId } from '@/api/types';
import { DataLink } from 'react-d3-force-wrapper';
import { useMemo } from 'react';

export function useIdToEdgeMapMemo<T extends HasNumberId>(
  dataLinkList: DataLink<T>[]
) {
  return useMemo(() => {
    const map = new Map<string, DataLink<T>>();
    dataLinkList.forEach((edge) => map.set(edge.id, edge as DataLink<T>));
    return map;
  }, [dataLinkList]);
}
