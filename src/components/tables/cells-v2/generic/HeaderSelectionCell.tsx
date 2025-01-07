import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalListener } from 'selective-context';
import { getFilteredSortedIdListContextKey } from '@/hooks/table-hooks/useClientSideSorting';
import { EmptyArray } from '@/api/client-literals';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { Checkbox, CheckIcon, Indicator } from '@mantine/core';
import { TableSelectionMode } from '@/components/tables/core-table-types';
import { NoSymbolIcon } from '@heroicons/react/24/outline';
import { MinusIcon } from '@heroicons/react/24/solid';

export default function HeaderSelectionCell() {
  const { entityClass, withSelection } = useEntityTableContext();
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
    if (withSelection === 'single' || withSelection === 'none') {
      dispatchWithoutControl([]);
      return;
    }
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
  }, [checkedState, dispatchWithoutControl, withSelection]);
  const indeterminate =
    withSelection === 'multiple' && indeterminateStates.includes(checkedState);

  const IconComponent = useMemo(() => {
    return function IconComponent({
      indeterminate,
      className
    }: {
      indeterminate: boolean | undefined;
      className: string;
    }) {
      if (indeterminate) return <MinusIcon className={className} />;
      else {
        const Renderer = IconMap[withSelection];
        return <Renderer className={className} />;
      }
    };
  }, [withSelection]);

  const checked =
    (checkedState === 'allFiltered' && withSelection === 'multiple') ||
    (checkedState === 'some' && withSelection === 'single');
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
        checked={checked}
        icon={IconComponent}
        styles={{ body: { justifyContent: 'center' } }}
        indeterminate={indeterminate}
        onChange={onChange}
      />
    </Indicator>
  );
}

const indeterminateStates = ['some', 'moreThanFiltered'];

const IconMap: Record<
  TableSelectionMode,
  (props: { className: string }) => ReactNode
> = {
  none: NoSymbolIcon,
  single: CheckIcon,
  multiple: CheckIcon
} as const;
