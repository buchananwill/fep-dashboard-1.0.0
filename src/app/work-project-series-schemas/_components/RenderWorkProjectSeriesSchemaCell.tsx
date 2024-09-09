import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema_';
import React, { ReactElement } from 'react';
import { Chip } from '@nextui-org/react';
import { sumDeliveryAllocations } from '@/app/work-project-series-schemas/_functions/sumDeliveryAllocations';

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
    /**
     * Need to move the shortcode into the WorkTaskType and explicitly fetch the WTT if needed for display.
     * */
    // case 'shortCode':
    //   return (
    //     <span className="inline-block w-24  text-sm">
    //       {workProjectSeriesSchema.shortCode}
    //     </span>
    //   );
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
