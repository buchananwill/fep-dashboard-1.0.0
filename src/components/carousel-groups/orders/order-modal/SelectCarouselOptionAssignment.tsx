import { OrderItemRowProps } from '@/components/carousel-groups/orders/order-modal/CarouselOrderItem';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import {
  CarouselDto,
  CarouselOptionDto
} from '@/api/generated-types/generated-types';
import { useCallback, useMemo } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray, ObjectPlaceholder } from '@/api/literals';
import { isNotUndefined } from '@/api/main';
import { ClashBadge } from '@/components/generic/ClashBadge';
import { CarouselOptionState } from '@/components/carousel-groups/orders/components/option/CarouselOption';
import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';
import { useGlobalListener } from 'selective-context';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';
import { SimpleSelectable } from '@/components/generic/MultiSelect';
import { Select } from '@mantine/core';

export default function SelectCarouselOptionAssignment({
  orderItem,
  dispatch
}: OrderItemRowProps) {
  const listenerKey = `assignOptionModalSelect:${orderItem.id}`;
  const { workProjectSeriesSchemaId, carouselOptionId } = orderItem;
  const { currentState } = NamespacedHooks.useListen<CarouselDto[]>(
    EntityClassMap.carousel,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray
  );
  const readAnyCarousel = useReadAnyDto<CarouselDto>(EntityClassMap.carousel);
  const { currentState: currentOption } =
    useGlobalListener<CarouselOptionStateInterface>({
      contextKey: getEntityNamespaceContextKey(
        CarouselOptionState,
        carouselOptionId ?? NaN
      ),
      listenerKey,
      initialValue: ObjectPlaceholder as CarouselOptionStateInterface
    });

  const { responseMap: optionsToSelectFrom, data } = useMemo(() => {
    const responseMap = new Map<string, CarouselOptionDto>();
    const data = [] as SimpleSelectable[];
    currentState
      .map((carouselDto) => carouselDto.carouselOptionDtos)
      .flatMap((list) =>
        list.find(
          (optionDto) =>
            optionDto.workProjectSeriesSchemaId === workProjectSeriesSchemaId
        )
      )
      .filter(isNotUndefined)
      .forEach((co) => {
        const nextCarousel = readAnyCarousel(co.carouselId);
        responseMap.set(String(co.id), co);
        data.push({
          value: String(co.id),
          label:
            nextCarousel?.name ??
            String(nextCarousel?.carouselOrdinal ?? `Carousel for ${co.id}`)
        });
      });
    return { responseMap, data };
  }, [workProjectSeriesSchemaId, currentState, readAnyCarousel]);

  const currentSelection = useMemo(() => {
    return carouselOptionId ? String(carouselOptionId) : null;
  }, [carouselOptionId]);

  const clashList = !currentSelection
    ? []
    : (currentOption?.clashMap?.get(orderItem.carouselOrderId) ?? []);

  const handleSelection = useCallback(
    (nextValue: string | null) => {
      dispatch((carouselOrder) => {
        const updatedOrderItems = { ...carouselOrder.carouselOrderItems };
        const updatedItem = { ...updatedOrderItems[workProjectSeriesSchemaId] };
        updatedOrderItems[workProjectSeriesSchemaId] = updatedItem;
        if (nextValue === null) {
          delete updatedItem.carouselOptionId;
        } else {
          updatedItem.carouselOptionId = optionsToSelectFrom.get(nextValue)?.id;
        }
        return { ...carouselOrder, carouselOrderItems: updatedOrderItems };
      });
    },
    [dispatch, optionsToSelectFrom, workProjectSeriesSchemaId]
  );

  return (
    <ClashBadge show={clashList.length > 0} label={'!'} offset={8}>
      <Select
        variant={'faded'}
        value={currentSelection === '' ? null : currentSelection}
        data={data}
        placeholder={'Assign to a Carousel'}
        onChange={handleSelection}
        size={'sm'}
      />
    </ClashBadge>
  );
}
