'use client';
import { Button, Card, Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/v3/clientApiV3';
import { useCallback, useState } from 'react';
import { InitJsonTemplateDto } from '@/api/generated-types/generated-types_';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { SelectApiParamsSingleFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { EmptyArray } from '@/api/literals';
import { nameAccessor } from '@/functions/nameSetter';
import { migrateSchema } from '@/api/actions-custom/schemas/migrate-schema';
import { redirect } from 'next/navigation';

export default function Page({}: {}) {
  const { data: templates, isFetching: isFetchingTemplates } = useQuery({
    queryKey: ['initJsonTemplates'],
    queryFn: () => api('initJsonTemplate', 'getAll', {})
  });

  const [targetTemplate, setTargetTemplate] = useState<
    InitJsonTemplateDto | undefined
  >(undefined);

  const propagateChange = useCallback(
    (value: InitJsonTemplateDto | undefined) => {
      setTargetTemplate(value ?? undefined);
    },
    []
  );

  const selectApi = useSelectApi<
    SelectApiParamsSingleFlat<InitJsonTemplateDto>
  >({
    rawData: templates ?? EmptyArray,
    type: 'singleFlat',
    value: targetTemplate,
    labelMaker: nameAccessor,
    propagateChange
  });

  return (
    <Card>
      <div>
        <Select {...selectApi} />
      </div>
      <div>
        <Button
          onClick={async () => {
            await migrateSchema({
              targetTemplateId: targetTemplate?.id,
              beginWith: 'CLEAN'
            });
            redirect('/admin/schema-status');
          }}
        >
          Initialize
        </Button>
      </div>
    </Card>
  );
}
