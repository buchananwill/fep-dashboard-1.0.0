import { Control, Controller } from 'react-hook-form';
import React, { ChangeEvent, useMemo } from 'react';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { HasId } from '@/api/types';
import { Select, SelectProps } from '@mantine/core';

export type SelectableItem = HasId;

export type ItemAccessors<T extends SelectableItem> = {
  valueAccessor: TypedPaths<T, string | number>;
  labelAccessor: TypedPaths<T, string | number>;
};

export type FormSelectProps<T extends SelectableItem> = {
  selectedKeyAccessor?: keyof T;
  name: string;
  control: Control<any>;
  onChange?: (
    value: ChangeEvent<HTMLSelectElement>,
    onChange: (...event: any[]) => void
  ) => void;
  itemAccessors?: ItemAccessors<T>;
  items: T[];
} & Omit<SelectProps, 'onChange' | 'children'>;

export function ControlledSelect<T extends SelectableItem>({
  name,
  onChange,
  itemAccessors = defaultItemAccessors as ItemAccessors<T>,
  items,
  selectedKeyAccessor,
  ...props
}: FormSelectProps<T>) {
  const { labelAccessor, valueAccessor } = itemAccessors;
  const { itemsMap, dataList } = useMemo(() => {
    if (items && itemAccessors) {
      const itemsMap = items.reduce(
        (prev, curr) => prev.set(curr[valueAccessor], curr),
        new Map()
      );
      const dataList = items.map((item) => {
        return {
          value: item[valueAccessor],
          label: item[labelAccessor] ?? item[valueAccessor]
        };
      });
      return { itemsMap, dataList };
    } else return { itemsMap: new Map(), dataList: [] };
  }, [labelAccessor, itemAccessors, items, valueAccessor]);

  return (
    <Controller
      name={name}
      control={props.control}
      render={({ field, fieldState, formState }) => {
        return (
          <Select
            {...props}
            data={dataList}
            value={field[valueAccessor]}
            onChange={(value) => {
              if (onChange) {
                onChange(itemsMap.get(value), field.onChange);
              } else {
                field.onChange(itemsMap.get(value));
              }
            }}
          ></Select>
        );
      }}
    ></Controller>
  );
}

export const defaultItemAccessors = {
  valueAccessor: 'id',
  labelAccessor: 'name'
} as const;
