'use client';
import { HasId } from '@/api/main';
import { useDtoStore } from 'dto-stores';
import { Input, InputProps } from '@nextui-org/input';
import { useCallback } from 'react';

interface DtoStoreStringValueEditProps<T extends HasId>
  extends Omit<InputProps, 'onValueChange' & 'value' & 'type'> {
  entity: T;
  entityClass: string;
  producer?: (value: string, entity: T) => T;
  valueAccessor?: (entity: T) => string;
  listenerKey: string;
}

export function DtoStoreStringValueEdit<T extends HasId>({
  entity: { id },
  entityClass,
  producer,
  valueAccessor,
  listenerKey,
  ...inputProps
}: DtoStoreStringValueEditProps<T>) {
  let { entity, dispatchWithoutControl } = useDtoStore<T>({
    entityId: id,
    entityClass,
    listenerKey
  });

  const update = useCallback(
    (value: string) => {
      if (dispatchWithoutControl === undefined) {
        console.error('no dispatch defined!');
        return;
      }
      if (producer === undefined) {
        console.error('no producer defined!');
        return;
      }
      dispatchWithoutControl((entityState) => producer(value, entityState));
    },
    [dispatchWithoutControl, producer]
  );
  if (valueAccessor === undefined || entity === undefined) {
    console.error('No value accessor supplied');
    return null;
  }

  return (
    <Input
      type={'text'}
      value={valueAccessor(entity)}
      onValueChange={update}
      {...inputProps}
    ></Input>
  );
}
