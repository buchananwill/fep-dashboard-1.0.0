'use client';
import { Identifier } from 'dto-stores';
import { HasId, HasIdClass } from '@/api/types';
import { Select, SelectProps } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { StringPropertyKey } from '@/types';
import { useEntitySelection } from '@/hooks/useEntitySelection';
import { MutableRefObject } from 'react';

export type EntitySelectorProps<T, U> = {
  entityClass: string;
  visibleItems: MutableRefObject<T[]>;
  labelAccessor: StringPropertyKey<T>;
} & Omit<SelectProps, 'items' | 'selectedKeys' | 'children'>;

export default function EntitySelector<
  T extends HasIdClass<U>,
  U extends Identifier
>({
  entityClass,
  labelAccessor,
  visibleItems,
  ...selectProps
}: EntitySelectorProps<T, U>) {
  const { currentState, selectedKeys, onSelectionChange } = useEntitySelection<
    T,
    U
  >(entityClass, visibleItems);

  return (
    <Select
      {...selectProps}
      items={currentState}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
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
