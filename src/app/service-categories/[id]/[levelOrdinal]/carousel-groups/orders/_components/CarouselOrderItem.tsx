import { useDtoStore, useReadAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { useDrag } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import clsx from 'clsx';
import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';
import { ClashBadge } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/ClashBadge';
import { useCarouselOrderModalTrigger } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/CarouselOrderModal';

export default function CarouselOrderItem({
  entity: orderItem
}: {
  entity: CarouselOrderItemDto;
}) {
  const { entity } = useDtoStore<CarouselOrderDto>({
    entityId: orderItem.carouselOrderId,
    entityClass: EntityClassMap.carouselOrder
  });
  const readAny =
    useReadAnyDto<CarouselOptionStateInterface>(CarouselOptionState);
  const modalTrigger = useCarouselOrderModalTrigger(orderItem.carouselOrderId);

  const option = readAny(orderItem.carouselOptionId);

  const clashList = option?.clashMap?.get(orderItem.carouselOrderId) ?? [];

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.CAROUSEL_ORDER_ITEM,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: orderItem
  }));

  return drag(
    <button
      className={clsx(
        'cursor-pointer rounded-lg bg-white p-1 odd:bg-sky-300 even:bg-red-300',
        isDragging && ' opacity-50'
      )}
      onClick={modalTrigger}
    >
      <ClashBadge show={clashList.length > 0} content={'!'}>
        <div className={''}>User: {entity.userRoleId}</div>
      </ClashBadge>
    </button>
  );
}
