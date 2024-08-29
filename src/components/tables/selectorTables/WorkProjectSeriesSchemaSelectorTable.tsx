'use client';
import React, { useCallback } from 'react';
import FilterSelectEntityTable from '@/components/generic/FilterSelectEntityTable';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { Paths } from 'type-fest';

export default function WorkProjectSeriesSchemaSelectorTable({
  workProjectSeriesSchemas
}: {
  workProjectSeriesSchemas: WorkProjectSeriesSchemaDto[];
}) {
  const renderCell = useCallback(
    (
      workProjectSeriesSchemaDto: WorkProjectSeriesSchemaDto,
      columnKey: React.Key
    ) => {
      const cellValue =
        workProjectSeriesSchemaDto[
          columnKey as Extract<
            keyof Omit<
              WorkProjectSeriesSchemaDto,
              'deliveryAllocations' | 'workTaskType'
            >,
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
              {workProjectSeriesSchemaDto.name}
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

export const WorkProjectSeriesSchemaColumnsInitial: Paths<WorkProjectSeriesSchemaDto>[] =
  [
    'name',
    'workTaskType.knowledgeDomain.name',
    'workTaskType.knowledgeDomain.shortCode'
  ];
export const WorkProjectSeriesSchemaColumns: Column<WorkProjectSeriesSchemaDto>[] =
  [
    { name: 'Name', uid: 'name', sortable: true },
    {
      name: 'Short Code',
      uid: 'workTaskType.knowledgeDomain.shortCode',
      sortable: true
    }
  ];
