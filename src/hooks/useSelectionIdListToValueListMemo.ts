import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { useMemo } from 'react';

export function useSelectionIdListToValueListMemo<T extends HasIdClass>(
  selectedIdList: Identifier[],
  idMap: Map<Identifier, T>,
  getValue: (item?: T) => string
) {
  return useMemo(() => {
    return selectedIdList.map((id) => idMap.get(id)).map(getValue);
  }, [selectedIdList, getValue, idMap]);
}
