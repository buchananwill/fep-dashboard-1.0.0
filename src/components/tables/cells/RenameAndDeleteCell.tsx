import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { HasNameDto } from '@/api/generated-types/generated-types';
import { DtoUiWrapper } from 'dto-stores';
import React from 'react';
import {
  EditTextDeleteEntityPopover,
  EditTextDeletePopoverProps
} from '@/components/generic/EditTextDeleteEntityPopover';
import { HasId } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { useUniqueStringFieldConstraint } from '@/hooks/useUniqueStringFieldConstraint';

export function RenameAndDeleteCell<T extends HasNameDto & HasId>({
  entity,
  entityClass
}: NextUiCellComponentProps<T>) {
  const validator = useUniqueStringFieldConstraint(
    entityClass,
    entity.id,
    'name' as TypedPaths<T, string>
  );

  return (
    <DtoUiWrapper<T, EditTextDeletePopoverProps<T>>
      stringPath={'name' as TypedPaths<T, string>}
      entityClass={entityClass}
      entityId={entity.id}
      renderAs={EditTextDeleteEntityPopover}
      validateInput={validator}
    />
  );
}

function getRenameAndDeleteTableCell<T extends HasId & HasNameDto>(
  entityClass: string
) {
  return function RenameAndDeleteComposedCell(
    props: NextUiCellComponentProps<T>
  ) {
    return <RenameAndDeleteCell {...props} entityClass={entityClass} />;
  };
}
