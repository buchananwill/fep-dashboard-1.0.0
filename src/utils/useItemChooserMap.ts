import {
  ObjectPlaceholder,
  useSelectiveContextListenerGroupGlobal
} from 'selective-context';
import { useMemo } from 'react';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';

export function useItemChooserMap<T>(
  referencedItemContextKeys: string[],
  collectionId: string | number
) {
  const { currentState: itemMap } = useSelectiveContextListenerGroupGlobal<T>({
    contextKeys: referencedItemContextKeys,
    listenerKey: `collectionItemChooser:${collectionId}`,
    initialValue: ObjectPlaceholder
  });

  const items = useMemo(() => {
    return referencedItemContextKeys
      .map((cKey) => itemMap[cKey])
      .filter((schema) => schema !== undefined)
      .map((schema) => schema as WorkProjectSeriesSchemaDto);
  }, [referencedItemContextKeys, itemMap]);
  return { itemMap, items };
}