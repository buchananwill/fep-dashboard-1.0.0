'use client';
import React from 'react';
import { Chip } from '@nextui-org/react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { ProviderRoleDto } from '@/api/generated-types/generated-types';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { getDomainAlias } from '@/api/getDomainAlias';
import { StringValueChip } from '@/components/tables/StringValueChip';

export default function ProviderRoleSelectorTable({
  entities
}: {
  entities: ProviderRoleDto[];
}) {
  return (
    <>
      <FilterSelectEntityTable
        entities={entities}
        initialColumns={ProviderColumnsInitial}
        filterProperty={'partyName'}
        renderCell={providerRoleCell}
        columns={providerColumns}
        entityClass={EntityClassMap.providerRole}
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

const providerRoleCell = getCellRenderFunction('providerRole', {
  partyName: SimpleValueToString,
  knowledgeDomainName: StringValueChip,
  'type.name': SimpleValueToString
});
