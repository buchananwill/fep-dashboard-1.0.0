import { useMemo, useRef } from 'react';
import { NamespacedHooks } from 'dto-stores';
import { CarouselOrderDto } from '@/api/zod-schemas/CarouselOrderDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';

import { EmptyArray } from '@/api/literals';

export function useOptionAssigneeList(optionIdList: number[]) {
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
        (item) => optionIdList.includes(item.carouselOptionId) && item.active
      )
    );
  }, [optionIdList, masterList]);
}
