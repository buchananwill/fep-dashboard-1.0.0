'use client';
import {
  BaseDtoUiProps,
  BaseLazyDtoUiProps,
  NamespacedHooks
} from 'dto-stores';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { MutableRefObject, SetStateAction, useEffect, useRef } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/main';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import { useGlobalListener, useGlobalWriteAny } from 'selective-context';
import { OptionMap } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionMapManager';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { performDiffOnCarouselOrderItem } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/performDiffOnCarouselOrderItem';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';

export interface WriteAny<T> {
  (contextKey: string, proposedUpdate: SetStateAction<T>): void;
}

export default function CarouselOrderManager({
  entity
}: BaseLazyDtoUiProps<CarouselOrderDto>) {
  const orderItemSchemaIdList = useRef(Object.keys(entity.carouselOrderItems));
  const orderItems = useRef({});

  const listenerKey = `orderManager:${entity.id}`;
  const { currentState: carouselList } = NamespacedHooks.useListen<
    CarouselDto[]
  >(EntityClassMap.carousel, KEY_TYPES.MASTER_LIST, listenerKey, EmptyArray);

  const { currentState: optionMap } = useGlobalListener({
    contextKey: OptionMap,
    initialValue: initialMap as Map<string, CarouselOptionDto[]>,
    listenerKey
  });

  const { dispatchWriteAny } =
    useGlobalWriteAny<CarouselOptionStateInterface>();

  useEffect(() => {
    Object.values(entity.carouselOrderItems).forEach((item) =>
      performDiffOnCarouselOrderItem(orderItems, item, dispatchWriteAny)
    );
  }, [dispatchWriteAny, entity.carouselOrderItems]);

  return null;
}

/**
 * 1. Add assignee
 *    i. item is active
 *    ii. list does not contain item
 * 2. Remove assignee
 *    i. item is inactive
 *    ii. item is assigned elsewhere
 * */

function useKeepTrying(
  dispatchWriteAny: WriteAny<CarouselOptionStateInterface>,
  entity: CarouselOrderDto,
  orderItems: MutableRefObject<Record<string, CarouselOrderItemDto>>
) {
  const retryTimeout = useRef<number | undefined>();

  useEffect(() => {
    retryTimeout.current = keepTrying(dispatchWriteAny, entity, orderItems);
    return () => {
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
    };
  }, [dispatchWriteAny, entity, orderItems]);
}

function keepTrying(
  dispatchWriteAny: WriteAny<CarouselOptionStateInterface>,
  entity: CarouselOrderDto,
  orderItems: MutableRefObject<Record<string, CarouselOrderItemDto>>
) {
  try {
    console.log('trying');
    Object.values(entity.carouselOrderItems).forEach((item) =>
      performDiffOnCarouselOrderItem(orderItems, item, dispatchWriteAny)
    );
    return undefined;
  } catch (e) {
    console.log('failed!', entity);
    return window.setTimeout(
      () => keepTrying(dispatchWriteAny, entity, orderItems),
      2000
    );
  }
}
