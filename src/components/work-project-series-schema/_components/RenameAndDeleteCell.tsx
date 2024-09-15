import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { HasName } from '@/api/generated-types/generated-types';
import { DtoUiWrapper } from 'dto-stores';
import React from 'react';
import {
  EditTextDeleteEntityPopover,
  EditTextDeletePopoverProps
} from '@/components/generic/EditTextDeleteEntityPopover';
import { HasId } from '@/api/types';
import { StringPropertyKey } from '@/types';

export function RenameAndDeleteCell<T extends HasName & HasId>({
  entity,
  entityClass
}: NextUiCellComponentProps<T>) {
  return (
    <DtoUiWrapper<T, EditTextDeletePopoverProps<T>>
      stringKey={'name' as StringPropertyKey<T>}
      entityClass={entityClass}
      entityId={entity.id}
      renderAs={EditTextDeleteEntityPopover}
    />
  );
}

function getRenameAndDeleteTableCell<T extends HasId & HasName>(
  entityClass: string
) {
  return function RenameAndDeleteComposedCell(
    props: NextUiCellComponentProps<T>
  ) {
    return <RenameAndDeleteCell {...props} entityClass={entityClass} />;
  };
}
