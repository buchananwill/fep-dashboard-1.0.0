import { HasNumberId } from '@/api/types';
import { DataLink } from 'react-d3-force-wrapper';
import { useMemo } from 'react';
import { getIdFromLinkReference } from 'react-d3-force-wrapper/dist/editing/functions/resetLinks';

export function useIdToChildIdMapMemo<T extends HasNumberId>(
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