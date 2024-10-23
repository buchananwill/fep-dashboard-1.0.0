import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalListener } from 'selective-context';
import { getFilteredSortedIdListContextKey } from '@/hooks/table-hooks/useClientSideSorting';
import { EmptyArray } from '@/api/literals';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useCallback, useMemo, useRef } from 'react';
import { Checkbox, Indicator } from '@mantine/core';

export default function HeaderSelectionCell() {
  const { entityClass } = useEntityTableContext();
  const listenerKey = useUuidListenerKey();

  const { currentState } = useGlobalListener({
    contextKey: getFilteredSortedIdListContextKey(entityClass),
    listenerKey,
    initialValue: EmptyArray as Identifier[]
  });
  const { currentState: selectIdList, dispatchWithoutControl } =
    NamespacedHooks.useDispatchAndListen<Identifier[]>(
      entityClass,
      KEY_TYPES.SELECTED,
      listenerKey,
      EmptyArray
    );

  const checkedState = useMemo(() => {
    return selectIdList.length === 0
      ? 'none'
      : selectIdList.length < currentState.length
        ? 'some'
        : selectIdList.length === currentState.length
          ? 'allFiltered'
          : 'moreThanFiltered';
  }, [selectIdList, currentState]);
  const listRef = useRef(currentState);
  listRef.current = currentState;

  const onChange = useCallback(() => {
    switch (checkedState) {
      case 'none':
      case 'some': {
        dispatchWithoutControl(listRef.current);
        break;
      }
      case 'allFiltered': {
        dispatchWithoutControl([]);
        break;
      }
      case 'moreThanFiltered': {
        dispatchWithoutControl(listRef.current);
      }
    }
  }, [checkedState, dispatchWithoutControl]);

  return (
    <Indicator
      disabled={checkedState !== 'moreThanFiltered'}
      withBorder
      processing
      size={16}
      offset={4}
      radius={'xl'}
      color={'red'}
    >
      <Checkbox
        checked={checkedState === 'allFiltered'}
        styles={{ body: { justifyContent: 'center' } }}
        indeterminate={indeterminateStates.includes(checkedState)}
        onChange={onChange}
      />
    </Indicator>
  );
}

const indeterminateStates = ['some', 'moreThanFiltered'];
