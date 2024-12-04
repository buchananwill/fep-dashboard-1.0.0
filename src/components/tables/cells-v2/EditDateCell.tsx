import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { DatePickerInput } from '@mantine/dates';

export function EditDateCell({ value, onChange }: IdInnerCellProps<string>) {
  return (
    <DatePickerInput
      value={new Date(value)}
      onChange={(value) =>
        onChange && onChange(value ? value.toDateString() : '')
      }
    />
  );
}
