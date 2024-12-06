import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types_';

export function getIntListFromDeliveryAllocations(
  allocations: WorkProjectSeriesSchemaDto['deliveryAllocations']
) {
  return Object.values(allocations)
    .toSorted(
      (dev1, dev2) => dev2.deliveryAllocationSize - dev1.deliveryAllocationSize
    )
    .map((devAl) =>
      Array.from({ length: devAl.count }, () => devAl.deliveryAllocationSize)
    )
    .reduce((prev, curr) => [...prev, ...curr], []);
}