import { HasId } from '@/api/types';
import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { NumberInput } from '@mantine/core';
import { useCallback } from 'react';

export function NumberEditCell<T extends HasId>({
  value,
  onChange
}: IdInnerCellProps<number>) {
  const handleOnChange = useCallback(
    (value: string | number) => {
      if (!onChange) return;
      if (typeof value === 'number') onChange(value);
      else {
        const parsedValue = parseInt(value);
        if (isNaN(parsedValue)) throw Error(`Could not parse value: ${value}`);
        else onChange(parsedValue);
      }
    },
    [onChange]
  );

  return <NumberInput value={value} onChange={handleOnChange} />;
}
