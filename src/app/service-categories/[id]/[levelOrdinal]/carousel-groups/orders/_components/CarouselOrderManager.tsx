'use client';
import {
  BaseLazyDtoUiProps,
  Identifier,
  KEY_TYPES,
  NamespacedHooks,
  useReadAnyDto,
  useWriteAnyDto
} from 'dto-stores';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { SetStateAction, useEffect, useRef } from 'react';
import { useGlobalReadAny } from 'selective-context';
import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { performDiffOnCarouselOrderItem } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/performDiffOnCarouselOrderItem';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';
import { checkForClash } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/checkForClash';
import { EmptyArray } from '@/api/literals';

export interface WriteAnyDto<T> {
  (entityId: Identifier, proposedUpdate: SetStateAction<T>): void;
}
export interface ReadAnyDto<T> {
  (entityId: Identifier): T | undefined;
}

export default function CarouselOrderManager({
  entity
}: BaseLazyDtoUiProps<CarouselOrderDto>) {
  const orderItems = useRef({});
  const optionMap = useRef<Map<string, CarouselOptionDto>>(new Map());
  const readAny = useGlobalReadAny<
    Map<string, CarouselOptionDto> | undefined
  >();

  const { currentState: subscribedList } = NamespacedHooks.useListen(
    CarouselOptionState,
    KEY_TYPES.ID_LIST,
    entity.id,
    EmptyArray as number[]
  );

  optionMap.current =
    readAny(`${CarouselOptionState}:${KEY_TYPES.MASTER_MAP}`) ??
    optionMap.current;

  const dispatchWriteAny =
    useWriteAnyDto<CarouselOptionStateInterface>(CarouselOptionState);
  const readAnyOption =
    useReadAnyDto<CarouselOptionStateInterface>(CarouselOptionState);

  useEffect(() => {
    Object.values(entity.carouselOrderItems).forEach((item) =>
      performDiffOnCarouselOrderItem(
        orderItems,
        item,
        dispatchWriteAny,
        readAnyOption
      )
    );
  }, [
    entity.carouselOrderItems,
    subscribedList,
    dispatchWriteAny,
    readAnyOption
  ]);

  useEffect(() => {
    const clashes = checkForClash(entity.carouselOrderItems, optionMap.current);
    if (clashes.length > 0) {
      clashes.forEach((clashList) => {
        clashList.forEach((orderItem) => {
          dispatchWriteAny(orderItem.carouselOptionId, (state) => {
            const nextMap = new Map(state.clashMap);
            nextMap.set(orderItem.carouselOrderId, clashList);
            return { ...state, clashMap: nextMap };
          });
        });
      });
    }
    return () => {
      clashes.forEach((clashList) => {
        clashList.forEach((orderItem) => {
          dispatchWriteAny(orderItem.carouselOptionId, (state) => {
            const nextMap = new Map(state.clashMap);
            nextMap.delete(orderItem.carouselOrderId);
            return { ...state, clashMap: nextMap };
          });
        });
      });
    };
  }, [optionMap, entity.carouselOrderItems, dispatchWriteAny, subscribedList]);

  return null;
}
