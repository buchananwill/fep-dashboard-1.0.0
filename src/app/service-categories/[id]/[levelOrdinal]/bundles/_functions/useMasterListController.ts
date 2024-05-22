import { HasIdClass } from '@/api/main';
import {
  ArrayPlaceholder,
  useGlobalController,
  useGlobalDispatchAndListener
} from 'selective-context';
import { getDeletedContextKey } from 'dto-stores/dist/functions/getDeletedContextKey';
import { getAddedContextKey } from 'dto-stores/dist/functions/getAddedContextKey';
import { useEffect } from 'react';
import { getMasterListContextKey } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/components/getMasterListContextKey';

const listenerKey = 'masterListController';

export function useMasterListController<
  T extends HasIdClass<U>,
  U extends string | number
>(collectionData: T[], entityName: string) {
  const { currentState, dispatch } = useGlobalController({
    contextKey: getMasterListContextKey(entityName),
    listenerKey: listenerKey,
    initialValue: collectionData
  });

  const {
    currentState: deletedIdList,
    dispatchWithoutControl: dispatchDeleted
  } = useGlobalDispatchAndListener<U[]>({
    contextKey: getDeletedContextKey(entityName),
    listenerKey: listenerKey,
    initialValue: ArrayPlaceholder
  });

  const { dispatchWithoutControl, currentState: transientIdList } =
    useGlobalDispatchAndListener<U[]>({
      contextKey: getAddedContextKey(entityName),
      listenerKey: listenerKey,
      initialValue: ArrayPlaceholder
    });

  useEffect(() => {
    const transientAndDeleted = deletedIdList.filter((id) =>
      transientIdList.includes(id)
    );
    if (transientAndDeleted.length > 0) {
      dispatch((list) =>
        list.filter((bundle) => !transientAndDeleted.includes(bundle.id))
      );
      dispatchDeleted((list) =>
        list.filter((id) => !deletedIdList.includes(id))
      );
      dispatchWithoutControl((list) =>
        list.filter((id) => !deletedIdList.includes(id))
      );
    }
  }, [
    deletedIdList,
    dispatch,
    dispatchWithoutControl,
    dispatchDeleted,
    transientIdList
  ]);
  return { currentState, dispatch, dispatchWithoutControl };
}
