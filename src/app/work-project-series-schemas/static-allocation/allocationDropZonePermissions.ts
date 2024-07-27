import { CycleSubspanJoinNestedDto } from '@/api/dtos/CycleSubspanJoinNestedDtoSchema';
import { StaticDeliveryAllocationItemDto } from '@/api/dtos/StaticDeliveryAllocationItemDtoSchema_';

export function matchSize(
  sizesSet: Record<string, CycleSubspanJoinNestedDto>,
  size: number
) {
  return sizesSet[String(size)] !== undefined;
}

export function matchIsFirst(
  sizesSet: Record<string, CycleSubspanJoinNestedDto>,
  size: number
) {
  return sizesSet[size]?.joinOrdinal === 1;
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
