import { SingleFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type AutocompleteApiParams<T> = {
  allowCustom: boolean;
  allowUndefined: boolean;
} & SingleFlat;

export function useAutocompleteApi<T>({
  onChange,
  data,
  value,
  allowCustom,
  allowUndefined
}: AutocompleteApiParams<T>) {
  const [inputValue, setInputValue] = useState('');
  const inputValueRef = useRef(inputValue);
  inputValueRef.current = inputValue;

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  const valueSet = useMemo(() => {
    return new Set(...data.map((datum) => datum.toLocaleLowerCase()));
  }, [data]);

  const onBlur = useCallback(() => {
    console.log({ message: 'on blur handler' });
    const aliasedRefValue = inputValueRef.current;
    const isCustomValue = valueSet.has(aliasedRefValue.toLocaleLowerCase());
    const firstFiltered = data
      .filter((datum) =>
        datum.toLocaleLowerCase().includes(aliasedRefValue.toLocaleLowerCase())
      )
      .shift();
    if (!isCustomValue) {
      if (!firstFiltered) throw Error('Filtering failed.');
      console.log('exact match');
      onChange(firstFiltered);
      setInputValue(firstFiltered);
    } else {
      if (allowCustom) {
        onChange(aliasedRefValue);
      } else {
        if (allowUndefined) {
          onChange(null);
          setInputValue('');
        } else {
          if (data.length === 0)
            throw Error(
              'Undefined and custom not allowed but no values provided.'
            );
          const safeItem = firstFiltered ?? data[0];
          setInputValue(safeItem);
          onChange(safeItem);
        }
      }
    }
  }, [data, valueSet, onChange, allowUndefined, allowCustom]);

  return { value: inputValue, onChange: setInputValue, onBlur, data };
}
