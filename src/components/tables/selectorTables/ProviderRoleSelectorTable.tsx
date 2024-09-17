'use client';
import React from 'react';
import { Chip } from '@nextui-org/react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { ProviderRoleDto } from '@/api/generated-types/generated-types';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';

export default function ProviderRoleSelectorTable({
  entities
}: {
  entities: ProviderRoleDto[];
}) {
  const renderCell = React.useCallback(
    (providerRoleDto: ProviderRoleDto, columnKey: React.Key) => {
      const cellValue =
        providerRoleDto[
          columnKey as Extract<
            keyof Omit<ProviderRoleDto, 'type'>,
            string | number
          >
        ];

      switch (columnKey) {
        case 'partyName':
          return (
            <div className={'inline-block w-32 truncate'}>
              {providerRoleDto.partyName}
            </div>
          );
        case 'knowledgeDomainName':
          return (
            <span className={'inline-block w-20'}>
              <Chip
                className={'max-w-full truncate'}
                color={'secondary'}
                size="sm"
                variant="flat"
              >
                {providerRoleDto.knowledgeDomainName}
              </Chip>
            </span>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <FilterSelectEntityTable
        entities={entities}
        initialColumns={ProviderColumnsInitial}
        filterProperty={'partyName'}
        renderCell={renderCell}
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
  { name: 'Name', uid: 'partyName', sortable: true },
  { name: 'Main Subject', uid: 'knowledgeDomainName', sortable: true }
];
