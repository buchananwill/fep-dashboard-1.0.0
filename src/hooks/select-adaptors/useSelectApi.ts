import { useCallback, useMemo, useRef } from 'react';
import { isEqual } from 'lodash';
import { isNotUndefined } from '@/api/main';
import {
  SelectApiParams,
  SelectApiReturn
} from '@/hooks/select-adaptors/selectApiTypes';

export function useSelectApi<
  U extends SelectApiParams<T> = SelectApiParams<any>,
  T = any
>({
  rawData,
  labelMaker,
  value,
  propagateChange,
  type,
  valueMaker
}: U): Extract<SelectApiReturn, { type: U['type'] }> {
  const valueRef = useRef([] as T[]);
  const selectValueRef = useRef([] as string[]);

  const typeWithData = useMemo(() => {
    const rawDataRecord = {} as Record<string, T>;

    switch (type) {
      case 'singleObject':
      case 'multiObject': {
        const data = rawData.map((datum) => {
          const label = labelMaker(datum);
          const value = valueMaker ? valueMaker(datum) : labelMaker(datum);
          rawDataRecord[value] = datum;
          return { label, value };
        });
        return {
          type,
          data,
          rawDataRecord
        };
      }
      case 'multiFlat':
      case 'singleFlat': {
        const data = rawData.map((datum) => {
          const label = labelMaker(datum);
          rawDataRecord[label] = datum;
          return label;
        });
        return { type, data, rawDataRecord };
      }
    }
  }, [type, labelMaker, rawData, valueMaker]);

  const onChangeSingle = useCallback(
    (value: string | null) => {
      const tValue = value ? typeWithData.rawDataRecord[value] : undefined;

      switch (type) {
        case 'singleFlat':
        case 'singleObject': {
          propagateChange(tValue);
          return;
        }
        case 'multiFlat':
        case 'multiObject': {
          const tValueList = [tValue].filter(isNotUndefined);
          if (!isEqual(tValueList, valueRef.current)) {
            propagateChange(tValueList);
            valueRef.current = tValueList;
            return;
          }
        }
      }
    },
    [typeWithData, propagateChange, type]
  );

  const onMultiChange = useCallback(
    (value: string | string[] | null) => {
      if (!value || typeof value === 'string') {
        onChangeSingle(value);
        return;
      }
      switch (type) {
        case 'singleFlat':
        case 'singleObject': {
          throw Error('value list not allowed');
        }
        case 'multiObject':
        case 'multiFlat': {
          const itemList = value.map(
            (valueItem) => typeWithData.rawDataRecord[valueItem]
          );
          if (!isEqual(itemList, valueRef.current)) {
            propagateChange(itemList);
            valueRef.current = itemList;
            return;
          }
        }
      }
    },
    [onChangeSingle, propagateChange, type, typeWithData]
  );

  const selectValueWithType = useMemo(() => {
    const valueGetter = valueMaker ? valueMaker : labelMaker;

    switch (type) {
      case 'multiFlat':
      case 'multiObject': {
        const selectValueList = value.map((datum) => valueGetter(datum));
        if (!isEqual(selectValueRef.current, selectValueList)) {
          selectValueRef.current = selectValueList;
          return { type, value: selectValueList };
        } else {
          return { type, value: selectValueRef.current };
        }
      }
      case 'singleObject':
      case 'singleFlat': {
        const selectValue = value ? labelMaker(value) : null;
        return { type, value: selectValue };
      }
    }
  }, [valueMaker, labelMaker, type, value]);

  switch (typeWithData.type) {
    case 'singleFlat': {
      if (selectValueWithType.type === 'singleFlat') {
        return {
          type: typeWithData.type,
          onChange: onChangeSingle,
          data: typeWithData.data,
          value: selectValueWithType.value
        } as Extract<SelectApiReturn, { type: U['type'] }>;
      } else throw Error('Type mismatch');
    }
    case 'singleObject': {
      if (selectValueWithType.type === 'singleObject') {
        return {
          type: typeWithData.type,
          onChange: onChangeSingle,
          data: typeWithData.data,
          value: selectValueWithType.value
        } as Extract<SelectApiReturn, { type: U['type'] }>;
      } else throw Error('Type mismatch');
    }
    case 'multiObject': {
      if (selectValueWithType.type === 'multiObject') {
        return {
          type: typeWithData.type,
          onChange: onMultiChange,
          data: typeWithData.data,
          value: selectValueWithType.value
        } as Extract<SelectApiReturn, { type: U['type'] }>;
      } else throw Error('Type mismatch');
    }
    case 'multiFlat': {
      if (selectValueWithType.type === 'multiFlat') {
        return {
          type: typeWithData.type,
          onChange: onMultiChange,
          data: typeWithData.data,
          value: selectValueWithType.value
        } as Extract<SelectApiReturn, { type: U['type'] }>;
      } else throw Error('Type mismatch');
    }
  }
}
