// TODO -> DELETE BELOW AFTER TESTING

import { EntityTypeKey } from '@/components/tables/types';
import { EntityTypeMap } from '@/api/entity-type-map';
import {
  NextUiCellComponent,
  NextUiCellComponentRecord
} from '@/components/tables/GetCellRenderFunction';
import { EntityClassMap, EntityNameSpace } from '@/api/entity-class-map';
import React from 'react';
import { Paths } from 'type-fest';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { StringValueChip } from '@/components/tables/StringValueChip';
import { HasId } from '@/api/types';

export function getCellRenderFunction<
  U extends EntityTypeKey,
  T extends HasId = EntityTypeMap[U]
>(
  entityTypeKey: U,
  cellComponents: NextUiCellComponentRecord<T> & {
    action?: NextUiCellComponent<T>;
  }
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
          entityClass={EntityClassMap[entityTypeKey]}
        />
      );
    } else {
      return null;
    }
  };
}

export const KnowledgeDomainReadOnlyCell = getCellRenderFunction(
  'knowledgeDomain',
  {
    name: SimpleValueToString,
    shortCode: StringValueChip
  }
);
