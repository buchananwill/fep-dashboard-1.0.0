'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { useGlobalController } from 'selective-context';
import { HasIdClass, HasNumberId, HasUuid } from '@/api/main';
import { IdListControllerProps } from 'dto-stores/dist/types';
import { getIdListContextKey } from 'dto-stores/dist/functions/getIdListContextKey';
import { DtoController } from 'dto-stores/dist/controllers/DtoController';
import { SelectiveContextGlobal } from 'selective-context/dist/creators/selectiveContextCreatorGlobal';

export function IdListDataFetchingController<
  T extends HasIdClass<U>,
  U extends string | number
>({
  entityClass,
  idList,
  getServerAction
}: IdListControllerProps<T, U> & {
  getServerAction?: (idList: U[]) => Promise<T[]>;
}) {
  const mutableRefObject = useContext(
    SelectiveContextGlobal.listenersRefContext
  );
  const mutableRefObjectValue = useContext(
    SelectiveContextGlobal.latestValueRefContext
  );

  console.log(mutableRefObject);
  console.log(mutableRefObjectValue);

  const { currentState: stateIdList, dispatch } = useGlobalController({
    contextKey: getIdListContextKey(entityClass),
    listenerKey: listenerKey,
    initialValue: idList
  });
  const [entitiesFromDb, setEntitiesFromDb] = useState<T[]>([]);
  const idListRef = useRef([] as U[]);
  const isLoading = useRef(false);

  const fetchNewEntities = useCallback(
    async (newIdSet: Set<U>) => {
      isLoading.current = true;
      try {
        if (getServerAction) {
          let newItems = await getServerAction([...newIdSet.values()]);
          console.log(newItems);
          setEntitiesFromDb((list) => [...list, ...newItems]);
        }
      } finally {
        isLoading.current = false;
      }
    },
    [getServerAction]
  );

  useEffect(() => {
    console.log(idListRef, stateIdList);
    // make id set from list, and list ref,
    const stateIdSet = new Set<U>(stateIdList);
    const refIdSet = new Set(idListRef.current);
    const newIdSet = new Set<U>();

    // see if any new ids were added...
    for (let newId of stateIdSet) {
      if (!refIdSet.has(newId)) {
        newIdSet.add(newId);
      }
    }
    console.log(newIdSet);

    // see if any ids are no longer present...
    const notListenedIdSet = new Set<U>();
    for (let id of refIdSet) {
      if (!stateIdSet.has(id)) notListenedIdSet.add(id);
    }
    console.log(notListenedIdSet);

    // ...remove them from the state
    if (notListenedIdSet.size > 0)
      setEntitiesFromDb((entities) =>
        entities.filter((entity) => !notListenedIdSet.has(entity.id))
      );

    // ...fetch entities according to id list,
    if (newIdSet.size > 0 && !isLoading.current) {
      fetchNewEntities(newIdSet);
    }

    // ...and update the ref
    idListRef.current = stateIdList;
  }, [stateIdList, fetchNewEntities]);

  console.log(entitiesFromDb);
  return entitiesFromDb.map((entity) => {
    console.log(entity);
    return (
      <DtoController
        key={entity.id}
        dto={entity as HasNumberId | HasUuid}
        entityName={entityClass}
      />
    );
  });
}

const listenerKey = 'controller';
