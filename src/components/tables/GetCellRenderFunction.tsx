import { HasId } from '@/api/types';
import { Paths } from 'type-fest';
import React from 'react';

export function getCellRenderFunction<T extends HasId>(
  cellComponents: NextUiCellComponentRecord<T> & {
    action?: NextUiCellComponent<T>;
  },
  entityClass: string
) {
  return function RenderCell(entity: T, columnKey: React.Key) {
    const keyAsPath = columnKey as Paths<T>;
    const CellComponentOptional = cellComponents[keyAsPath];

    if (CellComponentOptional !== undefined) {
      const CellComponentDefined =
        CellComponentOptional as NextUiCellComponent<T>;
      return (
        <CellComponentDefined
          path={keyAsPath}
          entity={entity}
          entityClass={entityClass}
        />
      );
    } else {
      return null;
    }
  };
}

export type NextUiCellComponentRecord<T extends HasId> = {
  [K in Paths<T>]?: NextUiCellComponent<T> | never;
};
export type NextUiCellComponent<T extends HasId> = (
  props: NextUiCellComponentProps<T>
) => React.ReactNode;

export interface NextUiCellComponentProps<T extends HasId> {
  entity: T;
  entityClass: string;
  path: Paths<T>;
}
