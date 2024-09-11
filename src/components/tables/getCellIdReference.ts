import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/components/tables/CellQueryManager';
import { InnerCellContent } from '@/components/work-project-series-assignments/table-view/AssignmentCell';
import { ReactNode } from 'react';

export type OuterCellProps = GridChildComponentProps<CellIdReference[][]> & {
  innerCell: (props: InnerCellContent) => ReactNode;
};
export type CellWrapperProps = GridChildComponentProps<CellIdReference[][]>;

export type GenericIdReferenceCell = (props: CellWrapperProps) => ReactNode;

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
