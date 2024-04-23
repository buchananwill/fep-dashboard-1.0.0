'use client';
import {
  ObjectPlaceholder,
  useSelectiveContextGlobalListener,
  useSelectiveContextGlobalReadAll
} from 'selective-context';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { StringMap } from '@/app/api/string-map';
import { WorkSeriesSchemaBundleDto } from '@/app/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useMemo } from 'react';
import { sumAllSchemas } from '@/app/work-project-series-schemas/functions/sum-delivery-allocations';
import { Chip } from '@nextui-org/chip';

export default function AllBundlesTotal() {
  const { currentState } = useSelectiveContextGlobalListener<
    StringMap<WorkSeriesSchemaBundleDto>
  >({
    contextKey: `${EntityNamesMap.workSeriesSchemaBundle}:stringMap`,
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
            `${EntityNamesMap.workProjectSeriesSchema}:${idItem}`
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
