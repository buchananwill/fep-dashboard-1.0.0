'use client';
import {
  ObjectPlaceholder,
  useGlobalListener,
  useGlobalReadAny
} from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { StringObjectRecord } from '@/api/string-object-record';

import { useMemo } from 'react';
import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/sum-delivery-allocations';
import { Chip } from '@nextui-org/chip';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';

export default function AllBundlesTotal() {
  const { currentState } = useGlobalListener<
    StringObjectRecord<WorkSeriesSchemaBundleDto>
  >({
    contextKey: `${EntityClassMap.workSeriesSchemaBundle}:stringMap`,
    listenerKey: 'allBundlesTotal',
    initialValue: ObjectPlaceholder
  });
  const selectiveContextReadAll =
    useGlobalReadAny<WorkProjectSeriesSchemaDto>();
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
