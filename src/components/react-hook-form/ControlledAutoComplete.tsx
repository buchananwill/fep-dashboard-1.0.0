import { Control, Controller } from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  SelectItemProps
} from '@nextui-org/react';
import React, { ChangeEvent, useMemo } from 'react';
import {
  ItemAccessors,
  SelectableItem
} from '@/components/react-hook-form/ControlledSelect';

type ControlledAutoCompleteProps<T extends SelectableItem> = {
  selectedKeyAccessor?: string;
  name: string;
  control: Control<any>;
  onChange?: (
    value: React.Key | null,
    onChange: (...event: any[]) => void
  ) => void;
  selectItemProps?: SelectItemProps;
  itemAccessors?: ItemAccessors<T>;
  items: T[];
} & Omit<AutocompleteProps, 'onChange' | 'children'>;

export function ControlledAutoComplete<T extends SelectableItem>({
  name,
  onChange,
  itemAccessors = defaultItemAccessors as ItemAccessors<T>,
  items,
  selectItemProps,
  selectedKeyAccessor,
  control,
  ...props
}: ControlledAutoCompleteProps<T>) {
  const { keyAccessor, labelAccessor, valueAccessor } = itemAccessors;
  const childrenDefined = useMemo(() => {
    if (items && itemAccessors) {
      return items.map((kls) => (
        <AutocompleteItem
          {...selectItemProps}
          key={kls[keyAccessor]}
          value={kls[valueAccessor]}
          aria-label={kls[labelAccessor] ?? kls[keyAccessor]}
        >
          {kls[labelAccessor]}
        </AutocompleteItem>
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

  console.log(props);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const currentValue =
          selectedKeyAccessor && field.value
            ? field.value[selectedKeyAccessor] ?? field.value
            : field.value;
        const currentValueString = currentValue
          ? String(currentValue)
          : currentValue;
        return (
          <Autocomplete
            {...props}
            isInvalid={!!formState.errors?.[name]?.message}
            errorMessage={formState.errors?.[name]?.message?.toString()}
            selectedKey={currentValueString ?? ''}
            onSelectionChange={(value) => {
              console.log('firing the on change', value);
              if (onChange) {
                onChange(value, field.onChange);
              } else {
                field.onChange(value);
              }
            }}
          >
            {childrenDefined}
          </Autocomplete>
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
