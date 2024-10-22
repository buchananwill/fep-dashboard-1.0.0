import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { TextInput } from '@mantine/core';
import { useClientSideFilteringIdList } from '@/hooks/table-hooks/useClientSideFilteringIdList';

export default function FilterStringInput({
  entityClass
}: {
  entityClass: string;
}) {
  const { onChange, filterValue, onClear } = useClientSideFilteringIdList();

  return (
    <TextInput
      rightSection={<MagnifyingGlassIcon className={'p-1'} />}
      label={'Filter'}
      onChange={onChange}
      value={filterValue}
    />
  );
}
