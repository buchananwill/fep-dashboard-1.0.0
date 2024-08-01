import { OrderItemRowProps } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/CarouselOrderItem';
import { useGlobalListener } from 'selective-context';
import { OptionMap } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/_OptionMapManager';
import { InitialMap, NamespacedHooks } from 'dto-stores';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';
import {
  CarouselDto,
  CarouselOptionDto
} from '@/api/generated-types/generated-types';
import { useCallback, useMemo } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { isNotUndefined } from '@/api/main';

export default function SelectCarouselOptionAssignment({
  orderItem,
  dispatch
}: OrderItemRowProps) {
  const { currentState } = NamespacedHooks.useListen<CarouselDto[]>(
    EntityClassMap.carousel,
    KEY_TYPES.MASTER_LIST,
    `assignOptionModalSelect:${orderItem.id}`,
    EmptyArray
  );
  console.log(currentState, orderItem);

  const optionsToSelectFrom = useMemo(() => {
    const carouselOptions = currentState
      .map((carouselDto) => carouselDto.carouselOptionDtos)
      .flatMap((list) =>
        list.find(
          (optionDto) =>
            optionDto.workProjectSeriesSchemaId ===
            orderItem.workProjectSeriesSchemaId
        )
      )
      .filter(isNotUndefined);
    return carouselOptions;
  }, [orderItem.workProjectSeriesSchemaId, currentState]);

  return (
    <select value={orderItem.carouselOptionId}>
      {optionsToSelectFrom.map((option) => (
        <option key={option.id} value={option.id}>
          {option.id}
        </option>
      ))}
    </select>
  );
}
