import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  SelectItemProps
} from '@nextui-org/react';
import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';
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

  const [inputValue, setInputValue] = useState<string>(defaultInputValue ?? '');
  const inputRef = useRef('');
  inputRef.current = inputValue;

  const onOpenChange = useCallback(
    (isOpen: boolean, field: ControllerRenderProps) => {
      if (!isOpen && props.allowsCustomValue && !field.value) {
        if (onChange) {
          onChange(inputValue, field.onChange, setInputValue);
        } else {
          field.onChange(inputValue);
        }
      }
    },
    []
  );

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

        console.log(
          currentValue,
          selectedKeyAccessor,
          field.value,
          currentValueString
        );

        return (
          <Autocomplete
            {...props}
            inputValue={inputValue}
            onInputChange={setInputValue}
            isInvalid={!!formState.errors?.[name]?.message}
            errorMessage={formState.errors?.[name]?.message?.toString()}
            selectedKey={currentValueString ?? null}
            onOpenChange={(isOpen) => onOpenChange(isOpen, field)}
            onSelectionChange={(value) => {
              console.log('firing the on change', value);
              if (onChange) {
                onChange(value, field.onChange, setInputValue);
              } else {
                field.onChange(value);
                setInputValue(value ? String(value) : '');
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
