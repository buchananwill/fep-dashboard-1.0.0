import { HasIdClass } from '@/api/types';
import { useMemo } from 'react';
import { Identifier } from 'dto-stores';

export function useValueListValueMapAndIdMap<T extends HasIdClass>(
  masterList: T[],
  getLabel: (item?: T) => string
) {
  return useMemo(() => {
    const selectableMap = new Map<string, T>();
    const idMap = new Map<Identifier, T>();
    masterList.forEach((item) => {
      const label = getLabel(item);
      if (selectableMap.has(label))
        throw Error(
          'Duplicate label found for chosen key. Use unique identifying label'
        );
      selectableMap.set(label, item);
      idMap.set(item.id, item);
    });
    return { labelList: [...selectableMap.keys()], selectableMap, idMap };
  }, [getLabel, masterList]);
}