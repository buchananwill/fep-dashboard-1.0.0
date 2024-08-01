import { OrderItemRowProps } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/CarouselOrderItem';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import {
  CarouselDto,
  CarouselOptionDto
} from '@/api/generated-types/generated-types_';
import { useCallback, useMemo } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { isNotUndefined } from '@/api/main';
import { Select, Selection } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { parseTen } from '@/api/date-and-time';

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
  const readAnyCarousel = useReadAnyDto<CarouselDto>(EntityClassMap.carousel);

  const optionsToSelectFrom = useMemo(() => {
    const responseMap = new Map<string, CarouselOptionDto>();
    currentState
      .map((carouselDto) => carouselDto.carouselOptionDtos)
      .flatMap((list) =>
        list.find(
          (optionDto) =>
            optionDto.workProjectSeriesSchemaId ===
            orderItem.workProjectSeriesSchemaId
        )
      )
      .filter(isNotUndefined)
      .forEach((co) => responseMap.set(String(co.id), co));
    return responseMap;
  }, [orderItem.workProjectSeriesSchemaId, currentState]);

  const currentSelection = useMemo(() => {
    return orderItem.carouselOptionId
      ? new Set([String(orderItem.carouselOptionId)])
      : new Set<string>();
  }, [orderItem]);

  const handleSelection = useCallback(
    (selectionKeyValue: Selection) => {
      if (typeof selectionKeyValue === 'object') {
        const selectionSet = selectionKeyValue as Set<string>;
        dispatch((carouselOrder) => {
          const updatedOrderItems = { ...carouselOrder.carouselOrderItems };
          const updatedItem = { ...orderItem };
          updatedOrderItems[updatedItem.workProjectSeriesSchemaId] =
            updatedItem;
          if (selectionSet.size === 0) {
            delete updatedItem.carouselOptionId;
          } else if (selectionSet.size === 1) {
            updatedItem.carouselOptionId = parseTen(
              String([...selectionKeyValue.values()][0])
            );
          } else {
            throw Error('Only one selection allowed.');
          }
          return { ...carouselOrder, carouselOrderItems: updatedOrderItems };
        });
      }
    },
    [dispatch, orderItem]
  );

  return (
    <Select
      variant={'faded'}
      selectedKeys={currentSelection}
      items={optionsToSelectFrom.values()}
      label={'Carousel'}
      labelPlacement={'inside'}
      placeholder={'Assign to a Carousel'}
      selectionMode={'single'}
      onSelectionChange={handleSelection}
      size={'sm'}
    >
      {(option) => (
        <SelectItem
          key={option.id}
          value={option.id}
          aria-label={
            readAnyCarousel(option.carouselId)?.name ??
            `Carousel ${readAnyCarousel(option.carouselId)?.carouselOrdinal}` ??
            `Option Id: ${option.id}`
          }
        >
          {readAnyCarousel(option.carouselId)?.name ??
            readAnyCarousel(option.carouselId)?.carouselOrdinal ??
            option.id}
        </SelectItem>
      )}
    </Select>
  );
}
