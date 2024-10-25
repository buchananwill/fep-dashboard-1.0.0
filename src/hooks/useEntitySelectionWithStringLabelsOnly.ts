import { Identifier, NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { HasIdClass } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { useCallback, useMemo } from 'react';
import { get } from 'lodash';
import { isNotUndefined } from '@/api/main';
import { DispatchState } from '@/types';
import { SimpleSelectable } from '@/components/generic/MultiSelect';

export function useLabelMaker<T extends HasIdClass>(
  labelMaker?: (string & TypedPaths<T, string | number>) | ((item: T) => string)
): (item?: T) => string {
  return useCallback(
    (item?: T) => {
      if (item === undefined) throw Error('Item was undefined');
      let label = item.id;
      if (typeof labelMaker === 'string') {
        label = String(get(item, labelMaker));
      } else if (typeof labelMaker === 'function') {
        label = labelMaker(item);
      }
      return label as string;
    },
    [labelMaker]
  );
}

function useLabelListMapAndIdMap<T extends HasIdClass>(
  masterList: T[],
  getLabel: (item?: T) => string
) {
  return useMemo(() => {
    const selectableMap = new Map<string, T>();
    const idMap = new Map<Identifier, T>();
    masterList.forEach((item) => {
      const label = getLabel(item);
      if (selectableMap.has(label))
        throw Error(
          'Duplicate label found for chosen key. Use unique identifying label'
        );
      selectableMap.set(label, item);
      idMap.set(item.id, item);
    });
    return { labelList: [...selectableMap.keys()], selectableMap, idMap };
  }, [getLabel, masterList]);
}

function useSimpleSelectableListMapAndIdMap<T extends HasIdClass>(
  masterList: T[],
  getLabel: (item?: T) => string
) {
  return useMemo(() => {
    const selectableMap = new Map<string, T>();
    const idMap = new Map<Identifier, T>();
    const selectableList: SimpleSelectable[] = [];
    masterList.forEach((item) => {
      const label = getLabel(item);
      const value = String(item.id);
      if (selectableMap.has(label))
        throw Error(
          'Duplicate label found for chosen key. Use unique identifying label'
        );
      selectableMap.set(value, item);
      idMap.set(item.id, item);
      selectableList.push({ value, label });
    });
    return { selectableList, selectableMap, idMap };
  }, [getLabel, masterList]);
}

function useSelectionKeyList<T extends HasIdClass>(
  selectedIdList: Identifier[],
  idMap: Map<Identifier, T>,
  getValue: (item?: T) => string
) {
  return useMemo(() => {
    return selectedIdList.map((id) => idMap.get(id)).map(getValue);
  }, [selectedIdList, getValue, idMap]);
}

function useStringSelectionListToIdListAdaptor<T extends HasIdClass>(
  selectableMap: Map<string, T>,
  dispatchIdList: DispatchState<Identifier[]>
) {
  return useCallback(
    (selection: string | string[] | null) => {
      let stringList = [] as string[];
      if (typeof selection === 'string') {
        stringList.push(selection);
      } else if (Array.isArray(selection)) {
        stringList = selection;
      }
      const nextSelection: Identifier[] = stringList
        .map((label) => selectableMap.get(label))
        .map((item) => item?.id)
        .filter(isNotUndefined);
      dispatchIdList(nextSelection);
    },
    [selectableMap, dispatchIdList]
  );
}

function useStringLabelSelection<T extends HasIdClass>(
  masterList: T[],
  selectedIdList: Identifier[],
  dispatchIdList: DispatchState<Identifier[]>,
  labelMaker?: (string & TypedPaths<T, string | number>) | ((item: T) => string)
) {
  const getLabel = useLabelMaker(labelMaker);
  const { labelList, selectableMap, idMap } = useLabelListMapAndIdMap<T>(
    masterList,
    getLabel
  );
  const selectionList = useSelectionKeyList(selectedIdList, idMap, getLabel);
  const onChange = useStringSelectionListToIdListAdaptor(
    selectableMap,
    dispatchIdList
  );
  return { labelList, selectionList, onChange };
}

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
  const selectionList = useSelectionKeyList(selectedIdList, idMap, idGetter<T>);
  const onChange = useStringSelectionListToIdListAdaptor(
    selectableMap,
    dispatchIdList
  );
  return { selectableList, selectionList, onChange };
}

function idGetter<T extends HasIdClass>(item?: T) {
  if (item) return String(item.id);
  throw Error('Item undefined');
}
