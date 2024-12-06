import { useDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderDto } from '@/api/generated-types/generated-types_';
import { useDrag } from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';
import { CarouselOrderItemDto } from '@/api/generated-types/generated-types_';
import clsx from 'clsx';
import { ClashBadge } from '@/components/generic/ClashBadge';
import { useCarouselOrderModalTrigger } from '@/components/carousel-groups/orders/order-modal/CarouselOrderModal';
import { useClashList } from '@/components/carousel-groups/orders/components/useClashList';

export default function CarouselOrderItem({
  entity: orderItem
}: {
  entity: CarouselOrderItemDto;
}) {
  const { entity } = useDtoStore<CarouselOrderDto>({
    entityId: orderItem.carouselOrderId,
    entityClass: EntityClassMap.carouselOrder
  });
  const modalTrigger = useCarouselOrderModalTrigger(orderItem.carouselOrderId);
  const clashList = useClashList(orderItem);

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
      <ClashBadge show={clashList.length > 0} label={'!'}>
        <div className={''}>User: {entity.userRoleId}</div>
      </ClashBadge>
    </button>
  );
}
