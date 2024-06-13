'use client';
import React, { useCallback, useRef } from 'react';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import FilterSelectContextTable from '@/app/service-categories/[id]/work-task-types/_components/FilterSelectContextTable';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { useGlobalDispatch } from 'selective-context';
import {
  TooltipContext,
  TooltipContextInterface
} from '@/app/service-categories/[id]/roles/providers/_components/TooltipSingleton';
import { offset, useFloating } from '@floating-ui/react';

export default function ProviderRoleSelectorTable({
  providerRoles
}: {
  providerRoles: ProviderRoleDto[];
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
      <FilterSelectContextTable
        entities={providerRoles}
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
