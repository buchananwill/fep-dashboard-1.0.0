import { NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useMemo, useRef } from 'react';
import { EmptyArray } from '@/api/main';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';

export default function OptionAssigneeList({
  carouselOptionIdList
}: {
  carouselOptionIdList: number[];
}) {
  const optionAssigneeListMemo = useOptionAssigneeList(carouselOptionIdList);
  return (
    <ul>
      {optionAssigneeListMemo.map((order) => (
        <li key={order.id}>{order.id}</li>
      ))}
    </ul>
  );
}

function useOptionAssigneeList(optionIdList: number[]) {
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
