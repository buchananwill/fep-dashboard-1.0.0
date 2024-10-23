'use client';
import { AssetRoleDto } from '@/api/generated-types/generated-types';
import { useNavigationCallback } from '@/components/tables/edit-tables/WorkTaskTypeEditTable';
import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { Column, ColumnUid } from '@/types';
import { getTypeUpdateCell } from '@/components/tables/cells-v2/TypeUpdateCell';
import {
  AssetRoleColumns,
  AssetRoleColumnsInitial
} from '@/components/tables/selectorTables/AssetRoleSelectorTable';
import EntityEditTable from '@/components/tables/edit-v2/EntityEditTable';
import { getCellRenderFunction } from '@/components/tables/cells-v2/GetCellRenderFunction';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import EditNameCell from '@/components/tables/cells-v2/EditNameCell';
import { getStringUpdater } from '@/components/tables/edit-v2/cellUpdaterFunctions';
import { AnyValueToString } from '@/components/tables/cells-v2/AnyValueToString';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

const entityType = EntityClassMap.assetRole;

export default function AssetRoleEditTable({
  pathVariables
}: LeafComponentProps) {
  const navigationCallback = useNavigationCallback(
    '/' + ['core', pathVariables[0], 'create-new-role'].join('/')
  );

  return (
    <div className={'flex h-[75vh] flex-col gap-2 p-2'}>
      <EntityEditTable
        entityClass={entityType}
        stickyHeader
        columns={assetRoleEditColumns}
        cellModel={CellRenderFunction}
        defaultSort={Sorts.name}
        // addRow={navigationCallback}
      />
    </div>
  );
}

const assetRoleEditColumns: Column<AssetRoleDto>[] = [
  ...AssetRoleColumns,
  { name: 'Type', uid: 'type.name', sortable: true }
] as const;

const initialEditColumns: ColumnUid<AssetRoleDto>[] = [
  ...AssetRoleColumnsInitial,
  'type.name'
] as const;

const AssetCellRecord: CellComponentRecord<AssetRoleDto, number> = {
  name: {
    component: EditNameCell,
    type: 'IdInnerCell',
    updater: getStringUpdater('name')
  },
  assetName: { component: AnyValueToString, type: 'IdInnerCell' },
  'type.name': {
    component: getTypeUpdateCell('AssetRoleType'),
    type: 'IdInnerCell'
  }
};
const CellRenderFunction = getCellRenderFunction('assetRole', AssetCellRecord);
