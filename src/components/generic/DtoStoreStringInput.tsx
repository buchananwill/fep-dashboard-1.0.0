'use client';
import { BaseLazyDtoUiProps } from 'dto-stores';
import { StringPropertyKey } from '@/types';
import { useEditTextProperty } from '@/hooks/useEditTextProperty';
import { HasId } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { TextInput, TextInputProps } from '@mantine/core';

export type BaseDtoStoreStringInputProps<T extends HasId> = Omit<
  TextInputProps,
  'onChange' & 'value' & 'type'
> & {
  stringKey: StringPropertyKey<T>;
};

export function DtoStoreStringInput<T extends HasId>({
  entity,
  dispatchWithoutControl,
  stringKey,
  ...inputProps
}: BaseDtoStoreStringInputProps<T> & BaseLazyDtoUiProps<T>) {
  const update = useEditTextProperty(
    dispatchWithoutControl,
    stringKey as TypedPaths<T, string>
  );

  return (
    <TextInput
      type={'text'}
      value={entity[stringKey] as string}
      onChange={update}
      {...inputProps}
    ></TextInput>
  );
}
