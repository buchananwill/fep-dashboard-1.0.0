'use client';
import { useGlobalController, useGlobalDispatch } from 'selective-context';
import { CarouselOrderDto } from '@/api/generated-types/generated-types_';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal';
import { useCallback, useMemo } from 'react';
import { DispatchState } from '@/types';
import { CarouselOrderItem } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/CarouselOrderItem';

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent className={'p-2'}>
          <ModalHeader>Edit Carousel Order</ModalHeader>
          User {entity.userRoleId}
          <div
            className={
              'h-[50vh] w-fit overflow-clip rounded-lg border-2 border-default-400'
            }
          >
            <div className={'h-full w-full overflow-auto p-2'}>
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
            </div>
          </div>
          <ModalFooter></ModalFooter>
        </ModalContent>
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
