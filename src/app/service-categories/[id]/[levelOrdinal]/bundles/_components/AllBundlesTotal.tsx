'use client';
import { useGlobalListener, useGlobalReadAny } from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';

import { useMemo } from 'react';
import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/_functions/sum-delivery-allocations';
import { Chip } from '@nextui-org/chip';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';

export default function AllBundlesTotal() {
  const { currentState } = useGlobalListener<
    Map<string, WorkSeriesSchemaBundleDto>
  >({
    contextKey: `${EntityClassMap.workSeriesSchemaBundle}:${KEY_TYPES.MASTER_MAP}`,
    listenerKey: 'allBundlesTotal',
    initialValue: initialMap as Map<string, WorkSeriesSchemaBundleDto>
  });
  const selectiveContextReadAll =
    useGlobalReadAny<WorkProjectSeriesSchemaDto>();
  const currentTotalAllBundles = useMemo(() => {
    const schemaList = [...currentState.values()]
      .map((bundle) => bundle.workProjectSeriesSchemaIds)
      .map((list) =>
        list.map((idItem) =>
          selectiveContextReadAll(
            `${EntityClassMap.workProjectSeriesSchema}:${idItem}`
          )
        )
      )
      .reduce((prev, curr) => [...prev, ...curr], [])
      .filter((item) => item != undefined)
      .map((t) => t as WorkProjectSeriesSchemaDto);
    return sumAllSchemas(schemaList);
  }, [currentState, selectiveContextReadAll]);

  return <Chip color={'primary'}>{currentTotalAllBundles}</Chip>;
}
