'use client';
import React from 'react';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { AssetRoleDto } from '@/api/generated-types/generated-types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import { AnyValueToString } from '@/components/tables/cells-v2/AnyValueToString';
import { getCellRenderFunction } from '@/components/tables/cells-v2/GetCellRenderFunction';

export default function AssetRoleSelectorTable({
  entities
}: {
  entities: AssetRoleDto[];
}) {
  return (
    <>
      <EntityTable
        cellModel={assetRoleCell}
        columns={AssetRoleColumns}
        entityClass={EntityClassMap.assetRole}
        defaultSort={Sorts.name}
        withSelection={'multiple'}
      />
    </>
  );
}

export const AssetRoleColumns: Column<AssetRoleDto>[] = [
  { name: 'Asset Name', uid: 'assetName', sortable: true },
  { name: 'Asset Role Name', uid: 'name', sortable: true },
  { name: 'Type', uid: 'type.name', sortable: true }
];

const AssetCellRecord: CellComponentRecord<AssetRoleDto, number> = {
  name: {
    component: AnyValueToString,
    type: 'IdInnerCell'
  },
  assetName: { component: AnyValueToString, type: 'IdInnerCell' },
  'type.name': {
    component: AnyValueToString,
    type: 'IdInnerCell'
  }
};

const assetRoleCell = getCellRenderFunction('assetRole', AssetCellRecord);
