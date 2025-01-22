import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/components/grids/CellQueryManager';
import { InnerCellContent } from '@/components/work-project-assignments/table-view/AssignmentCell';
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

const NanIdReference = { columnId: undefined, rowId: undefined } as const;

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
}): CellIdReference<T, U> | typeof NanIdReference {
  if (rowIndex !== undefined && columnIndex !== undefined && !!data) {
    const row = data[rowIndex];
    if (!!row) {
      const cell = row[columnIndex];
      if (!!cell) {
        return cell;
      }
    }
  }
  return NanIdReference;
}
