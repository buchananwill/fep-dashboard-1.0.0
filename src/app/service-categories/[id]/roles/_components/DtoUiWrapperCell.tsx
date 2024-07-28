import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/components/tables/CellQueryManager';
import { BaseDtoUiProps, DtoUiWrapper, Entity } from 'dto-stores';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { GenericDivProps } from '@/components/react-flow/work-schema-node/BaseWorkSchemaNode';
import { getCellIdReference } from '@/components/tables/getCellIdReference';

export default function DtoUiWrapperCell<T extends Entity>(
  props: GridChildComponentProps<CellIdReference[][]> & {
    InnerCell: (props: BaseDtoUiProps<T>) => ReactNode;
    entityClass: string;
    idKey: keyof CellIdReference;
  } & Omit<GenericDivProps, 'style' | 'children'>
) {
  const {
    columnIndex,
    rowIndex,
    data,
    style,
    entityClass,
    InnerCell,
    idKey,
    className
  } = props;
  if (data.length === 0) return null;
  const cellIdReference = getCellIdReference({ data, columnIndex, rowIndex });

  return (
    <div style={style} className={clsx('flex overflow-hidden', className)}>
      <DtoUiWrapper
        entityClass={entityClass}
        entityId={cellIdReference[idKey]}
        renderAs={InnerCell}
      />
    </div>
  );
}
