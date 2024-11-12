import { HasNumberId } from '@/api/types';
import { DataLink } from 'react-d3-force-wrapper';
import { useMemo } from 'react';
import { createIdToChildIdMap } from '@/components/react-flow/generic/hooks/hierarchy-transforms';

export function useIdToChildIdMapMemo<T extends HasNumberId>(
  dataLinkList: DataLink<T>[]
) {
  return useMemo(() => {
    return createIdToChildIdMap(dataLinkList);
  }, [dataLinkList]);
}
