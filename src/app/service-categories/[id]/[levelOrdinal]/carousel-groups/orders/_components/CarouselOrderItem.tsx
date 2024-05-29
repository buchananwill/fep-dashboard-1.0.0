import { useDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { useDrag } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import clsx from 'clsx';
import { useGlobalReadAny } from 'selective-context';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';
import {
  CarouselOptionState,
  CarouselOptionStateInterface,
  ClashBadge
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';

export default function CarouselOrderItem({
  entity: orderItem
}: {
  entity: CarouselOrderItemDto;
}) {
  const { entity } = useDtoStore<CarouselOrderDto>({
    entityId: orderItem.carouselOrderId,
    entityClass: EntityClassMap.carouselOrder
  });
  const readAny = useGlobalReadAny<CarouselOptionStateInterface>();

  const option = readAny(
    getEntityNamespaceContextKey(
      CarouselOptionState,
      orderItem.carouselOptionId
    )
  );

  console.log(option);

  const clashList = option?.clashMap?.get(orderItem.carouselOrderId) ?? [];

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.CAROUSEL_ORDER_ITEM,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: orderItem
  }));

  return (
    <ClashBadge show={clashList.length > 0} content={'!'}>
      {drag(
        <div
          className={clsx(
            'bg-white rounded-lg odd:bg-sky-300 even:bg-red-300 p-1 cursor-pointer',
            isDragging && ' opacity-50'
          )}
        >
          <div className={''}>User: {entity.userRoleId}</div>
        </div>
      )}
    </ClashBadge>
  );
}
