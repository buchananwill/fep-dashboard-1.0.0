import { DeliveryAllocationDto } from '@/api/dtos/DeliveryAllocationDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';

export function sumDeliveryAllocations(
  schema: WorkProjectSeriesSchemaDto
): number {
  return schema
    ? schema.deliveryAllocations
        .map(
          (da: DeliveryAllocationDto) => da.count * da.deliveryAllocationSize
        )
        .reduce((prev: number, curr: number) => prev + curr, 0)
    : 0;
}

export function sumAllSchemas(
  deliveryBundle: WorkProjectSeriesSchemaDto[]
): number {
  return deliveryBundle
    ? deliveryBundle
        .map(sumDeliveryAllocations)
        .reduce((prev, curr) => prev + curr, 0)
    : 0;
}
