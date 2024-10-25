import { HasIdClass } from '@/api/types';
import { useMemo } from 'react';
import { Identifier } from 'dto-stores';
import { SimpleSelectable } from '@/components/generic/MultiSelect';

export function useSimpleSelectableListMapAndIdMap<T extends HasIdClass>(
  masterList: T[],
  getLabel: (item?: T) => string
) {
  return useMemo(() => {
    const selectableMap = new Map<string, T>();
    const idMap = new Map<Identifier, T>();
    const selectableList: SimpleSelectable[] = [];
    masterList.forEach((item) => {
      const label = getLabel(item);
      const value = String(item.id);
      if (selectableMap.has(label))
        throw Error(
          'Duplicate label found for chosen key. Use unique identifying label'
        );
      selectableMap.set(value, item);
      idMap.set(item.id, item);
      selectableList.push({ value, label });
    });
    return { selectableList, selectableMap, idMap };
  }, [getLabel, masterList]);
}