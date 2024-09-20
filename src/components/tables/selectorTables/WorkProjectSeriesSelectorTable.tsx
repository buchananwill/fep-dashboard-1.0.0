'use client';
import React from 'react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';

import { Column, ColumnUid } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesDto } from '@/api/generated-types/generated-types';
import { getDomainAlias } from '@/api/getDomainAlias';
import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { StringValueChip } from '@/components/tables/StringValueChip';

import { EntityTableProps } from '@/components/tables/types';

export default function WorkProjectSeriesSelectorTable({
  entities
}: EntityTableProps<'workProjectSeries'>) {
  return (
    <>
      <FilterSelectEntityTable
        entities={entities}
        initialColumns={WorkProjectSeriesColumnsInitial}
        filterProperty={'workTaskType.name'}
        renderCell={CellRenderFunction}
        columns={WorkProjectSeriesColumns}
        entityClass={EntityClassMap.workProjectSeries}
        idClass={'string'}
      />
    </>
  );
}

export const WorkProjectSeriesColumnsInitial: ColumnUid<WorkProjectSeriesDto>[] =
  ['id', 'workTaskType.knowledgeDomain.name'];
export const WorkProjectSeriesColumns: Column<WorkProjectSeriesDto>[] = [
  {
    name: 'WorkTaskType Name',
    uid: 'workTaskType.name',
    sortable: true
  },
  { name: 'Id', uid: 'id', sortable: false },
  { name: 'Schedule Id', uid: 'scheduleId', sortable: true },

  { name: 'ShortCode', uid: 'workTaskType.knowledgeDomain.shortCode' },
  {
    name: getDomainAlias('knowledgeLevel'),
    uid: 'workTaskType.knowledgeLevel.levelOrdinal',
    sortable: true
  },
  {
    name: getDomainAlias('knowledgeDomain'),
    uid: 'workTaskType.knowledgeDomain.name',
    sortable: true
  }
];

const CellRenderFunction = getCellRenderFunction('workProjectSeries', {
  'workTaskType.name': SimpleValueToString,
  id: SimpleValueToString,
  'workTaskType.knowledgeDomain.shortCode': StringValueChip,
  'workTaskType.knowledgeLevel.levelOrdinal': SimpleValueToString,
  'workTaskType.knowledgeDomain.name': SimpleValueToString
});
