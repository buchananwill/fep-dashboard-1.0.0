'use client';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import React from 'react';
import { Button } from '@nextui-org/button';
import { EllipsisIcon } from '@nextui-org/shared-icons';
import { renderWorkTaskTypeAttributeCell } from '@/components/tables/selectorTables/renderWorkTaskTypeAttributeCell';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS,
  WORK_TASK_TYPE_COLUMNS
} from '@/components/tables/selectorTables/WorkTaskTypeSelectorTable';
import { Column, ColumnUid } from '@/types';
import { Paths } from 'type-fest';
import { getValue } from '@/functions/allowingNestedFiltering';

export default function WorkTaskTypeEditTable({
  workTaskTypes
}: {
  workTaskTypes: WorkTaskTypeDto[];
}) {
  return (
    <FilterSelectEntityTable
      isCompact={true}
      entityClass={EntityClassMap.workTaskType}
      entities={workTaskTypes}
      columns={COLUMNS}
      initialColumns={INITIAL_COLUMNS}
      filterProperty={'name'}
      renderCell={renderWorkTaskTypeWithActions}
    />
  );
}

function handleCellAction(key: React.Key) {
  console.log(key);
}

const COLUMNS: Column<WorkTaskTypeDto>[] = [
  ...WORK_TASK_TYPE_COLUMNS,
  { name: 'Action', uid: 'action', sortable: false }
];

const INITIAL_COLUMNS: ColumnUid<WorkTaskTypeDto>[] = [
  ...INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS,
  'action'
];

function renderWorkTaskTypeWithActions(
  workTaskTypeDto: WorkTaskTypeDto,
  columnKey: React.Key
) {
  if (columnKey === 'action') {
    return (
      <Button isIconOnly={true} className={'w-full'}>
        <EllipsisIcon className={'h-8 w-8'}></EllipsisIcon>
      </Button>
    );
  } else {
    return renderWorkTaskTypeAttributeCell(workTaskTypeDto, columnKey);
  }
}
