import { Dispatch, Key, SetStateAction, useCallback } from 'react';

export function useListboxSelectionChangeCallback<T>(
  dispatchWithoutControl: Dispatch<SetStateAction<T>>,
  updateKeys: (updatedKeys: string[], collection: T) => T
) {
  return useCallback(
    (key: Set<Key> | 'all') => {
      dispatchWithoutControl((bundle) => {
        const updatedKeys = [...key].map((nextKey) => `${nextKey}`);
        return updateKeys(updatedKeys, bundle);
      });
    },
    [dispatchWithoutControl, updateKeys]
  );
}