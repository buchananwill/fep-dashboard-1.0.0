import { HasId } from '@/api/types';
import { Paths } from 'type-fest';
import React from 'react';
import { EntityTypeKey } from '@/components/tables/types';
import { EntityTypeMap } from '@/api/entity-type-map';
import { EntityClassMap, EntityNameSpace } from '@/api/entity-class-map';

export function getCellRenderFunction<
  U extends EntityTypeKey,
  T extends EntityTypeMap[U]
>(
  cellComponents: NextUiCellComponentRecord<T> & {
    action?: NextUiCellComponent<T>;
  },
  entityClass: EntityNameSpace<U>
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
  [K in Paths<T>]?: K extends Paths<T> ? NextUiCellComponent<T> | never : never;
};
export type NextUiCellComponent<T extends HasId> = (
  props: NextUiCellComponentProps<T>
) => React.ReactNode;

export interface NextUiCellComponentProps<T extends HasId> {
  entity: T;
  entityClass: string;
  path: Paths<T>;
}
