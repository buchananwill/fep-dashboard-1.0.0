import {
  DeliveryAllocationDto,
  WorkSchemaDto
} from '@/api/generated-types/generated-types_';

function flattenAllocation(da: DeliveryAllocationDto) {
  return da.count * da.deliveryAllocationSize;
}

export function sumDeliveryAllocations(schema: WorkSchemaDto): number {
  return schema
    ? sumDeliveryAllocationList(Object.values(schema.deliveryAllocations))
    : 0;
}

export function sumAllSchemas(deliveryBundle: WorkSchemaDto[]): number {
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
