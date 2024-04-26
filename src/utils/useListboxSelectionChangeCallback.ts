import React, { Dispatch, Key, SetStateAction, useCallback } from 'react';

export function useListboxSelectionChangeCallback<T>(
  updateKeys: (updatedKeys: string[], collection: T) => T,
  dispatchWithoutControl?: React.Dispatch<React.SetStateAction<T>>
) {
  return useCallback(
    (key: Set<Key> | 'all') => {
      if (dispatchWithoutControl)
        dispatchWithoutControl((bundle) => {
          const updatedKeys = [...key].map((nextKey) => `${nextKey}`);
          return updateKeys(updatedKeys, bundle);
        });
    },
    [dispatchWithoutControl, updateKeys]
  );
}
