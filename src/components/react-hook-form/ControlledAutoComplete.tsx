import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  SelectItemProps
} from '@nextui-org/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
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
    onChange: (...event: any[]) => void,
    setInputValue: (value: string) => void
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
  defaultInputValue,
  control,
  ...props
}: ControlledAutoCompleteProps<T>) {
  const { labelAccessor, valueAccessor } = itemAccessors;
  const childrenDefined = useMemo(() => {
    if (items && itemAccessors) {
      return items.map((kls) => (
        <AutocompleteItem
          {...selectItemProps}
          key={kls[valueAccessor]}
          value={kls[valueAccessor]}
          aria-label={kls[labelAccessor]}
        >
          {kls[labelAccessor]}
        </AutocompleteItem>
      ));
    } else return [];
  }, [itemAccessors, items, selectItemProps, valueAccessor, labelAccessor]);

  const [inputValue, setInputValue] = useState<string>(defaultInputValue ?? '');
  const inputRef = useRef('');
  inputRef.current = inputValue;

  const onOpenChange = useCallback(
    (isClosing: boolean, field: ControllerRenderProps) => {
      if (isClosing && props.allowsCustomValue && !field.value) {
        if (onChange) {
          onChange(inputRef.current, field.onChange, setInputValue);
        } else {
          field.onChange(inputRef.current);
        }
      }
    },
    [props.allowsCustomValue, onChange]
  );

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
            inputValue={inputValue}
            onInputChange={setInputValue}
            onClear={() => setInputValue('')}
            isInvalid={!!formState.errors?.[name]?.message}
            errorMessage={formState.errors?.[name]?.message?.toString()}
            selectedKey={currentValueString ?? null}
            onClose={() => onOpenChange(true, field)}
            onBlur={() => {}}
            onSelectionChange={(value) => {
              const valueOrCustom = value
                ? value
                : props.allowsCustomValue
                  ? inputValue !== ''
                    ? inputValue
                    : null
                  : null;
              if (onChange) {
                onChange(valueOrCustom, field.onChange, setInputValue);
              } else {
                field.onChange(valueOrCustom);
                setInputValue(valueOrCustom ? String(valueOrCustom) : '');
              }
            }}
          >
            {...childrenDefined}
          </Autocomplete>
        );
      }}
    ></Controller>
  );
}

export const defaultItemAccessors = {
  valueAccessor: 'id',
  labelAccessor: 'name'
} as const;
