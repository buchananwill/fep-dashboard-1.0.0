import { NumberPropertyKey, StringPropertyKey } from '@/types';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { HasIdClass } from '@/api/types';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { GetFieldType, getValue } from '@/functions/allowingNestedFiltering';
import { Paths } from 'type-fest';
import {
  useGlobalController,
  useGlobalDispatch,
  useGlobalListener
} from 'selective-context';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { isEqual } from 'lodash';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';

export type FilterablePropertyKey<T> =
  | StringPropertyKey<T>
  | NumberPropertyKey<T>;

const listenerKey = 'filterInput';

export function getFilteredIdContextKey(entityClass: string) {
  return `${entityClass}:filteredIds`;
}

export function getFilterPropertyContextKey(entityClass: string) {
  return `${entityClass}:currentFilterProperty`;
}

export function getSetPageContextKey(entityClass: string) {
  return `${entityClass}:setPage`;
}

export function getFilterValueContextKey(entityClass: string) {
  return `${entityClass}:filterValue`;
}

export function useClientSideFilteringIdList<
  T extends HasIdClass<Identifier>,
  TPath extends string & GetFieldType<T, TPath> extends string
    ? Paths<T>
    : never
>() {
  const { entityClass } = useEntityTableContext();
  const { currentState: entities } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as T[]
  );
  const { currentState: entityIdList } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.ID_LIST,
    listenerKey,
    EmptyArray as Identifier[]
  );

  const { currentState: deletedIdList } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.DELETED,
    listenerKey,
    EmptyArray as Identifier[]
  );

  const { currentState: currentIdList, dispatch } = useGlobalController({
    contextKey: getFilteredIdContextKey(entityClass),
    listenerKey,
    initialValue: entityIdList as Identifier[]
  });
  const { currentState: currentFilterProperty } = useGlobalListener({
    contextKey: getFilterPropertyContextKey(entityClass),
    listenerKey,
    initialValue: '' as TPath
  });
  const { dispatchWithoutListen: setPage } = useGlobalDispatch(
    getSetPageContextKey(entityClass)
  );

  // Set up filtering
  const { currentState: filterValue, dispatch: setFilterValue } =
    useGlobalController({
      contextKey: getFilterValueContextKey(entityClass),
      initialValue: '',
      listenerKey
    });

  const filteredIdsRef = useRef<Identifier[]>([]);
  const hasSearchFilter = !!filterValue && filterValue.trim() !== '';
  const hasFilterPath = !!currentFilterProperty && currentFilterProperty !== '';
  const filteredIds = useMemo(() => {
    const deletedIdSet = new Set(deletedIdList);

    let filteredEntities = [...entities];

    filteredEntities = filteredEntities.filter((entity) => {
      if (deletedIdSet.has(entity.id)) return false;
      else if (hasSearchFilter && hasFilterPath) {
        const value = String(
          getValue(entity, currentFilterProperty)
        ).toLowerCase() as string;
        return value
          .trim()
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase());
      } else {
        return true;
      }
    });

    return filteredEntities.map((entity) => entity.id);
  }, [
    deletedIdList,
    entities,
    filterValue,
    hasSearchFilter,
    currentFilterProperty,
    hasFilterPath
  ]);

  useEffect(() => {
    const filterOutputChange = !isEqual(filteredIdsRef.current, filteredIds);
    if (filterOutputChange) {
      dispatch(filteredIds);
      filteredIdsRef.current = filteredIds;
    }
  }, [filteredIds, dispatch]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value) {
        setFilterValue(event.target.value);
        setPage(1);
      } else {
        setFilterValue('');
      }
    },
    [setPage, setFilterValue]
  );

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, [setPage, setFilterValue]);

  return {
    filterValue,
    onChange,
    onClear
  };
}
