'use client';
import { Button, Loader, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import checkSchemaNameAvailable from '@/api/actions-custom/check-schema-name-available';
import createSchemaName from '@/api/actions-custom/create-schema-name';

export function ChooseSchemaField() {
  const [value, setValue] = useState<undefined | string>(undefined);
  const [debouncedValue] = useDebouncedValue(value, 300, { leading: true });

  const { data, isFetching } = useQuery({
    queryKey: ['checkSchemaNameAvailable', debouncedValue],
    queryFn: () =>
      debouncedValue
        ? checkSchemaNameAvailable(cleanAndPrefixSchema(debouncedValue))
        : { error: undefined }
  });

  console.log(data);

  return (
    <div className={'flex flex-col gap-2'}>
      <TextInput
        label={'Schema Name'}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        error={!isFetching && data?.error}
        rightSection={isFetching && <Loader />}
      />
      <Button
        type={'submit'}
        disabled={!!data?.error || !value || value.trim() === ''}
        onClick={() => {
          if (value) createSchemaName(cleanAndPrefixSchema(value));
        }}
      >
        Submit
      </Button>
    </div>
  );
}

function cleanAndPrefixSchema(name: string) {
  return `org_${name.trim().toLowerCase().replaceAll(' ', '_')}`;
}
