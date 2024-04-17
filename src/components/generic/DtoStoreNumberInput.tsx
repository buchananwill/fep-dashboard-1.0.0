import { HasId } from '@/app/api/main';
import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';
import { useDtoStoreDispatch } from 'dto-stores';
import { Input } from '@nextui-org/input';
import { ChangeEvent } from 'react';

export function DtoStoreNumberInput<
  T extends HasId,
  U extends string | number
>({
  entityId,
  entityType,
  numberUpdater,
  listenerKey,
  numberAccessor
}: {
  entityId: U;
  entityType: string;
  numberUpdater: (entity: T, value: number) => T;
  numberAccessor: (entity: T) => number;
  listenerKey: string;
}) {
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
      className={'rounded p-0.5 max-w-fit w-8'}
    ></input>
  );
}
