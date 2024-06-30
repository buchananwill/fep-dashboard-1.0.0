import { HasId } from '@/api/types';
import { BaseLazyDtoUiProps } from 'dto-stores';
import { BooleanPropertyKey } from '@/types';
import { Checkbox } from '@nextui-org/checkbox';
import { CheckboxProps } from '@nextui-org/react';

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
      isSelected={!!entity[booleanKey]}
      onValueChange={(value) =>
        dispatchWithoutControl((data) => {
          const returnData = { ...data };
          returnData[booleanKey] = value as T[typeof booleanKey];
          return returnData;
        })
      }
    >
      {String(booleanKey)}
    </Checkbox>
  );
}
