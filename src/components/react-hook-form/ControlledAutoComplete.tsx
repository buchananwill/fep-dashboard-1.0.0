import {
  Control,
  Controller,
  ControllerRenderProps,
  useFormContext
} from 'react-hook-form';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ItemAccessors,
  SelectableItem
} from '@/components/react-hook-form/ControlledSelect';
import { Autocomplete, AutocompleteProps } from '@mantine/core';

type ControlledAutoCompleteProps<T extends SelectableItem> = {
  selectedKeyAccessor?: string;
  name: string;
  onChange?: (
    value: string | null,
    onChange: (...event: any[]) => void,
    setInputValue: (value: string) => void
  ) => void;
  itemAccessors?: ItemAccessors<T>;
  items: T[];
  allowsCustomValue?: boolean;
} & Pick<AutocompleteProps, 'styles' | 'classNames'>;

export function ControlledAutoComplete<T extends SelectableItem>({
  name,
  onChange,
  itemAccessors = defaultItemAccessors as ItemAccessors<T>,
  items,
  selectedKeyAccessor,
  allowsCustomValue,
  ...props
}: ControlledAutoCompleteProps<T>) {
  const { control } = useFormContext();
  const { labelAccessor, valueAccessor } = itemAccessors;
  const [inputValue, setInputValue] = useState('');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => {
        const currentValue =
          selectedKeyAccessor && field.value
            ? (field.value[selectedKeyAccessor] ?? field.value)
            : field.value;
        const currentValueString = currentValue
          ? String(currentValue)
          : currentValue;

        return (
          <Autocomplete
            {...props}
            value={String(currentValueString)}
            error={formState.errors?.[name]?.message?.toString()}
            onChange={(value) => {
              const valueOrCustom = value
                ? value
                : allowsCustomValue
                  ? value !== ''
                    ? value
                    : null
                  : null;
              if (onChange) {
                onChange(valueOrCustom, field.onChange, setInputValue);
              } else {
                field.onChange(valueOrCustom);
                setInputValue(valueOrCustom ? String(valueOrCustom) : '');
              }
            }}
          />
        );
      }}
    ></Controller>
  );
}

export const defaultItemAccessors = {
  valueAccessor: 'id',
  labelAccessor: 'name'
} as const;
