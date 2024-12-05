import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { Select } from '@mantine/core';
import { useCallback } from 'react';

export function SelectChildrenAsCell({
  onChange,
  value
}: IdInnerCellProps<string>) {
  const safeOnChange = useCallback(
    (update: string | null) => {
      if (update && onChange) {
        onChange(update);
      }
    },
    [onChange]
  );

  return <Select data={options} value={value} onChange={safeOnChange} />;
}

const options = ['BUNDLE', 'CAROUSEL', 'SERIAL'] as const;
