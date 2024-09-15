import { HasId } from '@/api/types';
import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { useDtoStoreDispatch } from 'dto-stores';
import React from 'react';
import {
  EditTextModalButton,
  EditTextValueModalButtonProps
} from '@/components/generic/EditTextValueModalButton';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { useUniqueStringFieldConstraint } from '@/components/tables/edit-tables/useUniqueStringFieldConstraint';

export function EditStringUniqueConstraintButton<T extends HasId>(
  props: NextUiCellComponentProps<T> &
    Pick<EditTextValueModalButtonProps<T>, 'classNames'>
) {
  const { entityClass, entity, path, classNames } = props;

  const validateInput = useUniqueStringFieldConstraint(
    entityClass,
    entity,
    path as TypedPaths<T, string>
  );

  const { dispatchWithoutListen } = useDtoStoreDispatch(entity.id, entityClass);

  return (
    <EditTextModalButton
      classNames={classNames}
      stringPath={path as TypedPaths<T, string>}
      entity={entity}
      entityClass={entityClass}
      validateInput={validateInput}
      dispatchWithoutControl={dispatchWithoutListen}
    />
  );
}
