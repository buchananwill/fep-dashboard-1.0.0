import { useDtoStoreListener } from 'dto-stores';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import {
  ArrayPlaceholder,
  ObjectPlaceholder,
  useSelectiveContextGlobalListener,
  useSelectiveContextGlobalReadAll,
  useSelectiveContextListenerGroupGlobal
} from 'selective-context';
import { WorkSeriesSchemaBundleDto } from '@/app/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useSelectiveContextListenerGroup } from 'selective-context/dist/hooks/base/useSelectiveContextListenerGroup';
import { useMemo } from 'react';

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

  const { currentState: bundleMap } =
    useSelectiveContextListenerGroupGlobal<WorkSeriesSchemaBundleDto>({
      contextKeys,
      listenerKey: `inclusionCounter:${id}`,
      initialValue: ObjectPlaceholder
    });
  const inclusionCount = Object.values(bundleMap).filter(
    (bundle) => bundle && bundle.workProjectSeriesSchemaIds.includes(id)
  ).length;

  const colonIndex = currentState.name.indexOf(':');

  return (
    <span>
      {currentState.name.substring(0, colonIndex)} ({inclusionCount})
    </span>
  );
}
