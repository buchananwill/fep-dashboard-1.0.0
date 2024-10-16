'use client';
import { Identifier } from 'dto-stores';
import { HasIdClass } from '@/api/types';
import { Select, SelectProps } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { useEntitySelection } from '@/hooks/useEntitySelection';
import { MutableRefObject } from 'react';
import { TypedPaths } from '@/api/custom-types/typePaths';

export type EntitySelectorProps<T, U> = {
  entityClass: string;
  filteredItems?: MutableRefObject<T[]>;
  labelAccessor: TypedPaths<T, string | number>;
} & Omit<SelectProps, 'items' | 'selectedKeys' | 'children'>;

export default function FilteredEntitySelector<
  T extends HasIdClass<U>,
  U extends Identifier = Identifier
>({
  entityClass,
  labelAccessor,
  filteredItems,
  ...selectProps
}: EntitySelectorProps<T, U>) {
  const { currentState, selectedKeys, onSelectionChange } = useEntitySelection<
    T,
    U
  >(entityClass, filteredItems);

  return (
    <Select
      {...selectProps}
      items={currentState}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      classNames={{ selectorIcon: 'right-4' }}
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
