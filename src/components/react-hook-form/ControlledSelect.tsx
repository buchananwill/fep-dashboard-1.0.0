import { Control, Controller } from 'react-hook-form';
import { Select, SelectItemProps, SelectProps } from '@nextui-org/react';
import React, { ChangeEvent, useMemo } from 'react';
import { SelectItem } from '@nextui-org/select';
import { RequireAllOrNone, Simplify } from 'type-fest';
import { TypedPaths } from '@/functions/typePaths';
import { HasId } from '@/api/types';

export type SelectableItem = HasId;

export type ItemAccessors<T extends SelectableItem> = {
  valueAccessor: TypedPaths<T, string | number>;
  keyAccessor: TypedPaths<T, string | number>;
  labelAccessor: TypedPaths<T, string | number>;
};

type FormSelectProps<T extends SelectableItem> = {
  selectedKeyAccessor?: string;
  name: string;
  control: Control<any>;
  onChange?: (
    value: ChangeEvent<HTMLSelectElement>,
    onChange: (...event: any[]) => void
  ) => void;
  selectItemProps?: SelectItemProps;
  itemAccessors?: ItemAccessors<T>;
  items: T[];
} & Omit<SelectProps, 'onChange' | 'children'>;

export function ControlledSelect<T extends SelectableItem>({
  name,
  onChange,
  itemAccessors = defaultItemAccessors as ItemAccessors<T>,
  items,
  selectItemProps,
  selectedKeyAccessor,
  ...props
}: FormSelectProps<T>) {
  const { keyAccessor, labelAccessor, valueAccessor } = itemAccessors;
  const childrenDefined = useMemo(() => {
    if (items && itemAccessors) {
      return items.map((kls) => (
        <SelectItem
          {...selectItemProps}
          key={kls[keyAccessor]}
          value={kls[valueAccessor]}
          aria-label={kls[labelAccessor] ?? kls[keyAccessor]}
        >
          {kls[labelAccessor]}
        </SelectItem>
      ));
    } else return [];
  }, [
    itemAccessors,
    items,
    selectItemProps,
    keyAccessor,
    valueAccessor,
    labelAccessor
  ]);

  return (
    <Controller
      name={name}
      control={props.control}
      render={({ field, fieldState, formState }) => {
        const currentValue =
          selectedKeyAccessor && field.value
            ? field.value[keyAccessor]
            : field.value;
        const currentValueString = currentValue
          ? String(currentValue)
          : currentValue;
        return (
          <Select
            {...props}
            isInvalid={!!formState.errors?.[name]?.message}
            errorMessage={formState.errors?.[name]?.message?.toString()}
            selectedKeys={[currentValueString]}
            onChange={(value) => {
              if (onChange) {
                onChange(value, field.onChange);
              } else {
                field.onChange(value.target.value);
              }
            }}
          >
            {childrenDefined}
          </Select>
        );
      }}
    ></Controller>
  );
}

export const defaultItemAccessors = {
  valueAccessor: 'id',
  labelAccessor: 'name',
  keyAccessor: 'id'
} as const;
