import { Identifier, NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { HasIdClass } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { useStringLabelSelection } from '@/hooks/useStringLabelSelection';

/**
 * If a function, labelMaker must be memoized or globally defined to prevent infinite re-renders.
 * */
export function useEntitySelectionWithStringLabelsOnly<T extends HasIdClass>(
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

  return useStringLabelSelection(
    masterList,
    selectedIdList,
    dispatchIdList,
    labelMaker
  );
}
