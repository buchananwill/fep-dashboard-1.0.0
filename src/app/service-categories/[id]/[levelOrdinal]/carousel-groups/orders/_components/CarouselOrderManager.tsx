'use client';
import {
  BaseLazyDtoUiProps,
  Identifier,
  KEY_TYPES,
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

export interface WriteAnyDto<T> {
  (entityId: Identifier, proposedUpdate: SetStateAction<T>): void;
}

export default function CarouselOrderManager({
  entity
}: BaseLazyDtoUiProps<CarouselOrderDto>) {
  const orderItems = useRef({});
  const optionMap = useRef<Map<string, CarouselOptionDto>>(new Map());
  const readAny = useGlobalReadAny<
    Map<string, CarouselOptionDto> | undefined
  >();
  optionMap.current =
    readAny(`${CarouselOptionState}:${KEY_TYPES.MASTER_MAP}`) ??
    optionMap.current;

  const dispatchWriteAny =
    useWriteAnyDto<CarouselOptionStateInterface>(CarouselOptionState);

  useEffect(() => {
    Object.values(entity.carouselOrderItems).forEach((item) =>
      performDiffOnCarouselOrderItem(orderItems, item, dispatchWriteAny)
    );
  }, [dispatchWriteAny, entity.carouselOrderItems]);

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
  }, [optionMap, entity.carouselOrderItems, dispatchWriteAny]);

  return null;
}
