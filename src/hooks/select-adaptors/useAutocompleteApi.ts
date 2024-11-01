import { SingleFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type AutocompleteApiParams<T> = {
  allowCustom?: boolean;
  allowUndefined: boolean;
} & SingleFlat;

export function useAutocompleteApi<T>({
  onChange,
  data,
  value,
  allowCustom,
  allowUndefined
}: AutocompleteApiParams<T>) {
  const [inputValue, setInputValue] = useState<string | undefined>();
  const inputValueRef = useRef(inputValue);
  inputValueRef.current = inputValue;

  useEffect(() => {
    setInputValue(value ?? undefined);
  }, [value]);

  const dataSet = useMemo(() => {
    return new Set(data.map((datum) => datum.toLocaleLowerCase()));
  }, [data]);

  const onBlur = useCallback(() => {
    const aliasedRefValue = inputValueRef.current;
    const isUndefined = !!aliasedRefValue;
    const isCustomValue =
      !aliasedRefValue || !dataSet.has(aliasedRefValue.toLocaleLowerCase());
    const firstFiltered = data
      .filter((datum) =>
        !aliasedRefValue
          ? true
          : datum
              .trim()
              .toLocaleLowerCase()
              .includes(aliasedRefValue.trim().toLocaleLowerCase())
      )
      .shift();
    if (!isCustomValue) {
      if (!firstFiltered) throw Error('Filtering failed.');
      onChange(firstFiltered);
      setInputValue(firstFiltered);
    } else {
      if (allowCustom) {
        const nextValue = !aliasedRefValue
          ? undefined
          : aliasedRefValue.trim() === ''
            ? undefined
            : aliasedRefValue;
        onChange(nextValue ?? null);
        setInputValue(nextValue);
      } else {
        if (allowUndefined) {
          onChange(null);
          setInputValue(undefined);
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
  }, [data, dataSet, onChange, allowUndefined, allowCustom]);

  return { value: inputValue, onChange: setInputValue, onBlur, data };
}
