import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/components/tables/CellQueryManager';
import { BaseDtoUiProps, DtoUiWrapper, Entity } from 'dto-stores';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { GenericDivProps } from '@/components/react-flow/work-schema-node/BaseWorkSchemaNode';

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
  const cellIdReference = data[rowIndex][columnIndex];

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
