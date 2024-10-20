import { HasIdClass } from '@/api/types';
import React, { useCallback } from 'react';
import { EntityTypeKey } from '@/components/tables/types';
import { ColumnUid } from '@/types';
import {
  CellComponentRecord,
  InnerCell,
  TableCellDataWrapper
} from '@/components/tables/core-table-types';
import { Identifier } from 'dto-stores';
import { Get } from 'type-fest';
import TableDtoStoreCellWrapper from '@/components/tables/cells-v2/TableDtoStoreCellWrapper';
import { EntityClassMap } from '@/api/entity-class-map';

export function getCellRenderFunction<
  U extends EntityTypeKey,
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier = Identifier
>(
  entityTypeKey: U,
  cellComponents: CellComponentRecord<T, T_ID>
): TableCellDataWrapper<T, T_ID> {
  return function RenderCell({
    entityId,
    columnKey
  }: {
    entityId: T_ID;
    columnKey: ColumnUid<T>;
  }) {
    const CellComponentOptional = cellComponents[columnKey];

    if (CellComponentOptional !== undefined) {
      const CellComponentDefined = CellComponentOptional.component as InnerCell<
        Get<T, typeof columnKey>
      >;
      const updateFunctionMemo = CellComponentOptional.updater;
      return (
        <TableDtoStoreCellWrapper
          innerCell={CellComponentDefined}
          entityId={entityId}
          columnKey={columnKey}
          entityClass={EntityClassMap[entityTypeKey]}
          updateFunction={updateFunctionMemo}
        />
      );
    } else {
      return null;
    }
  };
}
