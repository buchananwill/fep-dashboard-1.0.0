import { HasId } from '@/app/api/main';
import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';
import { useDtoStoreDispatch } from 'dto-stores';
import { Input } from '@nextui-org/input';

export function DtoStoreRename<T extends HasId & HasNameDto>({
  entity,
  entityType
}: {
  entity: T;
  entityType: string;
}) {
  let { currentState, dispatchWithoutControl } = useDtoStoreDispatch<T>(
    entity.id,
    entityType,
    'renameCell'
  );

  const update = (value: string) => {
    if (dispatchWithoutControl === undefined) {
      console.log('no dispatch defined!');
      return;
    }
    dispatchWithoutControl((entity) => ({ ...entity, name: value }));
  };

  return (
    <Input
      type={'text'}
      value={currentState.name}
      onValueChange={update}
    ></Input>
  );
}
