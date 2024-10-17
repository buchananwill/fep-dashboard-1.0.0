'use client';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import { ProviderRoleDto } from '@/api/generated-types/generated-types';
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

const entityType = EntityClassMap.providerRole;

export default function ProviderRoleEditTable({
  pathVariables
}: LeafComponentProps) {
  const entities = useFilterOutDeletedEntities<ProviderRoleDto>(entityType);
  const navigationCallback = useNavigationCallback(
    '/' + ['core', pathVariables[0], 'create-new-role'].join('/')
  );

  return (
    <FilterSelectEntityTable
      entityClass={entityType}
      entities={entities}
      columns={providerEditColumns}
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

const providerEditColumns: Column<ProviderRoleDto>[] = [
  ...providerColumns,
  { uid: 'name', name: 'Name', sortable: true }
] as const;

const initialEditColumns: ColumnUid<ProviderRoleDto>[] = [
  ...ProviderColumnsInitial,
  'type.name'
] as const;

const cellRenderFunction = getCellRenderFunction('providerRole', {
  name: EditTextPropertyCell,
  partyName: SimpleValueToString,
  knowledgeDomainName: KnowledgeDomainSelectCell,
  'type.name': getTypeUpdateCell('ProviderRoleType')
});
