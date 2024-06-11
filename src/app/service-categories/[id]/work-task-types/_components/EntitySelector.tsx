'use client';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { HasId } from '@/api/types';
import { Select, SelectProps } from '@nextui-org/react';
import { Key, useCallback, useMemo } from 'react';
import { SelectItem } from '@nextui-org/select';
import { StringPropertyKey } from '@/types';

export type EntitySelectorProps<T, U> = {
  entityClass: string;
  labelAccessor: StringPropertyKey<T>;
} & Omit<SelectProps, 'items' | 'selectedKeys' | 'children'>;

export default function EntitySelector<T extends HasId, U extends Identifier>({
  entityClass,
  labelAccessor,
  ...selectProps
}: EntitySelectorProps<T, U>) {
  const listenerKey = useUuidListenerKey();

  const {
    currentState: selectedList,
    dispatchWithoutControl: dispatchSelected
  } = NamespacedHooks.useDispatchAndListen(
    entityClass,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as U[]
  );
  const { currentState } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as T[]
  );

  const selectedSet = useMemo(() => {
    return new Set(selectedList);
  }, [selectedList]);

  const handleChange = useCallback(
    (selected: 'all' | Set<Key>) =>
      dispatchSelected([...new Set(selected).values()] as U[]),
    [dispatchSelected]
  );

  return (
    <Select
      {...selectProps}
      items={currentState}
      selectedKeys={selectedSet}
      onSelectionChange={handleChange}
    >
      {(entity) => (
        <SelectItem
          key={entity.id}
          value={entity.id}
          aria-label={entity[labelAccessor] as string}
        >
          {entity[labelAccessor] as string}
        </SelectItem>
      )}
    </Select>
  );
}
