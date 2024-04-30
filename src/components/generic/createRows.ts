import {
  IntersectionGeneratorRow,
  IntersectionGeneratorRowWithHeader
} from '@/app/api/main';

export function createRows<T, U>(
  rows: T[],
  columns: U[],
  defaultValue: number,
  lookUpFunction?: (row: T, column: U) => number | undefined
): IntersectionGeneratorRowWithHeader<T>[] {
  return rows.map((row, index) => ({
    id: index, // Plus any other details you need from the subject
    ...columns.reduce(
      (acc, column, index) => ({
        ...acc,
        [index.toString()]: lookUpFunction
          ? lookUpFunction(row, column) || defaultValue
          : defaultValue // Initialize column columns to 0
      }),
      {} as IntersectionGeneratorRow
    )
  }));
}
