import { HasId } from '@/api/main';
import { useDtoStoreDispatch } from 'dto-stores';
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface DtoStoreNumberInputProps<T extends HasId, U extends string | number>
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' & 'value' & 'onChange'
  > {
  entityId: U;
  entityType: string;
  numberUpdater: (entity: T, value: number) => T;
  numberAccessor: (entity: T) => number;
  listenerKey: string;
}

export function DtoStoreNumberInput<
  T extends HasId,
  U extends string | number
>({
  entityId,
  entityType,
  numberUpdater,
  listenerKey,
  numberAccessor,
  className
}: DtoStoreNumberInputProps<T, U>) {
  let { currentState, dispatchWithoutControl } = useDtoStoreDispatch<T>(
    entityId,
    entityType,
    listenerKey
  );

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
      value={numberAccessor(currentState)}
      onChange={(e) => update(e)}
      className={className}
    ></input>
  );
}
