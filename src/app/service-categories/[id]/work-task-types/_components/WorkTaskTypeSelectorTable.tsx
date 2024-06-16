'use client';
import React from 'react';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
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
import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';

export const INITIAL_VISIBLE_COLUMNS: (keyof WorkTaskTypeDto)[] = [
  'name',
  'knowledgeDomainName',
  'knowledgeLevelName'
];
export const columns: Column<WorkTaskTypeDto>[] = [
  { name: 'Name', uid: 'name', sortable: true },
  { name: 'Subject', uid: 'knowledgeDomainName', sortable: true },
  { name: 'Year', uid: 'knowledgeLevelName', sortable: true },
  { name: 'Validation', uid: 'deliveryValidationTypeName', sortable: true }
];
export default function WorkTaskTypeSelectorTable({
  workTaskTypes
}: {
  workTaskTypes: WorkTaskTypeDto[];
}) {
  const renderCell = React.useCallback(
    (workTaskTypeDto: WorkTaskTypeDto, columnKey: React.Key) => {
      const cellValue = workTaskTypeDto[columnKey as keyof WorkTaskTypeDto];

      switch (columnKey) {
        case 'name':
          return (
            <span className={'inline-block w-32 truncate'}>
              {workTaskTypeDto.name}
            </span>
          );
        case 'knowledgeDomainName':
          return (
            <span className="inline-block w-24  text-sm">{cellValue}</span>
          );
        case 'knowledgeLevelName':
          return (
            <span className={'inline-block w-20'}>
              <Chip
                className={'max-w-full truncate'}
                color={'secondary'}
                size="sm"
                variant="flat"
              >
                {cellValue}
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
    <FilterSelectEntityTable
      entities={workTaskTypes}
      initialColumns={INITIAL_VISIBLE_COLUMNS}
      filterProperty={'name'}
      renderCell={renderCell}
      columns={columns}
      entityClass={EntityClassMap.workTaskType}
    />
  );
}