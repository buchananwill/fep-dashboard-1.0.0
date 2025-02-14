'use client';
import { useGlobalController, useGlobalDispatch } from 'selective-context';
import { CarouselOrderDto } from '@/api/generated-types/generated-types_';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';

import { useCallback, useMemo } from 'react';
import { DispatchState } from '@/types';
import { CarouselOrderItem } from '@/components/carousel-groups/orders/order-modal/CarouselOrderItem';
import { Modal, ScrollArea } from '@mantine/core';

const carouselOrderModalController = 'CarouselOrderModalController';
export const carouselOrderModal = 'CarouselOrderModal';
export type CarouselOrderModalState = typeof defaultState;

const defaultState = {
  carouselOrderId: undefined as string | undefined,
  opened: false as boolean
} as const;
export default function CarouselOrderModal() {
  const {
    currentState: { carouselOrderId, opened },
    dispatch
  } = useGlobalController<CarouselOrderModalState>({
    contextKey: carouselOrderModal,
    initialValue: defaultState,
    listenerKey: carouselOrderModalController
  });
  const { dispatchWithoutControl, entity } = useLazyDtoStore<CarouselOrderDto>(
    carouselOrderId ?? '',
    EntityClassMap.carouselOrder
  );

  const onClose = useCallback(() => {
    dispatch(defaultState);
  }, [dispatch]);

  const sortedOrderItems = useMemo(() => {
    return entity
      ? Object.values(entity.carouselOrderItems).sort(
          (itemA, itemB) => itemA.preferencePosition - itemB.preferencePosition
        )
      : [];
  }, [entity]);

  if (entity)
    return (
      <Modal opened={opened} onClose={onClose}>
        <div className={'flex flex-col items-center justify-center p-2'}>
          <h1>Edit Carousel Order</h1>
          User {entity.userRoleId}
          <ScrollArea
            className={'border-default-400 h-[400px] w-fit rounded-lg border-2'}
          >
            <table className={'table-fixed'}>
              <tbody>
                {sortedOrderItems.map((orderItem, index) => (
                  <CarouselOrderItem
                    dispatch={
                      dispatchWithoutControl as DispatchState<CarouselOrderDto>
                    }
                    orderItem={orderItem}
                    key={index}
                  />
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </div>
      </Modal>
    );
}

export function useCarouselOrderModalTrigger(carouselOrderId: string) {
  const { dispatchWithoutListen } =
    useGlobalDispatch<CarouselOrderModalState>(carouselOrderModal);

  return useCallback(() => {
    dispatchWithoutListen({ carouselOrderId: carouselOrderId, opened: true });
  }, [carouselOrderId, dispatchWithoutListen]);
}
