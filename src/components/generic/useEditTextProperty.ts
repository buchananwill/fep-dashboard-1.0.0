import { Dispatch, SetStateAction, useCallback } from 'react';
import { StringPropertyKey } from '@/types';

export function useEditTextProperty<T>(
  dispatchWithoutControl: Dispatch<SetStateAction<T>> | undefined,
  stringKey: StringPropertyKey<T> | undefined
) {
  return useCallback(
    (value: string) => {
      if (!dispatchWithoutControl || !stringKey) {
        console.error('no dispatch defined!');
        return;
      }
      dispatchWithoutControl((entityState: T) => {
        const updated: T = { ...entityState };
        (updated as any)[stringKey] = value;
        return updated;
      });
    },
    [dispatchWithoutControl, stringKey]
  );
}
