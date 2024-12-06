'use client';
import React from 'react';
import { ProviderRoleDto } from '@/api/generated-types/generated-types';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDomainAlias } from '@/api/getDomainAlias';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import { AnyValueToString } from '@/components/tables/cells-v2/generic/AnyValueToString';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

export default function ProviderRoleSelectorTable({
  entities
}: {
  entities: ProviderRoleDto[];
}) {
  return (
    <>
      <EntityTable
        cellModel={providerRoleCell}
        columns={providerColumns}
        entityClass={EntityClassMap.providerRole}
        defaultSort={Sorts.name}
        withSelection={'multiple'}
      />
    </>
  );
}

export const ProviderColumnsInitial: (keyof ProviderRoleDto)[] = [
  'partyName',
  'knowledgeDomainName'
];
export const providerColumns: Column<ProviderRoleDto>[] = [
  { name: 'Party Name', uid: 'partyName', sortable: true },
  {
    name: `Main ${getDomainAlias('knowledgeDomain')}`,
    uid: 'knowledgeDomainName',
    sortable: true
  },
  {
    name: 'Type',
    uid: 'type.name',
    sortable: true
  }
];

const cellComponentRecord: CellComponentRecord<ProviderRoleDto> = {
  partyName: { type: 'IdInnerCell', component: AnyValueToString },
  knowledgeDomainName: { type: 'IdInnerCell', component: AnyValueToString },
  'type.name': { type: 'IdInnerCell', component: AnyValueToString }
} as const;

const providerRoleCell = getCellRenderFunction(
  'providerRole',
  cellComponentRecord
);
