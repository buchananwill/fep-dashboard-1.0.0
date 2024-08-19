import { Control, Controller } from 'react-hook-form';
import { Select, SelectItemProps, SelectProps } from '@nextui-org/react';
import React, { ChangeEvent, useMemo } from 'react';
import { SelectItem } from '@nextui-org/select';
import {
  RequireAllOrNone,
  RequireExactlyOne,
  SetOptional,
  Simplify
} from 'type-fest';

type FormSelectPropsBase = {
  selectedKeyAccessor?: string;
  name: string;
  control: Control<any>;
  onChange?: (
    value: ChangeEvent<HTMLSelectElement>,
    onChange: (...event: any[]) => void
  ) => void;
  selectItemProps?: SelectItemProps;
  itemAccessors: {
    keyAccessor: string;
    valueAccessor: string;
    labelAccessor: string;
  };
  items?: any[];
} & Omit<SelectProps, 'onChange'>;

type FormSelectPropsItemsWithAccessors = RequireAllOrNone<
  FormSelectPropsBase,
  'itemAccessors' | 'items'
>;

export type FormSelectProps = Simplify<
  RequireExactlyOne<FormSelectPropsItemsWithAccessors, 'children' | 'items'>
>;

export const ControlledSelect: React.FC<FormSelectProps> = ({
  name,
  children,
  onChange,
  itemAccessors = defaultItemAccessors,
  items,
  selectItemProps,
  selectedKeyAccessor,
  ...props
}) => {
  const { keyAccessor, labelAccessor, valueAccessor } = itemAccessors;
  const childrenDefined = useMemo(() => {
    if (children) return children;
    else if (items && itemAccessors) {
      return items.map((kls) => (
        <SelectItem
          {...selectItemProps}
          key={kls[keyAccessor]}
          value={kls[valueAccessor]}
          aria-label={kls[labelAccessor]}
        >
          {kls[labelAccessor]}
        </SelectItem>
      ));
    } else return [];
  }, [
    children,
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
};

export const defaultItemAccessors = {
  valueAccessor: 'id',
  labelAccessor: 'name',
  keyAccessor: 'id'
};
