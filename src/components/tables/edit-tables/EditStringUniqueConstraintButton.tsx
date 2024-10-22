import { HasId } from '@/api/types';
import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { useDtoStoreDispatch } from 'dto-stores';
import React from 'react';
import {
  EditTextModalButton,
  EditTextValueModalButtonProps
} from '@/components/generic/EditTextValueModalButton';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { useUniqueStringFieldConstraint } from '@/hooks/useUniqueStringFieldConstraint';

export function EditStringUniqueConstraintButton<T extends HasId>(
  props: NextUiCellComponentProps<T> &
    Partial<
      Omit<EditTextValueModalButtonProps<T>, keyof NextUiCellComponentProps<T>>
    >
) {
  const { entityClass, entity, path, classNames, ...otherProps } = props;

  const validateInput = useUniqueStringFieldConstraint(
    entityClass,
    entity.id,
    path as TypedPaths<T, string | undefined>
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
      {...otherProps}
    />
  );
}
