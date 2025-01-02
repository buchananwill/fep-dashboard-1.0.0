'use client';
import { Button, Loader, Select, TextInput } from '@mantine/core';
import { useCallback, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import checkSchemaNameAvailable from '@/api/actions-custom/schemas/check-schema-name-available';
import { createSchemaFlow } from '@/app/admin/create-schema/createSchemaFlow';
import { api } from '@/api/v3/clientApiV3';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { SelectApiParamsSingleFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { InitJsonTemplateDto } from '@/api/generated-types/generated-types_';
import { EmptyArray } from '@/api/literals';
import { nameAccessor } from '@/functions/nameSetter';

export function ChooseSchemaField() {
  const [value, setValue] = useState<string>('');
  const [debouncedValue] = useDebouncedValue(value, 300, { leading: true });

  const { data, isFetching } = useQuery({
    queryKey: ['checkSchemaNameAvailable', debouncedValue],
    queryFn: () =>
      debouncedValue
        ? checkSchemaNameAvailable(cleanAndPrefixSchema(debouncedValue))
        : { error: undefined }
  });

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
        onClick={async () => {
          if (value) {
            await createSchemaFlow(cleanAndPrefixSchema(value));
          }
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
