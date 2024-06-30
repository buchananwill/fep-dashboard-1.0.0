import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import React, { ReactElement } from 'react';
import { Chip } from '@nextui-org/react';
import { sumDeliveryAllocations } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/sumDeliveryAllocations';

export function renderWorkSchemaNodeCell(
  workProjectSeriesSchema: WorkProjectSeriesSchemaDto,
  columnKey: React.Key
) {
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
}
