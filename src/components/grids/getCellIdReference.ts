import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/components/grids/CellQueryManager';
import { InnerCellContent } from '@/components/work-project-series-assignments/table-view/AssignmentCell';
import { ReactNode } from 'react';
import { Identifier } from 'dto-stores';

export type OuterCellProps = GridChildComponentProps<CellIdReference[][]> & {
  innerCell: (props: InnerCellContent) => ReactNode;
};
export type CellWrapperProps<
  T extends Identifier = Identifier,
  U extends Identifier = Identifier
> = GridChildComponentProps<CellIdReference<T, U>[][]>;

export type GenericIdReferenceCell = (props: CellWrapperProps) => ReactNode;

export function getCellIdReference<
  T extends Identifier = Identifier,
  U extends Identifier = Identifier
>({
  data,
  columnIndex,
  rowIndex
}: {
  data: CellIdReference<T, U>[][];
  rowIndex: number;
  columnIndex: number;
}) {
  return data[rowIndex][columnIndex];
}
