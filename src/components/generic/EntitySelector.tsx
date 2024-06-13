'use client';
import { Identifier } from 'dto-stores';
import { HasId } from '@/api/types';
import { Select, SelectProps } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { StringPropertyKey } from '@/types';
import { useEntitySelection } from '@/hooks/useEntitySelection';

export type EntitySelectorProps<T, U> = {
  entityClass: string;
  labelAccessor: StringPropertyKey<T>;
} & Omit<SelectProps, 'items' | 'selectedKeys' | 'children'>;

export default function EntitySelector<T extends HasId, U extends Identifier>({
  entityClass,
  labelAccessor,
  ...selectProps
}: EntitySelectorProps<T, U>) {
  const { currentState, selectedSet, handleChange } = useEntitySelection<T, U>(
    entityClass
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
