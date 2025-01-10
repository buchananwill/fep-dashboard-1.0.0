import { useMemo, useRef } from 'react';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { CarouselOrderDto } from '@/api/generated-types/generated-types_';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { isNotUndefined } from '@/api/main';

import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';
import { EmptyArray } from '@/api/client-literals';

export function useOrderItemAssigneeList(
  optionList: CarouselOptionStateInterface[]
) {
  const listener = useRef(crypto.randomUUID());
  const { currentState: masterList } = NamespacedHooks.useListen<
    CarouselOrderDto[]
  >(
    EntityClassMap.carouselOrder,
    KEY_TYPES.MASTER_LIST,
    listener.current,
    EmptyArray
  );
  return useMemo(() => {
    return masterList.filter((order) =>
      Object.values(order.carouselOrderItems).some(
        (item) =>
          optionList.some((option) =>
            option.carouselOrderAssignees.includes(item.carouselOrderId)
          ) && item.active
      )
    );
  }, [optionList, masterList]);
}

export function useSingleOptionAssigneeList(
  option: CarouselOptionStateInterface
) {
  const orderItemAssigneeList = useOrderItemAssigneeList([option]);
  const readAny = useReadAnyDto<CarouselOrderDto>(EntityClassMap.carouselOrder);
  // return useMemo(
  //   () =>
  return orderItemAssigneeList
    .map((optionAssignee) => readAny(optionAssignee.id))
    .filter(isNotUndefined)
    .map((order) => {
      return order.carouselOrderItems;
    })
    .map((items) => items[option.workSchemaId])
    .filter(isNotUndefined);
  // [orderItemAssigneeList, option]
  // );
}
