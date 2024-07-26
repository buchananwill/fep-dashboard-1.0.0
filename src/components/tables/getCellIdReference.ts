import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/components/tables/CellQueryManager';
import { InnerCellContent } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { ReactNode } from 'react';

export type OuterCellProps = GridChildComponentProps<CellIdReference[][]> & {
  innerCell: (props: InnerCellContent) => ReactNode;
};
export type CellWrapperProps = GridChildComponentProps<CellIdReference[][]>;

export function getCellIdReference({
  data,
  columnIndex,
  rowIndex
}: {
  data: CellIdReference[][];
  rowIndex: number;
  columnIndex: number;
}) {
  return data[rowIndex][columnIndex];
}
