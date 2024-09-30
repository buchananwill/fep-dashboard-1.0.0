import { TypedPaths } from '@/api/custom-types/typePaths';
import { DispatchState } from '@/types';
import { useCallback } from 'react';
import {
  updateNestedValue,
  updateNestedValueWithLodash
} from '@/functions/updateNestedValue';
import { Get, Paths } from 'type-fest';
import { HasOnlyStringKeys } from '@/components/types/stringKeysOnly';

export function useNestedUpdateCallback<
  TState extends HasOnlyStringKeys<TState>,
  TPath extends Paths<TState> & string,
  TPathType extends Get<TState, TPath>
>(
  dispatchWithoutControl: DispatchState<TState>,
  path: TPath
): (updatedValue: TPathType) => void {
  return useCallback(
    (updatedValue: TPathType) => {
      dispatchWithoutControl((template) =>
        updateNestedValueWithLodash(template, path, updatedValue)
      );
    },
    [path, dispatchWithoutControl]
  );
}
