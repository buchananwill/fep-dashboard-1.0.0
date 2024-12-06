'use client';
import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { ChangeEvent, useCallback } from 'react';
import { TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';

// Use a regex to validate the entire input string matches the CSV number format
const csvNumberFormat = /^(\s*\d+\s*,\s*)*\s*\d*\s*$/;

export function StringNumberListParserCell({
  value,
  onChange
}: IdInnerCellProps<string>) {
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      console.log({ message: 'handler called', event });
      if (!onChange) return;
      else {
        const list = event.target.value;

        // Check if the input matches the expected CSV format
        if (csvNumberFormat.test(list)) {
          const splitList = list
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s !== '');

          onChange(event.target.value);
        } else {
          notifications.show({
            title: 'Invalid Input Entered',
            message: `The input "${event.target.value}" is not valid. Only numbers separated by commas are allowed. E.g., 1, 2, 3`,
            color: 'red'
          });
        }
      }
    },
    [onChange]
  );

  return <TextInput value={value} onChange={handleOnChange} />;
}
