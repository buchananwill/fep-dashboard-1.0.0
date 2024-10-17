'use client';
import React, { useCallback } from 'react';
import { Chip } from '@nextui-org/react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { AssetRoleDto } from '@/api/generated-types/generated-types';
import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { StringValueChip } from '@/components/tables/StringValueChip';

export default function AssetRoleSelectorTable({
  entities
}: {
  entities: AssetRoleDto[];
}) {
  return (
    <>
      <FilterSelectEntityTable
        entities={entities}
        initialColumns={AssetRoleColumnsInitial}
        filterProperty={'assetName'}
        renderCell={assetRoleCell}
        columns={AssetRoleColumns}
        entityClass={EntityClassMap.assetRole}
      />
    </>
  );
}

export const AssetRoleColumnsInitial: (keyof AssetRoleDto)[] = [
  'assetName',
  'name'
];
export const AssetRoleColumns: Column<AssetRoleDto>[] = [
  { name: 'Asset Name', uid: 'assetName', sortable: true },
  { name: 'Asset Role Name', uid: 'name', sortable: true }
];

const assetRoleCell = getCellRenderFunction('assetRole', {
  assetName: SimpleValueToString,
  'type.name': SimpleValueToString,
  name: SimpleValueToString
});
