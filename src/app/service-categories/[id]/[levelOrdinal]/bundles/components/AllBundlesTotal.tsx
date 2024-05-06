'use client';
import {
  ObjectPlaceholder,
  useSelectiveContextGlobalListener,
  useSelectiveContextGlobalReadAll
} from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { StringMap } from '@/api/string-map';
import { WorkSeriesSchemaBundleDto } from '@/app/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useMemo } from 'react';
import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/sum-delivery-allocations';
import { Chip } from '@nextui-org/chip';

export default function AllBundlesTotal() {
  const { currentState } = useSelectiveContextGlobalListener<
    StringMap<WorkSeriesSchemaBundleDto>
  >({
    contextKey: `${EntityClassMap.workSeriesSchemaBundle}:stringMap`,
    listenerKey: 'allBundlesTotal',
    initialValue: ObjectPlaceholder
  });
  const selectiveContextReadAll =
    useSelectiveContextGlobalReadAll<WorkProjectSeriesSchemaDto>();
  const currentTotalAllBundles = useMemo(() => {
    const schemaList = Object.values(currentState)
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
