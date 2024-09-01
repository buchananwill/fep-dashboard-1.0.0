import { EntityClassMap } from '@/api/entity-class-map';
import CarouselOrder from '@/components/carousel-groups/orders/components/CarouselOrder';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';

export default function CarouselOrderList({
  orderIdList
}: {
  orderIdList: string[];
}) {
  return orderIdList.map((orderId) => (
    <CarouselOrder
      entityId={orderId}
      key={getEntityNamespaceContextKey(EntityClassMap.carouselOrder, orderId)}
    />
  ));
}
