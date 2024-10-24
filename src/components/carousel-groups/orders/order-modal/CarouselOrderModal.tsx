'use client';
import { useGlobalController, useGlobalDispatch } from 'selective-context';
import { CarouselOrderDto } from '@/api/generated-types/generated-types';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';

import { useCallback, useMemo } from 'react';
import { DispatchState } from '@/types';
import { CarouselOrderItem } from '@/components/carousel-groups/orders/order-modal/CarouselOrderItem';
import { Modal, ScrollArea } from '@mantine/core';

const carouselOrderModalController = 'CarouselOrderModalController';
export const carouselOrderModal = 'CarouselOrderModal';
export interface CarouselOrderModalState {
  carouselOrderId: string | undefined;
  isOpen: boolean;
}

const defaultState = {
  carouselOrderId: undefined,
  isOpen: false
};
export default function CarouselOrderModal() {
  const {
    currentState: { carouselOrderId, isOpen },
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
      <Modal opened={isOpen} onClose={onClose}>
        <div className={'flex flex-col items-center justify-center p-2'}>
          <h1>Edit Carousel Order</h1>
          User {entity.userRoleId}
          <ScrollArea
            className={'h-[400px] w-fit rounded-lg border-2 border-default-400'}
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
    dispatchWithoutListen({ carouselOrderId: carouselOrderId, isOpen: true });
  }, [carouselOrderId, dispatchWithoutListen]);
}
