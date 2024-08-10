import { DeliveryAllocationDto } from '@/api/zod-schemas/DeliveryAllocationDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema';

function flattenAllocation(da: DeliveryAllocationDto) {
  return da.count * da.deliveryAllocationSize;
}

export function sumDeliveryAllocations(
  schema: WorkProjectSeriesSchemaDto
): number {
  return schema
    ? sumDeliveryAllocationList(Object.values(schema.deliveryAllocations))
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

export function sumDeliveryAllocationList(
  deliveryAllocations: DeliveryAllocationDto[]
) {
  return deliveryAllocations
    .map((da: DeliveryAllocationDto) => flattenAllocation(da))
    .reduce((prev: number, curr: number) => prev + curr, 0);
}
