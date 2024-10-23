import { HasId } from '@/api/types';
import { BaseLazyDtoUiProps } from 'dto-stores';
import { BooleanPropertyKey } from '@/types';
import { Checkbox, CheckboxProps } from '@mantine/core';

export default function EntityPropertyCheckbox<T extends HasId>({
  entity,
  dispatchWithoutControl,
  booleanKey
}: BaseLazyDtoUiProps<T> & { booleanKey: BooleanPropertyKey<T> } & Omit<
    CheckboxProps,
    'isSelected' | 'onValueChange'
  >) {
  if (dispatchWithoutControl === undefined) return null;

  return (
    <Checkbox
      checked={!!entity[booleanKey]}
      onChange={(value) =>
        dispatchWithoutControl((data) => {
          const returnData = { ...data };
          returnData[booleanKey] = value.target.checked as T[typeof booleanKey];
          return returnData;
        })
      }
      label={String(booleanKey)}
    />
  );
}
