import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useEffect, useRef, useState } from 'react';
import { NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { SyncDirection } from '@/components/work-project-series-schema/_components/WorkSchemaNodeModalTable';
import { isEqual } from 'lodash';

export function useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders<
  T
>(
  initialStateSelection: T[],
  updateEntityFromStateSelectionList: (list: T[]) => void,
  entityClass: string
) {
  const listenerKey = useUuidListenerKey();
  const [syncDirection, setSyncDirection] =
    useState<SyncDirection>('propToStore');

  const { dispatchWithoutControl: updateStateSelection, currentState } =
    NamespacedHooks.useDispatchAndListen(
      entityClass,
      KEY_TYPES.SELECTED,
      listenerKey,
      EmptyArray as T[]
    );
  const currentStateRef = useRef([] as T[]);

  useEffect(() => {
    console.log(initialStateSelection, currentState);
    if (syncDirection === 'propToStore') {
      updateStateSelection(initialStateSelection);
      setSyncDirection('storeToState');
      currentStateRef.current = initialStateSelection;
    } else {
      if (!isEqual(currentStateRef.current, currentState)) {
        updateEntityFromStateSelectionList(currentState);
        currentStateRef.current = currentState;
      }
    }
  }, [
    updateEntityFromStateSelectionList,
    initialStateSelection,
    syncDirection,
    currentState,
    updateStateSelection
  ]);
}
