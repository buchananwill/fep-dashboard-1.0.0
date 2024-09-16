import { ChangeEvent, useCallback } from 'react';

export function useNestedSelectChangeHandler<T>(
  nestedPropertyOptions: T[],
  valueAccessor: (item: T) => string
) {
  return useCallback(
    (
      event: ChangeEvent<HTMLSelectElement>,
      onChange: (...event: any[]) => void
    ) => {
      const updatedElement = nestedPropertyOptions.find(
        (kdItem) => valueAccessor(kdItem) === event.target.value
      );
      console.log(event, updatedElement);
      onChange(updatedElement);
    },
    [nestedPropertyOptions, valueAccessor]
  );
}