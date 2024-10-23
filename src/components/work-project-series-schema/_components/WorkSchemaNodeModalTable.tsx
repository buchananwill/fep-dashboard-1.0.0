'use client';

import { EntityClassMap } from '@/api/entity-class-map';
import React, { Key, useCallback, useMemo } from 'react';
import { Pagination, TableProps } from '@nextui-org/react';
import { ColumnUid, DispatchState } from '@/types';
import { useFilterSortPaginateSelect } from '@/hooks/useFilterSortPaginateSelect';
import { FilterSortPaginateTableContent } from '@/components/tables/FilterSortPaginateTableContent';
import { Input } from '@nextui-org/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  WorkProjectSeriesSchemaDto,
  WorkSchemaNodeDto
} from '@/api/generated-types/generated-types';
import { workProjectSeriesSchemaColumns } from '@/components/tables/edit-tables/WorkProjectSeriesSchemaEditTable';
import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { StringValueChip } from '@/components/tables/StringValueChip';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';

export default function WorkSchemaNodeModalTable({
  entities,
  selectionMode,
  workSchemaNode,
  dispatchWithoutControl
}: {
  entities: WorkProjectSeriesSchemaDto[];
  workSchemaNode: WorkSchemaNodeDto;
  dispatchWithoutControl?: DispatchState<WorkSchemaNodeDto>;
} & Pick<TableProps, 'selectionMode'>) {
  const onSelectionChange = useCallback(
    (selected: 'all' | Set<Key>) => {
      if (selected === 'all') throw new Error('all not allowed here');
      if (selected.size > 1) throw new Error('max one selected option');
      if (selected.size === 1) {
        const value = [...selected.values()][0] as string;
        if (dispatchWithoutControl) {
          dispatchWithoutControl((data) => ({
            ...data,
            workProjectSeriesSchemaId: parseInt(value)
          }));
        }
      } else {
        if (dispatchWithoutControl) {
          dispatchWithoutControl((data) => ({
            ...data,
            workProjectSeriesSchemaId: undefined
          }));
        }
      }
    },
    [dispatchWithoutControl]
  );

  const selectedKeys = useMemo(() => {
    if (workSchemaNode.workProjectSeriesSchemaId !== undefined)
      return new Set([String(workSchemaNode.workProjectSeriesSchemaId)]);
    else return new Set<string>();
  }, [workSchemaNode]);

  const { tableContentProps, paginationProps, filterProps } =
    useFilterSortPaginateSelect(
      INITIAL_VISIBLE_COLUMNS,
      workProjectSeriesSchemaColumns,
      entities,
      'name',
      EntityClassMap.workProjectSeriesSchema,
      'string',
      7
    );

  const tableContentPropsIntercepted = useMemo(() => {
    return { ...tableContentProps, onSelectionChange, selectedKeys };
  }, [tableContentProps, selectedKeys, onSelectionChange]);

  const bottomContent = useMemo(() => {
    return (
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        className={'ml-auto mr-auto'}
        {...paginationProps}
      />
    );
  }, [paginationProps]);

  return (
    <div className={'flex flex-col gap-1 p-1'}>
      <Input
        isClearable
        className="grow"
        placeholder="Search by name..."
        startContent={<MagnifyingGlassIcon className={'h-6 w-6'} />}
        {...filterProps}
      />
      <FilterSortPaginateTableContent
        {...tableContentPropsIntercepted}
        aria-label={
          'Table to find and select a WorkProjectSeriesSchema to be resolved at this node.'
        }
        isHeaderSticky
        renderCell={workProjectSeriesSchemaReadOnlyCell}
        selectionMode={selectionMode}
        bottomContent={bottomContent}
        bottomContentPlacement={'outside'}
        color={'primary'}
        // classNames={{ wrapper: 'ml-auto mr-auto h-[58vh]' }}
        // className={'pointer-events-auto'}
      />
    </div>
  );
}

export const INITIAL_VISIBLE_COLUMNS: ColumnUid<WorkProjectSeriesSchemaDto>[] =
  [
    'name',
    'workTaskType.knowledgeDomain.shortCode',
    'workTaskType.knowledgeLevel.levelOrdinal'
  ];

export const workProjectSeriesSchemaReadOnlyCell = getCellRenderFunction(
  'workProjectSeriesSchema',
  {
    name: SimpleValueToString,
    userToProviderRatio: SimpleValueToString,
    'workTaskType.knowledgeDomain.shortCode': StringValueChip,
    'workTaskType.name': StringValueChip,
    'workTaskType.knowledgeLevel.levelOrdinal': SimpleValueToString
  }
);
