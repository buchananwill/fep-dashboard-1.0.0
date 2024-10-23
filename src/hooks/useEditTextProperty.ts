import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { updateNestedValue } from '@/functions/updateNestedValue';

export function useEditTextProperty<T>(
  dispatchWithoutControl: Dispatch<SetStateAction<T>> | undefined,
  stringPath: TypedPaths<T, string> | undefined
) {
  return useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!dispatchWithoutControl || !stringPath) {
        console.error('no dispatch defined!');
        return;
      }
      dispatchWithoutControl((entityState: T) => {
        return updateNestedValue(entityState, stringPath, e.target.value ?? '');
        // const updated: T = { ...entityState };
        // (updated as any)[stringPath] = value;
        // return updated;
      });
    },
    [dispatchWithoutControl, stringPath]
  );
}
