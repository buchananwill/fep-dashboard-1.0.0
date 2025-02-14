'use client';
import { Button, Card, Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { InitJsonTemplateDto } from '@/api/generated-types/generated-types_';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { SelectApiParamsSingleFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { nameAccessor } from '@/functions/nameSetter';
import { migrateSchema } from '@/api/actions-custom/schemas/migrate-schema';
import { redirect } from 'next/navigation';
import { Api } from '@/api/clientApi';

export default function Page() {
  const { data: templatesGraph, isFetching: isFetchingTemplates } = useQuery({
    queryKey: ['initJsonTemplates'],
    queryFn: () => Api.InitJsonTemplate.getGraph()
  });

  const templates = useMemo(() => {
    return templatesGraph?.nodes.map((node) => node.data) ?? [];
  }, [templatesGraph?.nodes]);

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
    rawData: templates,
    type: 'singleFlat',
    value: targetTemplate,
    labelMaker: nameAccessor,
    propagateChange
  });

  return (
    <Card className={'gap-2'}>
      <div>
        <Select {...selectApi} w={'24em'} />
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
          className={'center-horizontal-with-margin block'}
        >
          Initialize
        </Button>
      </div>
    </Card>
  );
}
