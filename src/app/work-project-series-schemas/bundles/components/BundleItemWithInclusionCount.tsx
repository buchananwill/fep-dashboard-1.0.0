import { useDtoStoreListener } from 'dto-stores';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import {
  ArrayPlaceholder,
  ObjectPlaceholder,
  useSelectiveContextGlobalListener,
  useSelectiveContextListenerGroupGlobal
} from 'selective-context';
import { WorkSeriesSchemaBundleDto } from '@/app/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useMemo } from 'react';
import { Chip } from '@nextui-org/chip';
import { StringMap } from '@/app/api/string-map';

export default function BundleItemWithInclusionCount({ id }: { id: string }) {
  const { currentState } = useDtoStoreListener<WorkProjectSeriesSchemaDto>(
    id,
    EntityNamesMap.workProjectSeriesSchema,
    'inclusionCounter'
  );

  const { currentState: bundleIdList } = useSelectiveContextGlobalListener<
    number[]
  >({
    contextKey: `${EntityNamesMap.workSeriesSchemaBundle}:idList`,
    initialValue: ArrayPlaceholder,
    listenerKey: `${id}`
  });

  const contextKeys = useMemo(
    () =>
      bundleIdList.map(
        (bundleId) => `${EntityNamesMap.workSeriesSchemaBundle}:${bundleId}`
      ),
    [bundleIdList]
  );

  const { currentState: bundleMap } = useSelectiveContextGlobalListener<
    StringMap<WorkSeriesSchemaBundleDto>
  >({
    contextKey: `${EntityNamesMap.workSeriesSchemaBundle}:stringMap`,
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
