import { useDtoStoreListener } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  ArrayPlaceholder,
  ObjectPlaceholder,
  useSelectiveContextGlobalListener
} from 'selective-context';
import { WorkSeriesSchemaBundleDto } from '@/app/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useMemo } from 'react';
import { Chip } from '@nextui-org/chip';
import { StringObjectRecord } from '@/api/string-object-record';

export default function BundleItemWithInclusionCount({ id }: { id: string }) {
  const { currentState } = useDtoStoreListener<WorkProjectSeriesSchemaDto>(
    id,
    EntityClassMap.workProjectSeriesSchema,
    'inclusionCounter'
  );

  const { currentState: bundleIdList } = useSelectiveContextGlobalListener<
    number[]
  >({
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

  const { currentState: bundleMap } = useSelectiveContextGlobalListener<
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
      <span>{currentState.name}</span>{' '}
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
