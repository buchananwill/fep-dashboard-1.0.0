import {
  CheckIcon,
  Combobox,
  ComboboxProps,
  Group,
  Input,
  MultiSelectProps,
  Pill,
  PillsInput,
  PillsInputProps,
  ScrollArea,
  ScrollAreaAutosizeProps,
  useCombobox
} from '@mantine/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EmptyArray } from '@/api/client-literals';
import { SimpleSelectable } from '@/components/types/types';

const noop = (value: string[]) => {};

export function MultiSelectMaxDisplayedItems({
  maxDisplayedValues = 2,
  value = EmptyArray,
  withinPortal = false,
  onChange = noop,
  data,
  pillsInput,
  scrollArea,
  ...props
}: {
  maxDisplayedValues?: number;
  data: SimpleSelectable[];
  pillsInput?: Omit<PillsInputProps, 'pointer' | 'onClick' | 'children'>;
  scrollArea?: ScrollAreaAutosizeProps;
} & Pick<MultiSelectProps, 'value' | 'onChange' | 'placeholder' | 'label'> &
  ComboboxProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active')
  });
  const valueRef = useRef(value);
  valueRef.current = value;

  const handleValueSelect = useCallback(
    (val: string) => {
      const valueSet = new Set(valueRef.current);
      let nextValue = [...valueRef.current];
      if (valueSet.has(val)) {
        nextValue = nextValue.filter((item) => item !== val);
      } else {
        valueSet.add(val);
        nextValue = data
          .filter((datum) => valueSet.has(datum.value))
          .map((datum) => datum.value);
      }
      onChange(nextValue);
    },
    [data, onChange]
  );

  const handleValueRemove = useCallback(
    (val: string) => onChange(valueRef.current.filter((v) => v !== val)),
    [onChange]
  );

  const values = useMemo(
    () =>
      data
        .filter((item) => value?.includes(item.value))
        .slice(
          0,
          maxDisplayedValues === value.length
            ? maxDisplayedValues
            : maxDisplayedValues - 1
        )
        .map((item) => (
          <Pill
            key={item.value}
            withRemoveButton
            onRemove={() => handleValueRemove(item.value)}
          >
            {item.label}
          </Pill>
        )),
    [maxDisplayedValues, value, data, handleValueRemove]
  );

  const options = useMemo(
    () =>
      data.map((item) => (
        <Combobox.Option
          value={item.value}
          key={item.value}
          active={value.includes(item.value)}
        >
          <Group gap="sm">
            {value.includes(item.value) ? <CheckIcon size={12} /> : null}
            <span>{item.label}</span>
          </Group>
        </Combobox.Option>
      )),
    [data, value]
  );

  return (
    <Combobox
      {...props}
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={withinPortal}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          pointer
          onClick={() => combobox.toggleDropdown()}
          {...pillsInput}
        >
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length > maxDisplayedValues && (
                  <Pill>+{value.length - (maxDisplayedValues - 1)} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder>{props.placeholder}</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace') {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize {...scrollArea}>{options}</ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
