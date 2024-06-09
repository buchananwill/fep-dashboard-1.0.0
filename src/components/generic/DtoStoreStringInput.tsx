'use client';
import { BaseLazyDtoUiProps } from 'dto-stores';
import { Input, InputProps } from '@nextui-org/input';
import { StringPropertyKey } from '@/types';
import { useEditTextProperty } from '@/hooks/useEditTextProperty';
import { HasId } from '@/api/types';

export type BaseDtoStoreStringInputProps<T extends HasId> = Omit<
  InputProps,
  'onValueChange' & 'value' & 'type'
> & {
  stringKey: StringPropertyKey<T>;
};

export function DtoStoreStringInput<T extends HasId>({
  entity,
  dispatchWithoutControl,
  stringKey,
  ...inputProps
}: BaseDtoStoreStringInputProps<T> & BaseLazyDtoUiProps<T>) {
  const update = useEditTextProperty(dispatchWithoutControl, stringKey);

  return (
    <Input
      type={'text'}
      value={entity[stringKey] as string}
      onValueChange={update}
      {...inputProps}
    ></Input>
  );
}
