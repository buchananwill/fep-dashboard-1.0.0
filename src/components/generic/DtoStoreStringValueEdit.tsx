import { HasId } from '@/api/main';
import { useDtoStore } from 'dto-stores';
import { Input, InputProps } from '@nextui-org/input';

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
    id,
    entityClass,
    listenerKey
  });

  if (valueAccessor === undefined) {
    console.error('No value accessor supplied');
    return null;
  }

  const update = (value: string) => {
    if (dispatchWithoutControl === undefined) {
      console.error('no dispatch defined!');
      return;
    }
    if (producer === undefined) {
      console.error('no producer defined!');
      return;
    }
    dispatchWithoutControl((entityState) => producer(value, entityState));
  };

  return (
    <Input
      type={'text'}
      value={valueAccessor(entity)}
      onValueChange={update}
      {...inputProps}
    ></Input>
  );
}
