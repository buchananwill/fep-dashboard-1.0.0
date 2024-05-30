'use client';
import {
  BaseLazyDtoUiProps,
  getNameSpacedKey,
  NamespacedHooks
} from 'dto-stores';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { SetStateAction, useEffect, useRef } from 'react';
import { useGlobalReadAny, useGlobalWriteAny } from 'selective-context';
import {
  CarouselOptionState,
  CarouselOptionStateInterface
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { performDiffOnCarouselOrderItem } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/performDiffOnCarouselOrderItem';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { f } from '@nextui-org/slider/dist/use-slider-64459b54';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';
import { produce } from 'immer';

export interface WriteAny<T> {
  (contextKey: string, proposedUpdate: SetStateAction<T>): void;
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

  const { dispatchWriteAny } =
    useGlobalWriteAny<CarouselOptionStateInterface>();

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
          dispatchWriteAny(
            getEntityNamespaceContextKey(
              CarouselOptionState,
              orderItem.carouselOptionId
            ),
            (state) => {
              const nextMap = new Map(state.clashMap);
              nextMap.set(orderItem.carouselOrderId, clashList);
              return { ...state, clashMap: nextMap };
            }
          );
        });
      });
    }
    return () => {
      clashes.forEach((clashList) => {
        clashList.forEach((orderItem) => {
          dispatchWriteAny(
            getEntityNamespaceContextKey(
              CarouselOptionState,
              orderItem.carouselOptionId
            ),
            (state) => {
              const nextMap = new Map(state.clashMap);
              nextMap.delete(orderItem.carouselOrderId);
              return { ...state, clashMap: nextMap };
            }
          );
        });
      });
    };
  }, [optionMap, entity.carouselOrderItems, dispatchWriteAny]);

  return null;
}

function checkForClash(
  orderItems: Record<string, CarouselOrderItemDto>,
  carouselOptionDtoMap: Map<string, CarouselOptionDto>
) {
  const clashes: CarouselOrderItemDto[][] = [];
  const itemSet = new Set(Object.values(orderItems));
  for (let orderItemDto of Object.values(orderItems)) {
    itemSet.delete(orderItemDto);
    const filterClashes = [...itemSet].filter((item) => {
      if (!item.active) return false;
      const optionA = carouselOptionDtoMap.get(
        `${CarouselOptionState}:${item.carouselOptionId}`
      );
      const optionB = carouselOptionDtoMap.get(
        `${CarouselOptionState}:${orderItemDto.carouselOptionId}`
      );
      return optionA && optionB && optionA?.carouselId === optionB?.carouselId;
    });
    if (filterClashes.length > 0) {
      clashes.push([orderItemDto, ...filterClashes]);
      filterClashes.forEach((clashingOrderItem) =>
        itemSet.delete(clashingOrderItem)
      );
    }
  }
  return clashes;
}
