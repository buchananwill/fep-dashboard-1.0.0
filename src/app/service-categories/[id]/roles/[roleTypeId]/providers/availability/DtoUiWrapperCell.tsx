import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CellQueryManager';
import { BaseDtoUiProps, DtoUiWrapper, Entity } from 'dto-stores';
import { ReactNode } from 'react';

export default function DtoUiWrapperCell<T extends Entity>(
  props: GridChildComponentProps<CellIdReference[][]> & {
    InnerCell: (props: BaseDtoUiProps<T>) => ReactNode;
    entityClass: string;
    idKey: keyof CellIdReference;
  }
) {
  const { columnIndex, rowIndex, data, style, entityClass, InnerCell, idKey } =
    props;
  const cellIdReference = data[rowIndex][columnIndex];

  return (
    <div style={style} className={'flex overflow-hidden'}>
      <DtoUiWrapper
        entityClass={entityClass}
        entityId={cellIdReference[idKey]}
        renderAs={InnerCell}
      />
    </div>
  );
}
