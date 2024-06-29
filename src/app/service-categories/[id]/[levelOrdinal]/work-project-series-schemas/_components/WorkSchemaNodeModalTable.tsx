'use client';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import React, { ReactElement, useMemo } from 'react';
import { Chip, Pagination, TableProps } from '@nextui-org/react';
import { sumDeliveryAllocations } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/sum-delivery-allocations';
import { Column } from '@/types';
import { useFilterSortPaginateSelect } from '@/hooks/useFilterSortPaginateSelect';
import { FilterSortPaginateTableContent } from '@/components/generic/FilterSortPaginateTableContent';
import { Input } from '@nextui-org/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function WorkSchemaNodeModalTable({
  entities,
  selectionMode
}: { entities: WorkProjectSeriesSchemaDto[] } & Pick<
  TableProps,
  'selectionMode'
>) {
  const renderCell = React.useCallback(
    (
      workProjectSeriesSchema: WorkProjectSeriesSchemaDto,
      columnKey: React.Key
    ) => {
      const cellValue =
        workProjectSeriesSchema[
          columnKey as keyof Pick<
            WorkProjectSeriesSchemaDto,
            'deliveryAllocations' | 'name' | 'shortCode'
          >
        ];

      switch (columnKey) {
        case 'name':
          return (
            <span className={'inline-block w-32 truncate'}>
              {workProjectSeriesSchema.name}
            </span>
          );
        case 'shortCode':
          return (
            <span className="inline-block w-24  text-sm">
              {workProjectSeriesSchema.shortCode}
            </span>
          );
        case 'deliveryAllocations':
          return (
            <span className={'inline-block w-20'}>
              <Chip
                className={'max-w-full truncate'}
                color={'secondary'}
                size="sm"
                variant="flat"
              >
                {sumDeliveryAllocations(workProjectSeriesSchema)}
              </Chip>
            </span>
          );
        default:
          return cellValue as string | number | ReactElement;
      }
    },
    []
  );

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
    <div className={'grid w-full grid-cols-2'}>
      <div className={'flex flex-col p-2'}>
        <Input
          isClearable
          className="grow"
          placeholder="Search by name..."
          startContent={<MagnifyingGlassIcon className={'h-6 w-6'} />}
          {...filterProps}
        />
      </div>
      <div className={''}>
        <FilterSortPaginateTableContent
          {...tableContentProps}
          isHeaderSticky
          renderCell={renderCell}
          selectionMode={selectionMode}
          bottomContent={bottomContent}
          bottomContentPlacement={'inside'}
          classNames={{ wrapper: 'ml-auto mr-auto h-[60vh]' }}
          className={'pointer-events-auto'}
        />
      </div>
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
