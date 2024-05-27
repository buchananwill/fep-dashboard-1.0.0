'use client';

import { EntityClassMap } from '@/api/entity-class-map';
import {
  ArrayPlaceholder,
  ObjectPlaceholder,
  useGlobalListener
} from 'selective-context';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useMemo } from 'react';
import { Chip } from '@nextui-org/chip';
import { StringObjectRecord } from '@/api/string-object-record';
import { useDtoStore } from 'dto-stores';

export default function BundleItemWithInclusionCount({ id }: { id: string }) {
  const { entity } = useDtoStore<WorkProjectSeriesSchemaDto>({
    entityId: id,
    entityClass: EntityClassMap.workProjectSeriesSchema,
    listenerKey: 'inclusionCounter'
  });

  const { currentState: bundleIdList } = useGlobalListener<number[]>({
    contextKey: `${EntityClassMap.workSeriesSchemaBundle}:idList`,
    initialValue: ArrayPlaceholder,
    listenerKey: `${id}`
  });

  const contextKeys = useMemo(
    () =>
      bundleIdList.map(
        (bundleId) => `${EntityClassMap.workSeriesSchemaBundle}:${bundleId}`
      ),
    [bundleIdList]
  );

  const { currentState: bundleMap } = useGlobalListener<
    StringObjectRecord<WorkSeriesSchemaBundleDto>
  >({
    contextKey: `${EntityClassMap.workSeriesSchemaBundle}:stringMap`,
    listenerKey: id,
    initialValue: ObjectPlaceholder
  });

  const inclusionCount = Object.values(bundleMap).filter(
    (bundle) => bundle && bundle.workProjectSeriesSchemaIds.includes(id)
  ).length;

  return (
    <div className={'flex justify-between'}>
      <span>{entity.name}</span>{' '}
      <Chip
        size={'sm'}
        classNames={{ base: 'py-0.5 h-fit' }}
        color={
          inclusionCount === 0
            ? 'default'
            : inclusionCount === 1
              ? 'success'
              : 'warning'
        }
      >
        {inclusionCount}
      </Chip>
    </div>
  );
}
