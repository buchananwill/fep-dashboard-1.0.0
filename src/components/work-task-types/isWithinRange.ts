import { CellIndex } from '@/components/grids/createRowIdColumnIdCells';
import { isNotUndefined } from '@/api/main';

export function isWithinRange(
  cellIndexA: CellIndex,
  cellIndexB: CellIndex,
  cellToTest: CellIndex
): boolean {
  if (!cellIndexA || !cellIndexB || !cellToTest) return false;
  const { columnIndex: ciCellA, rowIndex: riCellA } = cellIndexA;
  const { columnIndex: ciCellB, rowIndex: riCellB } = cellIndexB;
  const { columnIndex: ciTest, rowIndex: riTest } = cellToTest;
  const allDefined =
    isNotUndefined(ciCellA) &&
    isNotUndefined(ciCellB) &&
    isNotUndefined(riCellA) &&
    isNotUndefined(riCellB) &&
    isNotUndefined(ciTest) &&
    isNotUndefined(riTest);
  if (!allDefined) return false;
  return (
    liesBetweenOrEqual(ciCellA, ciCellB, ciTest) &&
    liesBetweenOrEqual(riCellA, riCellB, riTest)
  );
}

function liesBetweenOrEqual(bound1: number, bound2: number, value: number) {
  return value >= Math.min(bound1, bound2) && value <= Math.max(bound1, bound2);
}