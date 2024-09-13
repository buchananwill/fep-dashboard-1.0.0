import { CycleSubspanJoinNestedDto } from '@/api/zod-schemas/CycleSubspanJoinNestedDtoSchema';
import { StaticDeliveryAllocationItemDto } from '@/api/zod-schemas/StaticDeliveryAllocationItemDtoSchema';

export function matchSize(
  sizesSet: Record<string, CycleSubspanJoinNestedDto>,
  size: number
) {
  return sizesSet[String(size)] !== undefined;
}

export function matchIsFirst(
  sizesSet: Record<string, CycleSubspanJoinNestedDto>,
  size: number,
  cycleSubspanGroupId: string
) {
  return (
    sizesSet[size]?.joinOrdinal === 1 &&
    sizesSet[size].cycleSubspanGroupId === cycleSubspanGroupId
  );
}

export function matchRow(
  item: StaticDeliveryAllocationItemDto,
  workProjectSeriesSchemaId: string
) {
  return (
    item.staticDeliveryAllocation.deliveryAllocation
      .workProjectSeriesSchemaId === workProjectSeriesSchemaId
  );
}
