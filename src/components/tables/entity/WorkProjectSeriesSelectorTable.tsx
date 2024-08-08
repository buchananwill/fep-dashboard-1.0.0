'use client';
import React, { useCallback } from 'react';
import { Chip } from '@nextui-org/react';
import FilterSelectEntityTable from '@/components/generic/FilterSelectEntityTable';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { AssetRoleDto } from '@/api/dtos/AssetRoleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { WorkProjectSeriesLeanDto } from '@/components/work-project-series-metrics/WorkProjectSeriesTableDataFetcher';
import { WorkProjectSeriesWithSchemaLabelsDto } from '@/api/generated-types/generated-types_';
import { Paths } from 'type-fest';
import { getValue } from '@/functions/allowingNestedFiltering';

export default function WorkProjectSeriesSelectorTable({
  workProjectSeries
}: {
  workProjectSeries: WorkProjectSeriesWithSchemaLabelsDto[];
}) {
  const renderCell = useCallback(
    (
      workProjectSeriesLeanDto: WorkProjectSeriesWithSchemaLabelsDto,
      columnKey: React.Key
    ) => {
      const cellValue =
        workProjectSeriesLeanDto[
          columnKey as Extract<
            keyof Omit<
              WorkProjectSeriesWithSchemaLabelsDto,
              'workProjectSeriesSchema' | 'completedStatus'
            >,
            string | number
          >
        ];

      const entityKey =
        columnKey as Paths<WorkProjectSeriesWithSchemaLabelsDto>;

      switch (entityKey) {
        case 'id':
          return (
            <div className={'inline-block w-32 truncate'}>
              {workProjectSeriesLeanDto.id}
            </div>
          );
        case 'workProjectSeriesSchema.workTaskType.name':
          return (
            <div className={'inline-block w-32 truncate'}>
              {getValue(workProjectSeriesLeanDto, entityKey)}
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
        entities={workProjectSeries}
        initialColumns={WorkProjectSeriesColumnsInitial}
        filterProperty={'workProjectSeriesSchema.workTaskType.name'}
        renderCell={renderCell}
        columns={WorkProjectSeriesColumns}
        entityClass={EntityClassMap.workProjectSeries}
        idClass={'string'}
      />
    </>
  );
}

export const WorkProjectSeriesColumnsInitial: Paths<WorkProjectSeriesWithSchemaLabelsDto>[] =
  ['id', 'workProjectSeriesSchema.workTaskType.name'];
export const WorkProjectSeriesColumns: Column<WorkProjectSeriesWithSchemaLabelsDto>[] =
  [
    {
      name: 'WorkTaskType Name',
      uid: 'workProjectSeriesSchema.workTaskType.name',
      sortable: true
    },
    { name: 'Id', uid: 'id', sortable: false },
    { name: 'Schedule Id', uid: 'scheduleId', sortable: true }
  ];
