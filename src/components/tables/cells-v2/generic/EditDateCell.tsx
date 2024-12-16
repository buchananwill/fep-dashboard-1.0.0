import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { DatePickerInput } from '@mantine/dates';
import { Button } from '@mantine/core';

export function EditDateCell({
  value,
  onChange
}: IdInnerCellProps<string | undefined>) {
  return (
    <DatePickerInput
      value={value ? new Date(value) : null}
      placeholder={'Pick date'}
      onChange={(value) =>
        onChange && onChange(value ? value.toDateString() : '')
      }
    />
  );
}
