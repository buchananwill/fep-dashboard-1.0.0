'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  CycleSubspanDefinitionDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { AdjustAllocationInWrapper } from '@/components/work-project-series-schema/_components/AdjustAllocation';
import { Column, ColumnUid } from '@/types';
import RootCard from '@/components/generic/RootCard';

import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import EditNameCell from '@/components/tables/cells-v2/EditNameCell';
import { DeleteEntity } from '@/components/tables/cells-v2/DeleteEntity';
import { NumberEditCell } from '@/components/tables/cells-v2/NumberEditCell';
import EmbeddedWorkTaskTypeCell from '@/components/tables/cells-v2/EmbeddedWorkTaskTypeCell';
import { getCellRenderFunction } from '@/components/tables/cells-v2/GetCellRenderFunction';
import { IdWrapper } from '@/api/types';
import { SimpleValueToStringOrUndefined } from '@/components/tables/cells-v2/AnyValueToString';
import { TimeEditCell } from '@/components/tables/cells-v2/TimeEditCell';
import { StringNumberListParserCell } from '@/components/tables/cells-v2/StringNumberListParserCell';
import {
  getNumberUpdater,
  getStringUpdater
} from '@/components/tables/edit-tables/cellUpdaterFunctions';

const entityType = EntityClassMap.cycleSubspanDefinition;

export default function CycleSubspanDefinitionTable({
  pathVariables
}: LeafComponentProps) {
  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <div className={'flex h-[600px] max-w-[80rem] flex-col p-2'}>
        <EntityTable
          entityClass={entityType}
          columns={cycleSubspanDefinitionColumns}
          cellModel={cycleSubspanDefinitionCellModel}
          defaultSort={Sorts['data.name']}
        />
      </div>
    </RootCard>
  );
}

export const cycleSubspanDefinitionColumns: Column<
  IdWrapper<CycleSubspanDefinitionDto>
>[] = [
  { uid: 'data.name', name: 'Name', sortable: true },
  {
    uid: 'data.zeroIndexedCycleDay',
    name: 'Zero-Indexed Cycle Day',
    sortable: true
  },
  {
    uid: 'data.startTime',
    name: 'Start Time',
    sortable: true
  },
  {
    uid: 'data.endTime',
    name: 'End Time',
    sortable: true
  },
  {
    uid: 'data.beginsGroupsOfSize',
    name: 'Begins Groups of Size',
    sortable: true
  }
];

const initialColumns: ColumnUid<IdWrapper<CycleSubspanDefinitionDto>>[] = [
  'data.name',
  'data.zeroIndexedCycleDay',
  'data.startTime',
  'data.endTime',
  'data.beginsGroupsOfSize'
];

const WorkProjectSeriesSchemaEditTableCellRecord: CellComponentRecord<
  IdWrapper<CycleSubspanDefinitionDto>
> = {
  id: { type: 'CustomCell', component: DeleteEntity },
  'data.name': {
    type: 'IdInnerCell',
    component: EditNameCell,
    updater: getStringUpdater('data.name')
  },
  'data.zeroIndexedCycleDay': {
    type: 'IdInnerCell',
    component: NumberEditCell,
    updater: getNumberUpdater('data.zeroIndexedCycleDay')
  },
  'data.startTime': {
    type: 'IdInnerCell',
    component: TimeEditCell,
    updater: getStringUpdater('data.startTime')
  },
  'data.endTime': {
    type: 'IdInnerCell',
    component: TimeEditCell,
    updater: getStringUpdater('data.endTime')
  },
  'data.beginsGroupsOfSize': {
    type: 'IdInnerCell',
    component: StringNumberListParserCell,
    updater: getStringUpdater('data.beginsGroupsOfSize')
  }
};

export const cycleSubspanDefinitionCellModel = getCellRenderFunction(
  'cycleSubspanDefinition',
  WorkProjectSeriesSchemaEditTableCellRecord
);
