import { DeliveryAllocationDto } from '@/api/dtos/DeliveryAllocationDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';

function flattenAllocation(da: DeliveryAllocationDto) {
  return da.count * da.deliveryAllocationSize;
}

export function sumDeliveryAllocations(
  schema: WorkProjectSeriesSchemaDto
): number {
  return schema ? sumDeliveryAllocationList(schema.deliveryAllocations) : 0;
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

export function sumDeliveryAllocationList(
  deliveryAllocations: DeliveryAllocationDto[]
) {
  return deliveryAllocations
    .map((da: DeliveryAllocationDto) => flattenAllocation(da))
    .reduce((prev: number, curr: number) => prev + curr, 0);
}
