import { HasId } from '@/api/main';

import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback
} from 'react';
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
}

export function DtoStoreNumberInput<
  T extends HasId,
  U extends string | number
>({
  entityId,
  entityClass,
  numberUpdater,
  numberAccessor,
  className
}: DtoStoreNumberInputProps<T, U>) {
  let { entity, dispatchWithoutControl } = useDtoStore<T>({
    entityId,
    entityClass
  });

  const update = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (dispatchWithoutControl === undefined) {
        console.log('no dispatch defined!');
        return;
      }
      dispatchWithoutControl((entity) =>
        numberUpdater(entity, parseInt(e.target.value))
      );
    },
    [dispatchWithoutControl, numberUpdater]
  );

  if (entity === undefined) return null;

  return (
    <input
      type={'number'}
      value={numberAccessor(entity)}
      onChange={(e) => update(e)}
      className={className}
    ></input>
  );
}
