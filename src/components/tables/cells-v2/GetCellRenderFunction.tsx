import { HasIdClass } from '@/api/types';
import React from 'react';
import { EntityTypeKey } from '@/components/tables/types';
import { ColumnUid } from '@/types';
import {
  CellComponentRecord,
  TableCellDataWrapper
} from '@/components/tables/core-table-types';
import { Identifier } from 'dto-stores';
import IdCellWrapper from '@/components/tables/cells-v2/IdCellWrapper';
import { EntityClassMap } from '@/api/entity-class-map';
import EntityCellWrapper from '@/components/tables/cells-v2/EntityCellWrapper';

export function getCellRenderFunction<
  U extends EntityTypeKey,
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier = T['id']
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
    const cellMappingOptional = cellComponents[columnKey];

    if (cellMappingOptional?.type === 'IdInnerCell') {
      const CellComponentDefined = cellMappingOptional.component;
      const updateFunctionMemo = cellMappingOptional.updater;
      return (
        <IdCellWrapper
          innerCell={CellComponentDefined}
          entityId={entityId}
          columnKey={columnKey}
          entityClass={EntityClassMap[entityTypeKey]}
          updateFunction={updateFunctionMemo}
        />
      );
    } else if (cellMappingOptional?.type === 'EntityInnerCell') {
      return (
        <EntityCellWrapper
          entityClass={EntityClassMap[entityTypeKey]}
          columnKey={columnKey}
          entityId={entityId}
          entityCell={cellMappingOptional.component}
        />
      );
    } else if (cellMappingOptional?.type === 'CustomCell') {
      const CustomCell = cellMappingOptional.component;
      return (
        <CustomCell
          entityId={entityId}
          columnKey={columnKey}
          entityClass={entityTypeKey}
        />
      );
    }

    return null;
  };
}
