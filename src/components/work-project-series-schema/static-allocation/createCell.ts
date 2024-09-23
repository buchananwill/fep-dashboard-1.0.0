import { Identifier } from 'dto-stores';

export interface Cell<T> {
  id: string;
  data: T;
}

export function joinCellId(
  entityClass: string,
  rowId: Identifier | undefined,
  columnId: Identifier | undefined
) {
  return `${entityClass}:${rowId}:${columnId}`;
}

export function createCell<T>(
  entityClass: string,
  rowId: Identifier,
  columnId: Identifier,
  data: T
) {
  return { id: joinCellId(entityClass, rowId, columnId), data };
}