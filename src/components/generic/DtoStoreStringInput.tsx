'use client';
import { HasId } from '@/api/main';
import { BaseLazyDtoUiProps, useDtoStore } from 'dto-stores';
import { Input, InputProps } from '@nextui-org/input';
import { useCallback } from 'react';
import { StringPropertyKey } from '@/types';

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
  const update = useCallback(
    (value: string) => {
      if (dispatchWithoutControl === undefined) {
        console.error('no dispatch defined!');
        return;
      }
      dispatchWithoutControl((entityState: T) => {
        const updated: T = { ...entityState };
        (updated as any)[stringKey] = value;
        return updated;
      });
    },
    [dispatchWithoutControl, stringKey]
  );

  return (
    <Input
      type={'text'}
      value={entity[stringKey] as string}
      onValueChange={update}
      {...inputProps}
    ></Input>
  );
}
