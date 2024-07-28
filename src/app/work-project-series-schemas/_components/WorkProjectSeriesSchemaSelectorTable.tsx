'use client';
import React, { useCallback } from 'react';
import { Chip } from '@nextui-org/react';
import FilterSelectEntityTable from '@/components/generic/FilterSelectEntityTable';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { AssetRoleDto } from '@/api/dtos/AssetRoleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';

export default function WorkProjectSeriesSchemaSelectorTable({
  workProjectSeriesSchemas
}: {
  workProjectSeriesSchemas: WorkProjectSeriesSchemaDto[];
}) {
  const renderCell = useCallback(
    (assetRoleDto: WorkProjectSeriesSchemaDto, columnKey: React.Key) => {
      const cellValue =
        assetRoleDto[
          columnKey as Extract<
            keyof Omit<WorkProjectSeriesSchemaDto, 'deliveryAllocations'>,
            string | number
          >
        ];

      const entityKey = columnKey as Extract<
        keyof Omit<WorkProjectSeriesSchemaDto, 'type'>,
        string | number
      >;

      switch (entityKey) {
        case 'name':
          return (
            <div className={'inline-block w-32 truncate'}>
              {assetRoleDto.name}
            </div>
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
        entities={workProjectSeriesSchemas}
        initialColumns={WorkProjectSeriesSchemaColumnsInitial}
        filterProperty={'name'}
        renderCell={renderCell}
        columns={WorkProjectSeriesSchemaColumns}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        idClass={'string'}
      />
    </>
  );
}

export const WorkProjectSeriesSchemaColumnsInitial: (keyof WorkProjectSeriesSchemaDto)[] =
  ['name', 'shortCode'];
export const WorkProjectSeriesSchemaColumns: Column<WorkProjectSeriesSchemaDto>[] =
  [
    { name: 'Name', uid: 'name', sortable: true },
    { name: 'Short Code', uid: 'shortCode', sortable: true }
  ];
