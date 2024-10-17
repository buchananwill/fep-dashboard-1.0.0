'use client';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import {
  AssetRoleDto,
  ProviderRoleDto
} from '@/api/generated-types/generated-types';
import { useNavigationCallback } from '@/components/tables/edit-tables/WorkTaskTypeEditTable';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import {
  providerColumns,
  ProviderColumnsInitial
} from '@/components/tables/selectorTables/ProviderRoleSelectorTable';
import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import EditTextPropertyCell from '@/components/tables/cells/EditTextPropertyCell';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { Column, ColumnUid } from '@/types';
import { getTypeUpdateCell } from '@/components/tables/cells/TypeUpdateCell';
import { KnowledgeDomainSelectCell } from '@/components/tables/cells/SelectKnowledgeDomainCell';
import {
  AssetRoleColumns,
  AssetRoleColumnsInitial
} from '@/components/tables/selectorTables/AssetRoleSelectorTable';

const entityType = EntityClassMap.assetRole;

export default function AssetRoleEditTable({
  pathVariables
}: LeafComponentProps) {
  const entities = useFilterOutDeletedEntities<AssetRoleDto>(entityType);
  const navigationCallback = useNavigationCallback(
    '/' + ['core', pathVariables[0], 'create-new-role'].join('/')
  );

  return (
    <FilterSelectEntityTable
      entityClass={entityType}
      entities={entities}
      columns={assetRoleEditColumns}
      selectionMode={'none'}
      initialColumns={initialEditColumns}
      filterProperty={'name'}
      renderCell={cellRenderFunction}
      isCompact={true}
      classNames={{
        wrapper: 'w-[90vw] h-[70vh]',
        td: 'py-0.5'
      }}
      addRow={navigationCallback}
    />
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

const cellRenderFunction = getCellRenderFunction('assetRole', {
  name: EditTextPropertyCell,
  assetName: SimpleValueToString,
  'type.name': getTypeUpdateCell('AssetRoleType')
});
