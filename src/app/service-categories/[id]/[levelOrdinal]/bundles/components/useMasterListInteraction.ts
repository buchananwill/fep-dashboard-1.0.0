import { useGlobalDispatch } from 'selective-context';
import { getNameSpacedKey } from 'dto-stores/dist/functions/getNameSpacedKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useCallback } from 'react';
import { DispatchList } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/SchemaBundleViewer';

export function useMasterListInteraction(
  entityClass: string,
  callback: (
    dispatchMasterList: DispatchList<any>,
    dispatchAddedList: DispatchList<any>
  ) => void
) {
  const { dispatchWithoutListen: dispatch } = useGlobalDispatch(
    getNameSpacedKey(entityClass, KEY_TYPES.MASTER_LIST)
  );
  // TODO Add helper hooks to encapsulate the boilerplate in these hooks. Set as object properties - like static methods.
  const { dispatchWithoutListen } = useGlobalDispatch(
    getNameSpacedKey(entityClass, KEY_TYPES.ADDED)
  );
  return useCallback(
    () => callback(dispatch, dispatchWithoutListen),
    [callback, dispatch, dispatchWithoutListen]
  );
}