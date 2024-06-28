import FilterSelectEntityTable from '@/components/generic/FilterSelectEntityTable';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import React, { ReactElement } from 'react';
import { Chip, TableProps } from '@nextui-org/react';
import { sumDeliveryAllocations } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/sum-delivery-allocations';
import { Column } from '@/types';

export default function WorkProjectSeriesSchemaSelectTable({
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

  return (
    <FilterSelectEntityTable
      entityClass={EntityClassMap.workProjectSeriesSchema}
      idClass={'string'}
      entities={entities}
      columns={columns}
      initialColumns={INITIAL_VISIBLE_COLUMNS}
      filterProperty={'name'}
      renderCell={renderCell}
      selectionMode={selectionMode}
    />
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
