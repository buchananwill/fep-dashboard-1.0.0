import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { HasId } from '@/api/types';
import { useDtoStoreDispatch } from 'dto-stores';
import { EditTextModalButton } from '@/components/generic/EditTextValueModalButton';
import { TypedPaths } from '@/api/custom-types/typePaths';

export default function EditTextPropertyCell<T extends HasId>({
  entity,
  entityClass,
  path
}: NextUiCellComponentProps<T>) {
  const { dispatchWithoutListen } = useDtoStoreDispatch(entity.id, entityClass);

  return (
    <EditTextModalButton
      stringPath={path as TypedPaths<T, string>}
      entity={entity}
      entityClass={entityClass}
      dispatchWithoutControl={dispatchWithoutListen}
    />
  );
}
