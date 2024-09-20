import { HasId, HasNumberId } from '@/api/types';
import React from 'react';
import { EntityTypeKey } from '@/components/tables/types';
import { EntityTypeMap } from '@/api/entity-type-map';
import { EntityClassMap } from '@/api/entity-class-map';
import { ColumnUid } from '@/types';
import { OneOf } from '@/components/types/oneOf';
import { HasStringId } from 'react-d3-force-wrapper';

export function getCellRenderFunction<
  U extends EntityTypeKey,
  T extends EntityTypeMap[U] = EntityTypeMap[U]
>(entityTypeKey: U, cellComponents: NextUiCellComponentRecord<T>) {
  return function RenderCell(entity: T, columnKey: React.Key) {
    const keyAsPath = columnKey as ColumnUid<T>;
    const CellComponentOptional = cellComponents[keyAsPath];

    if (CellComponentOptional !== undefined) {
      const CellComponentDefined =
        CellComponentOptional as NextUiCellComponent<T>;
      return (
        <CellComponentDefined
          path={keyAsPath}
          entity={entity}
          entityClass={EntityClassMap[entityTypeKey]}
        />
      );
    } else {
      return null;
    }
  };
}

export type NextUiCellComponentRecord<
  T extends OneOf<[HasNumberId, HasStringId]>
> = {
  [K in ColumnUid<T>]?: NextUiCellComponent<T>;
};
export type NextUiCellComponent<T extends HasId> = (
  props: NextUiCellComponentProps<T>
) => React.ReactNode;

export interface NextUiCellComponentProps<T extends HasId> {
  entity: T;
  entityClass: string;
  path: ColumnUid<T>;
}
