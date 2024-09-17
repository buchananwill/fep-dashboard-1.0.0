'use client';
import React, { useCallback } from 'react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';

import { Column, ColumnUid } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  WorkProjectSeriesDto,
  WorkProjectSeriesWithSchemaLabelsDto
} from '@/api/generated-types/generated-types';
import { Paths } from 'type-fest';
import { getValue } from '@/functions/allowingNestedFiltering';
import { getDomainAlias } from '@/api/getDomainAlias';
import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { SimpleValueToString } from '@/components/tables/edit-tables/SimpleValueToString';
import { startCase } from 'lodash';
import { StringValueChip } from '@/components/generic/StringValueChip';

export default function WorkProjectSeriesSelectorTable({
  entities
}: {
  entities: WorkProjectSeriesDto[];
}) {
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

const CellRenderFunction = getCellRenderFunction<WorkProjectSeriesDto>(
  {
    'workTaskType.name': SimpleValueToString,
    id: SimpleValueToString,
    'workTaskType.knowledgeDomain.shortCode': StringValueChip,
    'workTaskType.knowledgeLevel.levelOrdinal': SimpleValueToString,
    'workTaskType.knowledgeDomain.name': SimpleValueToString
  },
  EntityClassMap.workProjectSeries
);
