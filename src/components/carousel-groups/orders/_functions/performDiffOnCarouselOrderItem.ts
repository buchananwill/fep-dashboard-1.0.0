import { MutableRefObject } from 'react';
import { CarouselOrderItemDto } from '@/api/generated-types/generated-types_';
import { handleAddAssignee } from '@/components/carousel-groups/orders/_functions/handleAddAssignee';
import { handleRemoveAssignee } from '@/components/carousel-groups/orders/_functions/handleRemoveAssignee';
import {
  ReadAnyDto,
  WriteAnyDto
} from '@/components/carousel-groups/orders/components/order/CarouselOrderManager';
import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';

export function performDiffOnCarouselOrderItem(
  orderItems: MutableRefObject<Record<string, CarouselOrderItemDto>>,
  item: CarouselOrderItemDto,
  dispatchWriteAny: WriteAnyDto<CarouselOptionStateInterface>,
  readAnyOption: ReadAnyDto<CarouselOptionStateInterface>
) {
  let updateSucceeded = false;
  const prevItem = orderItems.current[item.workSchemaId];
  const prevOptionDefined =
    prevItem && !!readAnyOption(prevItem.carouselOptionId!);
  const currOptionDefined = item && !!readAnyOption(item.carouselOptionId!);
  const activeMatch = prevItem?.active === item.active;
  const assignmentMatch = prevItem?.carouselOptionId === item.carouselOptionId;
  // match: true & true #1
  if (activeMatch && assignmentMatch) return; // no need to update the ref
  // match: false & true #2
  if (assignmentMatch) {
    if (item.active && currOptionDefined) {
      handleAddAssignee(dispatchWriteAny, item);
      updateSucceeded = true;
    } else if (prevOptionDefined) {
      handleRemoveAssignee(dispatchWriteAny, item);
      updateSucceeded = true;
    }
  }
  // match: true & false #3
  else if (activeMatch) {
    if (item.active) {
      if (prevItem && prevOptionDefined)
        handleRemoveAssignee(dispatchWriteAny, prevItem);
      updateSucceeded = true;
      if (currOptionDefined) {
        handleAddAssignee(dispatchWriteAny, item);
        updateSucceeded = true;
      }
    }
    // (no action needed if the item WAS and IS inactive, apart from update ref)
  }
  // match: false & false #4
  else if (item.active) {
    if (currOptionDefined) {
      handleAddAssignee(dispatchWriteAny, item);
      updateSucceeded = true;
    }
    // No removal action needed for the prevItem, since it wasn't active.
  } else {
    if (prevItem && prevOptionDefined)
      handleRemoveAssignee(dispatchWriteAny, prevItem);
    updateSucceeded = true;
    // No add action needed for the current item, since it isn't active.
  }
  // finally: update the ref
  if (updateSucceeded) orderItems.current[item.workSchemaId] = item;
}
