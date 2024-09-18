import { Identifier } from 'dto-stores';
import {
  CellWrapperProps,
  getCellIdReference
} from '@/components/grids/getCellIdReference';
import { useMemo } from 'react';

export function useCellIdReferences<T extends Identifier, U extends Identifier>(
  props: CellWrapperProps<T, U>
) {
  const { data, columnIndex, rowIndex } = props;
  return useMemo(() => {
    return getCellIdReference<T, U>({ data, columnIndex, rowIndex });
  }, [data, columnIndex, rowIndex]);
}