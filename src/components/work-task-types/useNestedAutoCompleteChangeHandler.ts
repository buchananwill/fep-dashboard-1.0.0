import { HasId } from '@/api/types';
import React, { useCallback } from 'react';

export function useNestedAutoCompleteChangeHandler<T extends HasId>(
  nestedPropertyOptions: T[],
  labelAccessor: (item: T) => string
) {
  return useCallback(
    (
      selectionKey: string | null,
      onChange: (...event: any[]) => void,
      setInputValue: (value: string) => void
    ) => {
      const updatedElement = nestedPropertyOptions.find(
        (kdItem) => String(kdItem.id) === selectionKey
      );
      onChange(updatedElement);
      setInputValue(
        updatedElement ? String(labelAccessor(updatedElement)) : ''
      );
    },
    [nestedPropertyOptions, labelAccessor]
  );
}
