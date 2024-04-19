import {
  IntersectionGeneratorRow,
  IntersectionGeneratorRowWithHeader
} from '@/app/api/main';

export function createRows<T, U>(
  rows: T[],
  columns: U[],
  defaultValue: number
): IntersectionGeneratorRowWithHeader<T>[] {
  return rows.map((row, index) => ({
    id: index, // Plus any other details you need from the subject
    ...columns.reduce(
      (acc, level, index) => ({
        ...acc,
        [index.toString()]: defaultValue // Initialize level columns to 0
      }),
      {} as IntersectionGeneratorRow
    )
  }));
}