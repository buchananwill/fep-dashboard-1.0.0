import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { Column } from '@/types';
import { Button } from '@mantine/core';
import { useGlobalDispatchAndListener } from 'selective-context';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { SortState } from '@/components/tables/core-table-types';
import { useCallback } from 'react';
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { defaultSortState } from '@/components/tables/cells-v2/DefaultSortStates';

export function getSortContextKey(entityClass: string) {
  return `${entityClass}:sortState`;
}

export default function SortableHeaderCell<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier
>({ uid, name, sortable }: Column<T>) {
  const { entityClass } = useEntityTableContext();
  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener(
    {
      contextKey: getSortContextKey(entityClass),
      listenerKey: `${entityClass}:${uid}`,
      initialValue: defaultSortState as SortState<T>
    }
  );

  const changeSortState = useCallback(() => {
    dispatchWithoutControl((prev) => {
      if (prev.path !== uid) {
        return { path: uid, direction: 'asc' };
      } else {
        if (prev.direction === 'asc') {
          return { path: uid, direction: 'desc' };
        } else {
          return { path: '', direction: 'asc' };
        }
      }
    });
  }, [uid, dispatchWithoutControl]);

  const isSort = currentState.path === uid;
  const isDown = currentState.direction === 'desc';

  return sortable ? (
    <Button
      fullWidth
      variant={'light'}
      styles={{
        label: { padding: '0.25em' },
        inner: { padding: '0em', width: 'fit-content' },
        root: { borderRadius: 0 }
      }}
      onClick={changeSortState}
      rightSection={
        isSort ? (
          isDown ? (
            <ChevronDownIcon className={'h-4 w-4'} />
          ) : (
            <ChevronUpIcon className={'h-4 w-4'} />
          )
        ) : (
          <ChevronUpDownIcon className={'h-4 w-4'} />
        )
      }
    >
      {name}
    </Button>
  ) : (
    <div className={'center-all-margin w-fit'}>{name}</div>
  );
}
