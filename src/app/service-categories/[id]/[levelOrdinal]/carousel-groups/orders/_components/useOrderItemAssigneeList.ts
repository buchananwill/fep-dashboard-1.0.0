import { useMemo, useRef } from 'react';
import { NamespacedHooks } from 'dto-stores';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray, isNotUndefined } from '@/api/main';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';

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
    return masterList
      .filter((order) =>
        Object.values(order.carouselOrderItems).some(
          (item) =>
            optionList.some((option) =>
              option.carouselOrderAssignees.includes(item.carouselOrderId)
            ) && item.active
        )
      )
      .map((order) => {
        return order.carouselOrderItems;
      });
  }, [optionList, masterList]);
}

export function useSingleOptionAssigneeList(
  option: CarouselOptionStateInterface
) {
  const orderItemAssigneeList = useOrderItemAssigneeList([option]);

  return useMemo(
    () =>
      orderItemAssigneeList
        .map((items) => items[option.workProjectSeriesSchemaId])
        .filter(isNotUndefined),
    [orderItemAssigneeList, option]
  );
}
