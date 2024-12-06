import { IdInnerCellProps } from '@/components/tables/core-table-types';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { TimeInput } from '@mantine/dates';
import { ActionIcon, rem } from '@mantine/core';
import { ClockIcon } from '@heroicons/react/24/outline';

export function TimeEditCell({ value, onChange }: IdInnerCellProps<string>) {
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;
      else {
        onChange(event.target.value);
      }
    },
    [onChange]
  );

  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <ClockIcon style={{ width: rem(16), height: rem(16) }} />
    </ActionIcon>
  );

  return (
    <TimeInput
      value={value}
      onChange={handleOnChange}
      rightSection={pickerControl}
      ref={ref}
    />
  );
}
