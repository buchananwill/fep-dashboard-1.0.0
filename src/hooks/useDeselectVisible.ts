import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { DispatchState } from '@/types';
import { MutableRefObject, useCallback } from 'react';

export function useDeselectVisible<T extends HasIdClass<Identifier>>(
  dispatchSelected: DispatchState<Identifier[]>,
  visibleItemsRef: MutableRefObject<T[]>
) {
  return useCallback(() => {
    dispatchSelected((selectionList) => {
      const newSelectionSet = new Set(selectionList);
      visibleItemsRef.current.forEach((entityItem) =>
        newSelectionSet.delete(entityItem.id)
      );
      return [...newSelectionSet.values()];
    });
  }, [dispatchSelected, visibleItemsRef]);
}
export function useSelectVisible<T extends HasIdClass<Identifier>>(
  dispatchSelected: DispatchState<Identifier[]>,
  visibleItemsRef: MutableRefObject<T[]>
) {
  return useCallback(() => {
    dispatchSelected((selectionList) => {
      const newSelectionSet = new Set(selectionList);
      visibleItemsRef.current.forEach((entityItem) =>
        newSelectionSet.add(entityItem.id)
      );
      return [...newSelectionSet.values()];
    });
  }, [dispatchSelected, visibleItemsRef]);
}
