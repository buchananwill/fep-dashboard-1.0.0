'use client';
import React from 'react';
import { Chip } from '@nextui-org/react';
import FilterSelectEntityTable from '@/components/generic/FilterSelectEntityTable';
import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { Paths } from 'type-fest';
import { getValue } from '@/functions/allowingNestedFiltering';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types_';
import { TypedPaths } from '@/functions/typePaths';

export const INITIAL_VISIBLE_COLUMNS: Paths<WorkTaskTypeDto>[] = [
  'name',
  'knowledgeDomain.name',
  'knowledgeLevel.levelOrdinal'
];
export const columns: Column<WorkTaskTypeDto>[] = [
  { name: 'Name', uid: 'name', sortable: true },
  { name: 'Subject', uid: 'knowledgeDomain.name', sortable: true },
  { name: 'Year', uid: 'knowledgeLevel.levelOrdinal', sortable: true }
];
export default function WorkTaskTypeSelectorTable({
  workTaskTypes
}: {
  workTaskTypes: WorkTaskTypeDto[];
}) {
  const renderCell = React.useCallback(
    (workTaskTypeDto: WorkTaskTypeDto, columnKey: React.Key) => {
      const pathKey = columnKey as TypedPaths<WorkTaskTypeDto, string | number>;
      const cellValue = getValue(workTaskTypeDto, pathKey);

      switch (pathKey) {
        case 'name':
          return (
            <span className={'inline-block w-32 truncate'}>
              {workTaskTypeDto.name}
            </span>
          );
        case 'knowledgeLevel.levelOrdinal':
          return (
            <span className="inline-block w-24  text-sm">{cellValue}</span>
          );
        case 'knowledgeDomain.name':
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
