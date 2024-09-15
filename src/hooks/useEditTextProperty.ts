import { Dispatch, SetStateAction, useCallback } from 'react';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { updateNestedValue } from '@/functions/updateNestedValue';

export function useEditTextProperty<T>(
  dispatchWithoutControl: Dispatch<SetStateAction<T>> | undefined,
  stringPath: TypedPaths<T, string> | undefined
) {
  return useCallback(
    (value: string) => {
      if (!dispatchWithoutControl || !stringPath) {
        console.error('no dispatch defined!');
        return;
      }
      dispatchWithoutControl((entityState: T) => {
        return updateNestedValue(entityState, stringPath, value);
        // const updated: T = { ...entityState };
        // (updated as any)[stringPath] = value;
        // return updated;
      });
    },
    [dispatchWithoutControl, stringPath]
  );
}
