import { HasIdClass } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useLabelMaker } from '@/hooks/useLabelMaker';
import { useSimpleSelectableListMapAndIdMap } from '@/hooks/useSimpleSelectableListMapAndIdMap';
import { useSelectionIdListToValueListMemo } from '@/hooks/useSelectionIdListToValueListMemo';
import { useStringSelectionListToIdListCallback } from '@/hooks/useStringSelectionListToIdListCallback';

export function useEntitySelectionWithSimpleSelectables<T extends HasIdClass>(
  entityClass: string,
  labelMaker?: (string & TypedPaths<T, string | number>) | ((item: T) => string)
) {
  const listenerKey = useUuidListenerKey();
  const {
    currentState: selectedIdList,
    dispatchWithoutControl: dispatchIdList
  } = NamespacedHooks.useDispatchAndListen(
    entityClass,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as Identifier[]
  );
  const { currentState: masterList } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as T[]
  );

  const getLabel = useLabelMaker(labelMaker);
  const { selectableList, selectableMap, idMap } =
    useSimpleSelectableListMapAndIdMap<T>(masterList, getLabel);
  const selectionList = useSelectionIdListToValueListMemo(
    selectedIdList,
    idMap,
    idGetter<T>
  );
  const onChange = useStringSelectionListToIdListCallback(
    selectableMap,
    dispatchIdList
  );
  return { selectableList, selectionList, onChange, idMap, selectableMap };
}

function idGetter<T extends HasIdClass>(item?: T) {
  if (item) return String(item.id);
  throw Error('Item undefined');
}
