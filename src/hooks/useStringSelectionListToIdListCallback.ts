import { HasIdClass } from '@/api/types';
import { DispatchState } from '@/types';
import { Identifier } from 'dto-stores';
import { useCallback } from 'react';
import { isNotUndefined } from '@/api/main';

export function useStringSelectionListToIdListCallback<T extends HasIdClass>(
  selectableMap: Map<string, T>,
  dispatchIdList: DispatchState<Identifier[]>
) {
  return useCallback(
    (selection: string | string[] | null) => {
      let stringList = [] as string[];
      if (typeof selection === 'string') {
        stringList.push(selection);
      } else if (Array.isArray(selection)) {
        stringList = selection;
      }
      const nextSelection: Identifier[] = stringList
        .map((label) => selectableMap.get(label))
        .map((item) => item?.id)
        .filter(isNotUndefined);
      dispatchIdList(nextSelection);
    },
    [selectableMap, dispatchIdList]
  );
}
