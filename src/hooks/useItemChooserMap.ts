import { useGlobalListenerGroup } from 'selective-context';
import { useMemo } from 'react';
import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema';

import { initialMap } from '@/app/_literals';

export function useItemChooserMap<T>(
  referencedItemContextKeys: string[],
  collectionId: string | number
) {
  const { currentState: itemMap } = useGlobalListenerGroup<T>({
    contextKeys: referencedItemContextKeys,
    listenerKey: `collectionItemChooser:${collectionId}`,
    initialValue: initialMap as Map<string, T>
  });

  const items = useMemo(() => {
    return referencedItemContextKeys
      .map((cKey) => itemMap.get(cKey))
      .filter((schema) => schema !== undefined)
      .map((schema) => schema as WorkProjectSeriesSchemaDto);
  }, [referencedItemContextKeys, itemMap]);
  return { itemMap, items };
}
