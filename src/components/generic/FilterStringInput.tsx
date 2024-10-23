import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { TextInput } from '@mantine/core';
import { useClientSideFilteringIdList } from '@/hooks/table-hooks/useClientSideFilteringIdList';
import clsx from 'clsx';

export default function FilterStringInput() {
  const { onChange, filterValue, onClear } = useClientSideFilteringIdList();

  return (
    <TextInput
      leftSection={<MagnifyingGlassIcon className={'p-1'} />}
      leftSectionPointerEvents={'none'}
      rightSection={
        <XMarkIcon
          onClick={onClear}
          className={clsx(
            'm-1 rounded-full p-1 hover:bg-default-100',
            filterValue === '' && 'pointer-events-none opacity-0'
          )}
        />
      }
      label={'Filter'}
      onChange={onChange}
      value={filterValue}
    />
  );
}
