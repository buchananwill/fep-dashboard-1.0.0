import { CellIndex } from '@/components/grids/createRowIdColumnIdCells';
import { isNotUndefined } from '@/api/main';

export function isWithinRange(
  cellToTest: CellIndex,
  ...bounds: (CellIndex | undefined)[]
): boolean {
  const filteredBounds = bounds ? bounds.filter(isNotUndefined) : [];
  if (filteredBounds.length === 0 || !cellToTest) return false;
  const { columnIndex: ciTest, rowIndex: riTest } = cellToTest;
  const rowBounds = getRowBounds(filteredBounds);
  const columnBounds = getColumnBounds(filteredBounds);
  const allDefined =
    rowBounds.length > 0 &&
    columnBounds.length > 0 &&
    isNotUndefined(ciTest) &&
    isNotUndefined(riTest);
  if (!allDefined) return false;
  return (
    liesBetweenOrEqual(ciTest, ...columnBounds) &&
    liesBetweenOrEqual(riTest, ...rowBounds)
  );
}

function liesBetweenOrEqual(value: number, ...bounds: number[]) {
  return value >= Math.min(...bounds) && value <= Math.max(...bounds);
}

function equalsLowerBound(value: number, ...bounds: number[]) {
  return value === Math.min(...bounds);
}

function equalsUpperBound(value: number, ...bounds: number[]) {
  return value === Math.max(...bounds);
}

interface BoundaryCheck {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

function getRowBounds(filteredBounds: CellIndex[]) {
  return filteredBounds.map((cell) => cell.rowIndex).filter(isNotUndefined);
}

function getColumnBounds(filteredBounds: CellIndex[]) {
  return filteredBounds.map((cell) => cell.columnIndex).filter(isNotUndefined);
}

export function liesOnBoundary(
  cellToTest: CellIndex,
  ...bounds: (CellIndex | undefined)[]
): BoundaryCheck {
  const filteredBounds = bounds ? bounds.filter(isNotUndefined) : [];
  if (
    filteredBounds.length === 0 ||
    !cellToTest ||
    !isNotUndefined(cellToTest.rowIndex) ||
    !isNotUndefined(cellToTest.columnIndex)
  )
    return {};
  const rowBounds = getRowBounds(filteredBounds);
  const columnBounds = getColumnBounds(filteredBounds);
  const withinRange = isWithinRange(cellToTest, ...filteredBounds);
  console.log(cellToTest, columnBounds, rowBounds, withinRange);
  return {
    top: equalsLowerBound(cellToTest.rowIndex, ...rowBounds) && withinRange,
    bottom: equalsUpperBound(cellToTest.rowIndex, ...rowBounds) && withinRange,
    left:
      equalsLowerBound(cellToTest.columnIndex, ...columnBounds) && withinRange,
    right:
      equalsUpperBound(cellToTest.columnIndex, ...columnBounds) && withinRange
  };
}
