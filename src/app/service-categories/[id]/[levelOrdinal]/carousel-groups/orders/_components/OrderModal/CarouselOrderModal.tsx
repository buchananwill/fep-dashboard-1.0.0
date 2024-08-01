'use client';
import { useGlobalController, useGlobalDispatch } from 'selective-context';
import {
  CarouselOrderDto,
  CarouselOrderItemDto
} from '@/api/generated-types/generated-types';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal';
import { useCallback } from 'react';
import { DispatchState } from '@/types';
import { Switch } from '@nextui-org/react';
import { mockOrder } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/MockOrder';
import SelectIsActive from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/SelectIsActive';
import { OrderItemLabel } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/OrderItemLabel';

const carouselOrderModalController = 'CarouselOrderModalController';
export const carouselOrderModal = 'CarouselOrderModal';
export interface CarouselOrderModalState {
  carouselOrderId: string | undefined;
  isOpen: boolean;
}

const defaultState = {
  carouselOrderId: 'd6ef1aac-9cfb-481a-8259-42f63c5651ad',
  isOpen: true
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

  console.log(entity);

  if (entity)
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Edit Carousel Order</ModalHeader>
          User {entity.userRoleId}
          <table>
            <tbody>
              {Object.values(entity.carouselOrderItems).map((orderItem) => (
                <CarouselOrderItem
                  dispatch={
                    dispatchWithoutControl as DispatchState<CarouselOrderDto>
                  }
                  orderItem={orderItem}
                  key={orderItem.id}
                />
              ))}
            </tbody>
          </table>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    );
}

export interface OrderItemRowProps {
  dispatch: DispatchState<CarouselOrderDto>;
  orderItem: CarouselOrderItemDto;
}

function CarouselOrderItem(props: OrderItemRowProps) {
  return (
    <tr>
      <td>
        <OrderItemLabel {...props} />
      </td>
      <td>{props.orderItem.preferencePosition}</td>
      <td>
        <SelectIsActive {...props} />
      </td>
      <td>
        <select value={props.orderItem.carouselOptionId}>
          <option value={props.orderItem.carouselOptionId}>
            {props.orderItem.carouselOptionId}
          </option>
        </select>
      </td>
    </tr>
  );
}

export function useCarouselOrderModalTrigger(carouselOrderId: string) {
  const { dispatchWithoutListen } =
    useGlobalDispatch<CarouselOrderModalState>(carouselOrderModal);

  return useCallback(() => {
    dispatchWithoutListen({ carouselOrderId: carouselOrderId, isOpen: true });
  }, [carouselOrderId, dispatchWithoutListen]);
}
