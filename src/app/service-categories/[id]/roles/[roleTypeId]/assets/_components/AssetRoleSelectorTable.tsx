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
import FilterSelectEntityTable from '@/components/generic/FilterSelectEntityTable';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { useGlobalDispatch } from 'selective-context';
import {
  TooltipContext,
  TooltipContextInterface
} from '@/components/generic/TooltipSingleton';
import { offset, useFloating } from '@floating-ui/react';
import { AssetRoleDto } from '@/api/dtos/AssetRoleDtoSchema';

export default function AssetRoleSelectorTable({
  assetRoles
}: {
  assetRoles: AssetRoleDto[];
}) {
  const renderCell = useCallback(
    (assetRoleDto: AssetRoleDto, columnKey: React.Key) => {
      const cellValue =
        assetRoleDto[
          columnKey as Extract<
            keyof Omit<AssetRoleDto, 'type'>,
            string | number
          >
        ];

      switch (columnKey) {
        case 'assetName':
          return (
            <div className={'inline-block w-32 truncate'}>
              {assetRoleDto.assetName}
            </div>
          );
        case 'name':
          return (
            <span className={'inline-block w-20'}>
              <Chip
                className={'max-w-full truncate'}
                color={'secondary'}
                size="sm"
                variant="flat"
              >
                {assetRoleDto.name}
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
        entities={assetRoles}
        initialColumns={AssetRoleColumnsInitial}
        filterProperty={'assetName'}
        renderCell={renderCell}
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
