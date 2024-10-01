'use client';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { useCellIdReferences } from '@/components/work-task-types/useCellIdReferences';
import { useDtoStoreDispatchAndListener } from 'dto-stores/dist/hooks/main/store/useDtoStoreDispatchAndListener';
import { CellEntityClass } from '@/components/roles/suitability/SuitabilityCellManager';
import { SuitabilityMatrixCell } from '@/components/work-task-types/suitabilityMatrixCell';
import { GenericSuitabilityCell } from '@/components/work-task-types/GenericSuitabilityCell';

export function joinRowAndColumnId(
  rowId: string | number | undefined,
  columnId: string | number | undefined
) {
  return `${rowId}:${columnId}`;
}

export function WorkTaskTypeMatrixCell(props: CellWrapperProps) {
  const { columnId, rowId } = useCellIdReferences(props);
  const { currentState: currentCell, dispatchWithoutControl: setCurrentCell } =
    useDtoStoreDispatchAndListener<SuitabilityMatrixCell>(
      joinRowAndColumnId(rowId, columnId),
      CellEntityClass
    );

  return (
    <div style={props.style}>
      <GenericSuitabilityCell
        currentCell={currentCell}
        setCurrentCell={setCurrentCell}
        {...props}
      />
    </div>
  );
}
