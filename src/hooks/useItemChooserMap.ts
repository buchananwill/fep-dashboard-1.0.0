import { useGlobalListenerGroup } from 'selective-context';
import { useMemo } from 'react';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';

import { initialMap } from '@/app/_literals';
import { Identifier } from 'dto-stores';

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
