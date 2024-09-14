import React, { Key, useCallback } from 'react';

export function useListboxSelectionChangeCallback<T>(
  updateKeys: (updatedKeys: string[], collection: T) => T,
  dispatchWithoutControl?: React.Dispatch<React.SetStateAction<T>>
) {
  return useCallback(
    (keySet: Set<Key> | 'all') => {
      if (dispatchWithoutControl)
        dispatchWithoutControl((bundle) => {
          const updatedKeys = [...keySet].map((nextKey) => `${nextKey}`);
          return updateKeys(updatedKeys, bundle);
        });
    },
    [dispatchWithoutControl, updateKeys]
  );
}
