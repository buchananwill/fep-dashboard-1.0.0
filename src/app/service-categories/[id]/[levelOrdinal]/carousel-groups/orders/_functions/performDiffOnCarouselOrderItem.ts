import { MutableRefObject } from 'react';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { handleAddAssignee } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/handleAddAssignee';
import { handleRemoveAssignee } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/handleRemoveAssignee';
import { WriteAny } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';

export function performDiffOnCarouselOrderItem(
  orderItems: MutableRefObject<Record<string, CarouselOrderItemDto>>,
  item: CarouselOrderItemDto,
  dispatchWriteAny: WriteAny<CarouselOptionStateInterface>
) {
  const prevItem = orderItems.current[item.workProjectSeriesSchemaId];
  const activeMatch = prevItem?.active === item.active;
  const assignmentMatch = prevItem?.carouselOptionId === item.carouselOptionId;
  // match: true true #1
  if (activeMatch && assignmentMatch) return; // no need to update the ref
  // match: false true #2
  if (assignmentMatch) {
    if (item.active) handleAddAssignee(dispatchWriteAny, item);
    else handleRemoveAssignee(dispatchWriteAny, item);
  }
  // match: true false #3
  else if (activeMatch) {
    console.log('re-assigning item', activeMatch, assignmentMatch, prevItem);
    if (item.active) {
      if (prevItem) handleRemoveAssignee(dispatchWriteAny, prevItem);
      handleAddAssignee(dispatchWriteAny, item);
    }
    // (no action needed if the item WAS and IS inactive, apart from update ref)
  }
  // match: false false #4
  else if (item.active) {
    handleAddAssignee(dispatchWriteAny, item);
    // No removal action needed for the prevItem, since it wasn't active.
  } else {
    if (prevItem) handleRemoveAssignee(dispatchWriteAny, prevItem);
    // No add action needed for the current item, since it isn't active.
  }
  // finally: update the ref
  orderItems.current[item.workProjectSeriesSchemaId] = item;
}
