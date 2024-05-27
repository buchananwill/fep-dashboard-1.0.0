import { HasId } from '@/api/main';

import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useDtoStore } from 'dto-stores';

interface DtoStoreNumberInputProps<T extends HasId, U extends string | number>
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' & 'value' & 'onChange'
  > {
  entityId: U;
  entityClass: string;
  numberUpdater: (entity: T, value: number) => T;
  numberAccessor: (entity: T) => number;
  listenerKey: string;
}

export function DtoStoreNumberInput<
  T extends HasId,
  U extends string | number
>({
  entityId,
  entityClass,
  numberUpdater,
  listenerKey,
  numberAccessor,
  className
}: DtoStoreNumberInputProps<T, U>) {
  let { entity, dispatchWithoutControl } = useDtoStore<T>({
    entityId,
    entityClass,
    listenerKey
  });

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    if (dispatchWithoutControl === undefined) {
      console.log('no dispatch defined!');
      return;
    }
    dispatchWithoutControl((entity) =>
      numberUpdater(entity, parseInt(e.target.value))
    );
  };

  return (
    <input
      type={'number'}
      value={numberAccessor(entity)}
      onChange={(e) => update(e)}
      className={className}
    ></input>
  );
}
