'use client';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import React, { Key, useCallback, useMemo } from 'react';
import { Pagination, TableProps } from '@nextui-org/react';
import { Column, DispatchState } from '@/types';
import { useFilterSortPaginateSelect } from '@/hooks/useFilterSortPaginateSelect';
import { FilterSortPaginateTableContent } from '@/components/generic/FilterSortPaginateTableContent';
import { Input } from '@nextui-org/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema_';
import { renderWorkSchemaNodeCell } from '@/app/work-project-series-schemas/_components/RenderWorkProjectSeriesSchemaCell';

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
            workProjectSeriesSchemaId: value
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
      return new Set([workSchemaNode.workProjectSeriesSchemaId]);
    else return new Set<string>();
  }, [workSchemaNode]);

  const { tableContentProps, paginationProps, filterProps } =
    useFilterSortPaginateSelect(
      INITIAL_VISIBLE_COLUMNS,
      columns,
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
        renderCell={renderWorkSchemaNodeCell}
        selectionMode={selectionMode}
        bottomContent={bottomContent}
        bottomContentPlacement={'inside'}
        classNames={{ wrapper: 'ml-auto mr-auto h-[58vh]' }}
        className={'pointer-events-auto'}
      />
    </div>
  );
}

export const INITIAL_VISIBLE_COLUMNS: (keyof WorkProjectSeriesSchemaDto)[] = [
  'name',
  'shortCode',
  'deliveryAllocations'
];
export const columns: Column<WorkProjectSeriesSchemaDto>[] = [
  { name: 'Name', uid: 'name', sortable: true },
  { name: 'ShortCode', uid: 'shortCode', sortable: true },
  { name: 'Delivery Allocations', uid: 'deliveryAllocations', sortable: true }
];
