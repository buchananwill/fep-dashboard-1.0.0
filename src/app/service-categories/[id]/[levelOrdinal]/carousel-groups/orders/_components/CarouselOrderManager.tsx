import { BaseDtoUiProps, NamespacedHooks } from 'dto-stores';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef
} from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/main';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import { useGlobalListener, useGlobalWriteAny } from 'selective-context';
import { OptionMap } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionMapManager';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { produce } from 'immer';
import { isEqual } from 'lodash';
import { UpdateAction } from 'selective-context/dist/types';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';

interface WriteAny<T> {
  (contextKey: string, proposedUpdate: SetStateAction<T>): void;
}

function handleAddAssignee(
  dispatchWriteAny: WriteAny<CarouselOptionState>,
  carouselOptionId: number
) {}

function handleRemoveAssignee(
  dispatchWriteAny: WriteAny<CarouselOptionState>,
  carouselOptionId: number
) {}

function performDiffOnItem(
  orderItems: MutableRefObject<Record<string, CarouselOrderItemDto>>,
  item: CarouselOrderItemDto,
  dispatchWriteAny: WriteAny<CarouselOptionState>
) {
  const prevItem = orderItems.current[item.workProjectSeriesSchemaId];
  const activeMatch = prevItem?.active === item.active;
  const assignmentMatch = prevItem?.carouselOptionId === item.carouselOptionId;
  // match: true true
  if (activeMatch && assignmentMatch) return; // no need to update the ref
  // match: true false
  if (assignmentMatch) {
    if (item.active) handleAddAssignee(dispatchWriteAny, item.carouselOptionId);
    else handleRemoveAssignee(dispatchWriteAny, item.carouselOptionId);
  }
  // match: false true
  else if (activeMatch) {
    if (item.active) {
      handleRemoveAssignee(dispatchWriteAny, prevItem?.carouselOptionId);
      handleAddAssignee(dispatchWriteAny, item.carouselOptionId);
    }
    // (no action needed if the item WAS and IS inactive, apart from update ref)
  }
  // match: false false
  else if (item.active) {
    handleAddAssignee(dispatchWriteAny, item.carouselOptionId);
  } else {
    handleRemoveAssignee(dispatchWriteAny, prevItem?.carouselOptionId);
  }
  // finally: update the ref
  orderItems.current[item.workProjectSeriesSchemaId] = item;
}

export default function CarouselOrderManager({
  entity
}: BaseDtoUiProps<CarouselOrderDto>) {
  const orderItemSchemaIdList = useRef(Object.keys(entity.carouselOrderItems));
  const orderItems = useRef(entity.carouselOrderItems);

  const listenerKey = `orderManager:${entity.id}`;
  const { currentState: carouselList } = NamespacedHooks.useListen<
    CarouselDto[]
  >(EntityClassMap.carousel, KEY_TYPES.MASTER_LIST, listenerKey, EmptyArray);

  const { currentState: optionMap } = useGlobalListener({
    contextKey: OptionMap,
    initialValue: initialMap as Map<string, CarouselOptionDto[]>,
    listenerKey
  });

  const { dispatchWriteAny } = useGlobalWriteAny<CarouselOptionState>();

  useEffect(() => {
    Object.values(entity.carouselOrderItems).forEach((item) =>
      performDiffOnItem(orderItems, item, dispatchWriteAny)
    );
  }, [dispatchWriteAny, entity.carouselOrderItems]);
}

/**
 * 1. Add assignee
 *    i. item is active
 *    ii. list does not contain item
 * 2. Remove assignee
 *    i. item is inactive
 *    ii. item is assigned elsewhere
 * */
