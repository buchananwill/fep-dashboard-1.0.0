import { useGlobalListenerGroup } from 'selective-context';
import { useMemo } from 'react';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';

export function useItemChooserMap<T>(
  referencedItemContextKeys: string[],
  collectionId: string | number
) {
  const { currentState: itemMap } = useGlobalListenerGroup<T>({
    contextKeys: referencedItemContextKeys,
    listenerKey: `collectionItemChooser:${collectionId}`,
    initialValue: initialMap as Map<string, T>
  });

  console.log(itemMap);

  const items = useMemo(() => {
    return referencedItemContextKeys
      .map((cKey) => itemMap.get(cKey))
      .filter((schema) => schema !== undefined)
      .map((schema) => schema as WorkProjectSeriesSchemaDto);
  }, [referencedItemContextKeys, itemMap]);
  return { itemMap, items };
}
