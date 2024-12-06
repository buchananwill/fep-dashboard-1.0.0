import { CycleSubspanJoinNestedDto } from '@/api/generated-types/generated-types_';
import { StaticDeliveryAllocationItemDto } from '@/api/generated-types/generated-types_';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types_';

export function matchSize(
  sizesSet: Record<string, CycleSubspanJoinNestedDto>,
  size: number
) {
  return sizesSet[String(size)] !== undefined;
}

export function matchIsFirst(
  sizesSet: Record<string, CycleSubspanJoinNestedDto>,
  size: number,
  cycleSubspanGroupId?: number
) {
  return (
    sizesSet[size]?.joinOrdinal === 1 &&
    (!cycleSubspanGroupId ||
      sizesSet[size].cycleSubspanGroupId === cycleSubspanGroupId)
  );
}

export function matchRow(
  item: StaticDeliveryAllocationItemDto,
  workProjectSeriesSchemaId: WorkProjectSeriesSchemaDto['id']
) {
  return (
    item.staticDeliveryAllocation.deliveryAllocation
      .workProjectSeriesSchemaId === workProjectSeriesSchemaId
  );
}
